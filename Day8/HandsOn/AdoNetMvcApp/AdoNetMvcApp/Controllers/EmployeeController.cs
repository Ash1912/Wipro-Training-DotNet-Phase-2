using Microsoft.AspNetCore.Mvc;
using AdoNetMvcApp.Data;
using AdoNetMvcApp.Models;
using System.Collections.Generic;

namespace AdoNetMvcApp.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly EmployeeRepository _repo;

        public EmployeeController(EmployeeRepository repo)
        {
            _repo = repo;
        }

        public IActionResult Index()
        {
            List<Employee> employees = _repo.GetEmployees();
            return View(employees);
        }

        [HttpPost]
        public IActionResult Add(Employee emp)
        {
            _repo.AddEmployee(emp);
            return RedirectToAction("Index");
        }
    }
}
