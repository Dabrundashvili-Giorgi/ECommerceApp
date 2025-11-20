using System;
using System.ComponentModel.DataAnnotations;

namespace ECommercePlatform.Models
{
    public class Chef
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string Specialty { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty; // სტრინგად ინახება ფოტო

        public string Description { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
