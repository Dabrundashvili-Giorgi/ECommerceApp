using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommercePlatform.Data;
using ECommercePlatform.Models;
using System.Security.Cryptography;
using System.Text;

namespace ECommercePlatform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PasswordController> _logger;

        public PasswordController(AppDbContext context, ILogger<PasswordController> logger)
        {
            _context = context;
            _logger = logger;
        }

[HttpPost("request")]
public async Task<IActionResult> RequestCode([FromBody] PasswordRequestDto dto)
{
    var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
    if (user == null)
        return NotFound(new { message = "მომხმარებელი ვერ მოიძებნა." }); // ✅ შეიცვალა

    var code = GenerateCode();
    var reset = new ECommercePlatform.Models.PasswordResetCode
    {
        Username = user.Username,
        Code = code,
        ExpiresAt = DateTime.UtcNow.AddMinutes(10)
    };

    _context.PasswordResetCodes.Add(reset);
    await _context.SaveChangesAsync();

    // კონსოლზე გამოტანა გასატესტაააად
    Console.WriteLine($"[TEST MODE] {user.Username} პაროლის აღდგენის კოდი: {code}");

    return Ok(new { message = "კოდი გაიგზავნა.", code }); 
}

        [HttpPost("verify")]
        public async Task<IActionResult> VerifyCode([FromBody] VerifyCodeDto dto)
        {
            var reset = await _context.PasswordResetCodes
                .FirstOrDefaultAsync(x => x.Username == dto.Username && x.Code == dto.Code && !x.IsUsed && x.ExpiresAt > DateTime.UtcNow);

            if (reset == null)
                return BadRequest("კოდი არასწორია ან ვადაგასულია.");

            return Ok(new { message = "კოდი სწორია." });
        }

        // ეს არის პაროლის განახლება
        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var reset = await _context.PasswordResetCodes
                .FirstOrDefaultAsync(x => x.Username == dto.Username && x.Code == dto.Code && !x.IsUsed && x.ExpiresAt > DateTime.UtcNow);

            if (reset == null)
                return BadRequest("კოდი არასწორია ან ვადაგასულია.");

            //პაროლის სიძლიერე
            if (!IsValidPassword(dto.NewPassword))
                return BadRequest("პაროლი უნდა შეიცავდეს მინ. ერთ დიდ ასოს და ერთ რიცხვს.");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
            if (user == null)
                return BadRequest("მომხმარებელი ვერ მოიძებნა.");

            CreatePasswordHash(dto.NewPassword, out byte[] hash, out byte[] salt);
            user.PasswordHash = hash;
            user.PasswordSalt = salt;
            reset.IsUsed = true;

            await _context.SaveChangesAsync();

            Console.WriteLine($"✅ {user.Username}-ის პაროლი წარმატებით შეიცვალა.");
            return Ok(new { message = "პაროლი წარმატებით შეიცვალა! ახლა შედით სისტემაში." });
        }

        private static string GenerateCode()
        {
            var random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt)
        {
            using var hmac = new HMACSHA512();
            salt = hmac.Key;
            hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        private bool IsValidPassword(string password)
        {
            bool hasUpper = password.Any(char.IsUpper);
            bool hasDigit = password.Any(char.IsDigit);
            return hasUpper && hasDigit;
        }
    }

    public class PasswordRequestDto { public string Username { get; set; } = string.Empty; }
    public class VerifyCodeDto { public string Username { get; set; } = string.Empty; public string Code { get; set; } = string.Empty; }
    public class ResetPasswordDto { public string Username { get; set; } = string.Empty; public string Code { get; set; } = string.Empty; public string NewPassword { get; set; } = string.Empty; }
}
