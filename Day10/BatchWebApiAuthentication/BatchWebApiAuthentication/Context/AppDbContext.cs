using BatchWebApiAuthentication.Models;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using System.Data;

namespace BatchWebApiAuthentication.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Batch> Batches { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // seed data / provide initial/hardcode data
            modelBuilder.Entity<Role>().HasData(
            new Role() { RoleId = 1, RoleName = "Admin" },
            new Role() { RoleId = 2, RoleName = "Manager" },
            new Role() { RoleId = 3, RoleName = "User" }
            );

            modelBuilder.Entity<User>().HasData(
                 new User()
                 {
                     Id = 1,
                     FirstName = "Deepak",
                     LastName = "Kumar",
                     Email = "admin@gmail.com",
                     ManagerId = null,
                     RoleId = 1,
                     Password = BCrypt.Net.BCrypt.HashPassword("pass@123")  // Secure password storage
                 },
            new User()
            {
                Id = 2,
                FirstName = "Ajay",
                LastName = "Kumar",
                Email = "ajay@gmail.com",
                ManagerId = 1,
                RoleId = 2,
                Password = BCrypt.Net.BCrypt.HashPassword("pass@123")  // Secure password storage
            });
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }
    }
}
