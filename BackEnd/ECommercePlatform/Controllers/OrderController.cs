using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private static List<object> Orders = new();

    [HttpPost]
    public IActionResult CreateOrder([FromBody] object order)
    {
        Orders.Add(order);
        return Ok(new { message = "შეკვეთა მიღებულია ✅" });
    }

    [HttpGet]
    public IActionResult GetAllOrders()
    {
        return Ok(Orders);
    }
}