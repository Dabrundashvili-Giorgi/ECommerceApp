namespace ECommercePlatform.Models
{
    public class UserDto
    {
        public string Username { get; set; } = string.Empty;

        public string? Email { get; set; }
        public string Password { get; set; } = string.Empty;
        
        public string ConfirmPassword { get; set; } = string.Empty;
        
        public string Role { get; set; } = "User";
    }
}