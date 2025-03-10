using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MVC_ADO.Models;

namespace MVC_ADO.Controllers
{
    public class EmployeeController : Controller
    {
        SqlConnection connection = new SqlConnection();
        SqlCommand command = new SqlCommand();
        public EmployeeController()
        {
            connection.ConnectionString = "server=ANAMIKA\\SQLSERVER;database=DemoDb1;integrated security=true;TrustServerCertificate=true";

        }
        public IActionResult Index()
        {
            List<Employee> employees = new List<Employee>();
            command.CommandText = "Select * from EMployee";
            command.Connection = connection;
            connection.Open();
            SqlDataReader reader =  command.ExecuteReader();
            if (reader.HasRows)
            {  
                 while(reader.Read())
                {
                    employees.Add(new Employee()
                    {
                        Id = (int)reader["id"],
                        Name = reader["name"].ToString(),
                        Department = reader["dept"].ToString(),
                        Salary = (Double)reader["salary"]
                    });
                }
                connection.Close();
                return View(employees);
            }
            else
            {
                ViewBag.msg = "There are no records";
                return View();
            } 
        }
        public IActionResult Create()
        {
            return View();
        }


        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            command.CommandText = $"insert into employee(id, name, dept, salary) values({employee.Id}, '{employee.Name}', '{employee.Department}', {employee.Salary})";
            command.Connection = connection;
            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();
            return RedirectToAction("Index");

        }

        public IActionResult Details(int id)
        {
            Employee employee = new Employee();
            command.CommandText ="select * from employee where id=" +id;
            command.Connection = connection;
            connection.Open();
            SqlDataReader reader =  command.ExecuteReader();
            if (reader.HasRows)
            {
               reader.Read();
                employee = new Employee()
                {
                    Id = (int)reader["id"],
                    Name = reader["name"].ToString(),
                    Department = reader["dept"].ToString(),
                    Salary = (Double)reader["salary"]
                };
            
                //connection.Close();
                return View(employee);
            }
            else
            {
                ViewBag.msg = "There is no record";
                return View();
            }

        }



        public IActionResult Edit(int id)
        {
            Employee employee = new Employee();
            command.CommandText = "select * from employee where id=" + id;
            command.Connection = connection;
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            if (reader.HasRows)
            {

                reader.Read();
                employee = new Employee()
                {
                    Id = (int)reader["id"],
                    Name = reader["name"].ToString(),
                    Department = reader["dept"].ToString(),
                    Salary = (Double)reader["salary"]
                };

                connection.Close();
                return View(employee);
            }
            else
            {
                ViewBag.msg = "There is no record";
                return View();
            }

        }

        [HttpPost]
        public IActionResult Edit(int id, Employee employee)
        {
             
            command.CommandText = $"update employee set dept ='{employee.Department}', salary = {employee.Salary} where id={id}";
            command.Connection = connection;
            connection.Open();
            command.ExecuteNonQuery();
                 connection.Close();
                return RedirectToAction("Index");
            } 

        




        public IActionResult Delete(int id)
        {
            Employee employee = new Employee();
            command.CommandText = "select * from employee where id=" + id;
            command.Connection = connection;
            connection.Open();
            SqlDataReader reader = command.ExecuteReader();
            if (reader.HasRows)
            {

                reader.Read();
                employee = new Employee()
                {
                    Id = (int)reader["id"],
                    Name = reader["name"].ToString(),
                    Department = reader["dept"].ToString(),
                    Salary = (Double)reader["salary"]
                };

                connection.Close();
                return View(employee);
            }
            else
            {
                ViewBag.msg = "There is no record";
                return View();
            }

        }


        [HttpPost]
        public IActionResult Delete(int id, Employee employee)
        {
            
            command.CommandText = "delete from employee where id=" + id;
            command.Connection = connection;
            connection.Open();
            command.ExecuteNonQuery();
            connection.Close();
            return RedirectToAction("Index");

        }





    }
}
