using Microsoft.AspNetCore.Mvc;

namespace MVCDemo.Controllers
{
    public class FirstController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult First()
        {
            ViewBag.date = DateTime.Now.ToShortDateString();
            ViewData["name"] = "Kapil Dev";
            TempData["address"] = "Delhi";
            return View();
        }

        public IActionResult Second()
        {
            List<string> names = new List<string> {
                "ajay","vijay", "jay"
            };
            ViewBag.list = names;
            return View();
        }


        public IActionResult A1()
        {
            TempData["rollno"] = 100;
            TempData.Keep("rollno");
            return View();
        }

        public IActionResult A2()
        {
            TempData.Keep("rollno");
            return View();
        }

        public IActionResult Third()
        {
            List<string> names = new List<string> {
                "ajay","vijay", "jay"
            };
            ViewData["list"] = names;
            return View();
        }














    }
}
