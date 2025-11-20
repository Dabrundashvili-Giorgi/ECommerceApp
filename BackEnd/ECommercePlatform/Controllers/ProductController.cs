using Microsoft.AspNetCore.Mvc;
using ECommercePlatform.Data;
using ECommercePlatform.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommercePlatform.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ProductController> _logger;

        public ProductController(AppDbContext context, ILogger<ProductController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        // GET: api/Product
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound(new { message = "პროდუქტი ვერ მოიძებნა" });

            return Ok(product);
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product product)
        {
            if (product == null)
                return BadRequest(new { message = "მონაცემები ცარიელია." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                if (string.IsNullOrWhiteSpace(product.ImageUrl))
                    product.ImageUrl = "assets/images/no-image.png";

                _context.Products.Add(product);
                await _context.SaveChangesAsync();

                return Ok(new { message = "პროდუქტი დაემატა!", product });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "პროდუქტის დამატების შეცდომა");
                return StatusCode(500, "სერვერის შეცდომა დამატებისას.");
            }
        }

        // PUT: api/Product
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product updatedProduct)
        {
            if (updatedProduct == null)
                return BadRequest(new { message = "მონაცემები ცარიელია." });

            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound(new { message = "პროდუქტი ვერ მოიძებნა" });

            product.Name = updatedProduct.Name;
            product.Description = updatedProduct.Description;
            product.Price = updatedProduct.Price;
            product.Category = updatedProduct.Category;
            product.ImageUrl = string.IsNullOrWhiteSpace(updatedProduct.ImageUrl)
                ? product.ImageUrl
                : updatedProduct.ImageUrl;
            product.Weight = updatedProduct.Weight;
            product.IsAvailable = updatedProduct.IsAvailable;
            product.IsVegetarian = updatedProduct.IsVegetarian;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "პროდუქტი განახლდა!", product });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogError(ex, "ბაზასთან სინქრონიზაციის შეცდომა განახლებისას.");
                return StatusCode(500, "ბაზასთან სინქრონიზაციის შეცდომა.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "სერვერის შეცდომა განახლებისას.");
                return StatusCode(500, "სერვერის შეცდომა განახლებისას.");
            }
        }

        // DELETE: api/Product
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound(new { message = "პროდუქტი ვერ მოიძებნა" });

            try
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                return Ok(new { message = "პროდუქტი წარმატებით წაიშალა!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "პროდუქტის წაშლის შეცდომა");
                return StatusCode(500, "სერვერის შეცდომა წაშლისას.");
            }
        }
    }
}











// using ECommercePlatform.Data;
// using ECommercePlatform.Models;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;

// namespace ECommercePlatform.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class ProductController : ControllerBase
//     {
//         private readonly AppDbContext _context;

//         public ProductController(AppDbContext context)
//         {
//             _context = context;
//         }

//         // ყველა პროდუქტის გამოტანა
//         [HttpGet]
//         public async Task<IActionResult> GetProducts()
//         {
//             var products = await _context.Products.ToListAsync();
//             return Ok(products);
//         }

//         // კონკრეტული პროდუქტის ნახვა ID-ით
//         [HttpGet("{id}")]
//         public async Task<IActionResult> GetProductById(int id)
//         {
//             var product = await _context.Products.FindAsync(id);
//             if (product == null)
//                 return NotFound(new { message = "პროდუქტი ვერ მოიძებნა" });

//             return Ok(product);
//         }

//         // პროდუქტის დამატება — მხოლოდ ადმინ
//         [Authorize(Roles = "Admin")]
//         [HttpPost]
//         public async Task<IActionResult> CreateProduct([FromBody] Product product)
//         {
//             if (product == null)
//                 return BadRequest(new { message = "არასწორი მონაცემებია" });

//             if (string.IsNullOrWhiteSpace(product.Name))
//                 return BadRequest(new { message = "პროდუქტის დასახელება სავალდებულოა" });

//             if (product.Price <= 0)
//                 return BadRequest(new { message = "ფასი უნდა იყოს დადებითი რიცხვი" });

