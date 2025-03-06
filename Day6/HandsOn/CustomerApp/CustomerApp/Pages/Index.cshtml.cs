using CustomerApp.Data;
using CustomerApp.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;

namespace CustomerApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly CustomerContext _context;
        public IndexModel(CustomerContext context) { _context = context; }

        public IList<Customer> Customers { get; set; }

        public void OnGet()
        {
            Customers = _context.Customers.ToList();
        }
    }
}
