using Microsoft.AspNetCore.Mvc;

namespace MVCDemo.Controllers
{
    public class SecondController : Controller
    {
        // IActionResult is interface
        // ViewResult
        // PartialViewResult
        // JsonResult
        // ContentResult


         public IActionResult Hello1()
        {
            if (1 == 2)
            {
                return Content("OK");
            }
            else 
            return View();
        }

        public IActionResult Hello2()
        {
            return View();
        }
        public IActionResult Hello3()
        {
            return View();
        }

        public ContentResult Hello4()
        {
            return Content("OK");
        }

        public ViewResult Hello5()
        {
            return View();
        }

    }
}
