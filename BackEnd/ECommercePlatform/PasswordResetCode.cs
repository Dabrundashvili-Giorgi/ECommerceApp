using System;
using System.ComponentModel.DataAnnotations;

namespace ECommercePlatform.Models
{
    public class PasswordResetCode
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Code { get; set; } = string.Empty;

        public DateTime ExpiresAt { get; set; } = DateTime.UtcNow.AddMinutes(10); // კოდი 10 წუთი მოქმედებს
        public bool IsUsed { get; set; } = false;
    }
}
