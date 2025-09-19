using Microsoft.AspNetCore.Mvc;
using ECommercePlatform.Data;
using ECommercePlatform.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ECommercePlatform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/auth/register
        [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] UserDto request)
{
    if (await _context.Users.AnyAsync(u => u.Username == request.Username))
    {
        return BadRequest(new { message = "მომხმარებელი უკვე არსებობს." });
    }

    if (request.Password != request.ConfirmPassword)
    {
        return BadRequest(new { message = "პაროლები არ ემთხვევა." });
    }

    CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

    var user = new User
    {
        Username = request.Username,
        PasswordHash = passwordHash,
        PasswordSalt = passwordSalt,
        Role = "User"
    };

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return Ok(new { message = "რეგისტრაცია წარმატებით დასრულდა." });
}


        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null)
            {
                return BadRequest("მომხმარებელი ვერ მოიძებნა.");
            }

            if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
            {
                return BadRequest("არასწორი პაროლი.");
            }

            string token = CreateToken(user);
            return Ok(new { token });
        }

        // ➤ Password Hash helpers
        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] hash, byte[] salt)
        {
            using (var hmac = new HMACSHA512(salt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(hash);
            }
        }

        // ➤ JWT Token გენერაცია
        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                throw new Exception("JWT Key არ მოიძებნა კონფიგურაციაში!");
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}