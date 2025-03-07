using Microsoft.AspNetCore.Mvc;
using MVCDemo.Models;

namespace MVCDemo.Controllers
{
    public class StudentController : Controller
    {
        public IActionResult Display1()
        {
            ViewBag.name = "aaaa";
            ViewBag.list = new List<Student>();
            ViewData["rn"] = 90;
            ViewData["list"] = new List<Student>(); 

            // dynamic > what value you put in me, i will become of that type
            //int x = 90;
            //char c = '1';
            //var name = 98;
            //name = 90;
            //dynamic num = "aaaa";
            //num = 90;

            Student student = new Student()
            {
                Id = 1,
                Name = "Deepak",
                Batch = "DotNet",
                Doj = DateTime.Now
            };
            ViewBag.student = student;
            return View();

        }// Add (2,3)

        //function Add(int x, int y)
        //{

        //}

        public IActionResult Display2()
        {
            Student student = new Student()
            {
                Id = 1,
                Name = "Deepak",
                Batch = "DotNet",
                Doj = DateTime.Now
            };
            //ViewBag.student = student;
            return View(student);

        }
        public IActionResult List1()
        {

            List<Student> students = new List<Student>()
             {new Student()
                {
                Id = 1,
                Name = "Deepak",
                Batch = "DotNet",
                Doj = DateTime.Now
                },
                new Student()
                {
                Id = 2,
                Name = "Ajay",
                Batch = "DotNet",
                Doj = DateTime.Parse("12/12/2024")
                },
                new Student()
                {
                Id = 3,
                Name = "Ravi",
                Batch = "Java",
                Doj = DateTime.Now
                },
                new Student()
                {
                Id = 4,
                Name = "Deepak Kumar",
                Batch = "DotNet",
                Doj = DateTime.Now
                }
             };
            ViewBag.list = students;
            return View();
        }



        public IActionResult List2()
        {

            List<Student> students = new List<Student>()
             {new Student()
                {
                Id = 1,
                Name = "Deepak",
                Batch = "DotNet",
                Doj = DateTime.Now
                },
                new Student()
                {
                Id = 2,
                Name = "Ajay",
                Batch = "DotNet",
                Doj = DateTime.Parse("12/12/2024")
                },
                new Student()
                {
                Id = 3,
                Name = "Ravi",
                Batch = "Java",
                Doj = DateTime.Now
                },
                new Student()
                {
                Id = 4,
                Name = "Deepak Kumar",
                Batch = "DotNet",
                Doj = DateTime.Now
                }
             };
            //ViewBag.list = students;
            return View(students);
        }






    }
}
