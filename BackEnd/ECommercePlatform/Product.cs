using System;
using System.ComponentModel.DataAnnotations;

namespace ECommercePlatform.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty; 
        public double Price { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public bool IsAvailable { get; set; } 
        public bool IsVegetarian { get; set; } 
        public string Weight { get; set; } = string.Empty; 
        public double Rating { get; set; } 

        public int Stock { get; set; } // ეს უკვე მაქ
        public DateTime CreatedAt { get; set; } = DateTime.Now; 
    }
}



// using System.ComponentModel.DataAnnotations;

// namespace ECommercePlatform.Models
// {
//     public class Product
//     {
//         [Key]
//         public int Id { get; set; }

//         [Required]
//         public string Name { get; set; } = string.Empty;

//         public string Description { get; set; } = string.Empty;

//         public double Price { get; set; }

//         public string ImageUrl { get; set; } = string.Empty;

//         public int Stock { get; set; }

//         public DateTime CreatedAt { get; set; } = DateTime.Now;
//     }
// }
