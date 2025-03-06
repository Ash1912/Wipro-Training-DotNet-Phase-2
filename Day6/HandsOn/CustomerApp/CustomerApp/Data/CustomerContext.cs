using Microsoft.EntityFrameworkCore;
using CustomerApp.Models;

namespace CustomerApp.Data
{
    public class CustomerContext : DbContext
    {
        public CustomerContext(DbContextOptions<CustomerContext> options) : base(options) { }

        public DbSet<Customer> Customers { get; set; }
    }
}
