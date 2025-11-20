using Microsoft.EntityFrameworkCore;
using ECommercePlatform.Models;

namespace ECommercePlatform.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Chef> Chefs { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        public DbSet<PasswordResetCode> PasswordResetCodes { get; set; }

public static void SeedData(AppDbContext context)
{
            if (!context.Products.Any())
            {
                context.Products.AddRange(
            new Product
            {
                Name = "ბადრიჯანი",
                Description = "მარინადში შემწვარი ბადრიჯანი, სპეციალური სოუსი, მწვანილი",
                Category = "წასახემსებელი",
                ImageUrl = "assets/images/medium.jpg",
                Price = 4.5,
                IsAvailable = true,
                IsVegetarian = true,
                Weight = "120 გ",
                Rating = 5
            },
            new Product
            {
                Name = "ქათმის წვნიანი ბრინჯით",
                Description = "ქათამი, ბრინჯი, ხახვი, სტაფილო, ტყემალი",
                Category = "წვნიანი",
                ImageUrl = "assets/images/chicksoup.jpg",
                Price = 7.38,
                IsAvailable = true,
                IsVegetarian = false,
                Weight = "130 გ",
                Rating = 4.5
            },
            new Product
            {
                Name = "ღორის ხორცი და კარტოფილი",
                Description = "ღორის ხორცი, კარაქი, შავი პილპილი, პომიდორი",
                Category = "ხორციანი კერძი",
                ImageUrl = "assets/images/beeflanguet.jpg",
                Price = 18.5,
                IsAvailable = true,
                IsVegetarian = false,
                Weight = "220 გ",
                Rating = 4
            },
            new Product
            {
                Name = "პომიდორი მარინადში",
                Description = "პომიდორი, კვერცხი, ოხრახუში, კამა",
                Category = "ბოსტნეული",
                ImageUrl = "assets/images/chickenlanguet.jpg",
                Price = 12.5,
                IsAvailable = false,
                IsVegetarian = true,
                Weight = "140 გ",
                Rating = 3
            },
            new Product
            {
                Name = "საქონლის ხორცი",
                Description = "წვნიანი საქონლის ხორცი სპეციალური სოუსით.",
                Category = "ხორციანი კერძი",
                ImageUrl = "assets/images/seasonalfruits.jpg",
                Price = 22.0,
                IsAvailable = true,
                IsVegetarian = false,
                Weight = "250 გ",
                Rating = 5
            },
            new Product
            {
                Name = "ბოსტნეულის სალათი",
                Description = "ახალი ბოსტნეული ზეითუნის ზეთით",
                Category = "სალათი",
                ImageUrl = "assets/images/noodlesoup.jpg",
                Price = 8.0,
                IsAvailable = true,
                IsVegetarian = true,
                Weight = "150 გ",
                Rating = 5
            },

            new Product
            {
                Name = "ცხარე ქათმის ფრთები",
                Description = "ხრაშუნა ფრთები ცხარე სოუსით.",
                Category = "ქათმის კერძი",
                ImageUrl = "assets/images/barbecuesalad.jpg",
                Price = 15.0,
                IsAvailable = false,
                IsVegetarian = false,
                Weight = "180 გ",
                Rating = 4.5
            }

        );
        context.SaveChanges();
    }
}


    }

    
}