//             // სურათის ატვირთვა მხოლოდ string
//             if (string.IsNullOrWhiteSpace(product.ImageUrl))
//                 product.ImageUrl = "assets/images/no-image.png";

//             _context.Products.Add(product);
//             await _context.SaveChangesAsync();

//             return Ok(new { message = "პროდუქტი წარმატებით დაემატა", product });
//         }

//         // პროდუქტის განახლება — მხოლოდ ადმინ
//         [Authorize(Roles = "Admin")]
//         [HttpPut("{id}")]
//         public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product updatedProduct)
//         {
//             var product = await _context.Products.FindAsync(id);
//             if (product == null)
//                 return NotFound(new { message = "პროდუქტი ვერ მოიძებნა" });

//             if (string.IsNullOrWhiteSpace(updatedProduct.Name))
//                 return BadRequest(new { message = "პროდუქტის დასახელება სავალდებულოა" });

//             product.Name = updatedProduct.Name;
//             product.Description = updatedProduct.Description;
//             product.Price = updatedProduct.Price;
//             product.ImageUrl = updatedProduct.ImageUrl ?? product.ImageUrl;
//             product.Stock = updatedProduct.Stock;

//             await _context.SaveChangesAsync();
//             return Ok(new { message = "პროდუქტი განახლდა წარმატებით", product });
//         }

//         // პროდუქტის წაშლა — მხოლოდ ადმინ
//         [Authorize(Roles = "Admin")]
//         [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteProduct(int id)
//         {
//             var product = await _context.Products.FindAsync(id);
//             if (product == null)
//                 return NotFound(new { message = "პროდუქტი ვერ მოიძებნა" });

//             _context.Products.Remove(product);
//             await _context.SaveChangesAsync();

//             return Ok(new { message = "პროდუქტი წაიშალა წარმატებით" });
//         }
//     }
// }






// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using ECommercePlatform.Data;
// using ECommercePlatform.Models;

// namespace ECommercePlatform.Controllers
// {
//     [ApiController]
//     [Route("api/[controller]")]
//     public class ProductController : ControllerBase
//     {
//         private readonly AppDbContext _context;

//         public ProductController(AppDbContext context)
//         {
//             _context = context;
//         }

//         [HttpGet]
//         public IActionResult GetProducts()
//         {
//             return Ok(_context.Products.ToList());
//         }

//         [HttpGet("{id}")]
//         public IActionResult GetProductById(int id)
//         {
//             var product = _context.Products.Find(id);
//             if (product == null) return NotFound();
//             return Ok(product);
//         }

//         [HttpPost]
//         [Authorize(Roles = "Admin")]
//         public IActionResult CreateProduct([FromBody] Product product)
//         {
//             _context.Products.Add(product);
//             _context.SaveChanges();
//             return Ok(product);
//         }

//         [HttpPut("{id}")]
//         [Authorize(Roles = "Admin")]
//         public IActionResult UpdateProduct(int id, [FromBody] Product product)
//         {
//             var existing = _context.Products.Find(id);
//             if (existing == null) return NotFound();

//             existing.Name = product.Name;
//             existing.Description = product.Description;
//             existing.Price = product.Price;
//             existing.ImageUrl = product.ImageUrl;

//             _context.SaveChanges();
//             return Ok(existing);
//         }

//         [HttpDelete("{id}")]
//         [Authorize(Roles = "Admin")]
//         public IActionResult DeleteProduct(int id)
//         {
//             var product = _context.Products.Find(id);
//             if (product == null) return NotFound();

//             _context.Products.Remove(product);
//             _context.SaveChanges();
//             return Ok(new { message = "წაიშალა წარმატებით" });
//         }
//     }
// }

        // პროდუქტის წაშლა — მხოლოდ ადმინს
        // [Authorize(Roles = "Admin")]
        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteProduct(int id)
        // {
        //     var product = await _context.Products.FindAsync(id);
        //     if (product == null)
        //         return NotFound();

        //     _context.Products.Remove(product);
        //     await _context.SaveChangesAsync();

        //     return Ok(new { message = "წაიშალა წარმატებით" });
        // }