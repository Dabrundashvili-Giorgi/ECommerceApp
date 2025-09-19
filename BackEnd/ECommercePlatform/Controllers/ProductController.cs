using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    [HttpGet]
    public IActionResult GetProducts()
    {
        var products = new List<object>
        {
            new { Id = 1, Name = "პროდუქტი 1", Description = "აღწერა 1", Price = 20.5, ImageUrl = "https://via.placeholder.com/150" },
            new { Id = 2, Name = "პროდუქტი 2", Description = "აღწერა 2", Price = 30, ImageUrl = "https://via.placeholder.com/150" }
        };

        return Ok(products);
    }

    [HttpGet("{id}")]
    public IActionResult GetProductById(int id)
    {
        var products = new List<object>
        {
            new { Id = 1, Name = "პროდუქტი 1", Description = "აღწერა 1", Price = 20.5, ImageUrl = "https://via.placeholder.com/150" },
            new { Id = 2, Name = "პროდუქტი 2", Description = "აღწერა 2", Price = 30, ImageUrl = "https://via.placeholder.com/150" }
        };

        var product = products.FirstOrDefault(p =>
            p.GetType().GetProperty("Id")?.GetValue(p) is int pid && pid == id
        );

        if (product == null)
            return NotFound();

        return Ok(product);
    }

    // ✅ აქ არის ახალი დამატებული POST მეთოდი
    [HttpPost]
    public IActionResult CreateProduct([FromBody] ProductDto product)
    {
        if (string.IsNullOrWhiteSpace(product.Name) || product.Price <= 0)
        {
            return BadRequest("სახელი და ფასი სავალდებულოა");
        }

        return Ok(product); // ვუბრუნებთ მიღებულ ობიექტს
    }
}

// ✅ აქ არის DTO კლასი
public class ProductDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double Price { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}