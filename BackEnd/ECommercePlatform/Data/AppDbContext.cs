using Microsoft.EntityFrameworkCore;
using ECommercePlatform.Models; // ეს ძალიან მნიშვნელოვანია!


namespace ECommercePlatform.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
    }
}