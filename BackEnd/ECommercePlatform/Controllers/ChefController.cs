using Microsoft.AspNetCore.Mvc;
using ECommercePlatform.Data;
using ECommercePlatform.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommercePlatform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ChefController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ChefController> _logger;

        public ChefController(AppDbContext context, ILogger<ChefController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Chef
        [HttpGet]
        public async Task<IActionResult> GetChefs()
        {
            var chefs = await _context.Chefs.ToListAsync();
            return Ok(chefs);
        }

        // GET: api/Chef
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetChef(int id)
        {
            var chef = await _context.Chefs.FindAsync(id);
            if (chef == null) return NotFound();
            return Ok(chef);
        }

        // POST: api/Chef
        [HttpPost]
        public async Task<IActionResult> AddChef([FromBody] Chef chef)
        {
            if (chef == null) return BadRequest("მონაცემები ცარიელია.");
            if (!ModelState.IsValid) return BadRequest(ModelState);

            try
            {
                _context.Chefs.Add(chef);
                await _context.SaveChangesAsync();
                return Ok(new { message = "შეფი დაემატა!", chef });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "შეფის დამატების დროს მოხდა შეცდომა.");
                return StatusCode(500, "სერვერის შეცდომა. დეტალები ლოგებშია.");
            }
        }

        // PUT: api/Chef
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateChef(int id, [FromBody] Chef updatedChef)
        {
            if (updatedChef == null) return BadRequest("მონაცემები ცარიელია.");
            if (id != updatedChef.Id && updatedChef.Id != 0)
                return BadRequest("ID დისქონტინuité");

            var chef = await _context.Chefs.FindAsync(id);
            if (chef == null) return NotFound();

            // განახლება
            chef.Name = updatedChef.Name;
            chef.Specialty = updatedChef.Specialty;
            chef.ImageUrl = updatedChef.ImageUrl;
            chef.Description = updatedChef.Description;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "შეფი განახლდა.", chef });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError(ex, "Concurrency error while updating chef {ChefId}", id);
                return StatusCode(500, "ბაზასთან სინქრონიზაციის შეცდომა.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating chef {ChefId}", id);
                return StatusCode(500, "სერვერის შეცდომა. დეტალები ლოგებშია.");
            }
        }

        // DELETE: api/Chef
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteChef(int id)
        {
            var chef = await _context.Chefs.FindAsync(id);
            if (chef == null)
                return NotFound();

            try
            {
                _context.Chefs.Remove(chef);
                await _context.SaveChangesAsync();
                return Ok(new { message = "შეფი წარმატებით წაიშალა!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting chef {ChefId}", id);
                return StatusCode(500, "სერვერის შეცდომა წაშლის დროს.");
            }
        }
    }
}
