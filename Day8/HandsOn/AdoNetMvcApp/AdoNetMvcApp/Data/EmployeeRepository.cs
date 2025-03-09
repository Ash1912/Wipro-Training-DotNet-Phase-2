using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using AdoNetMvcApp.Models;

namespace AdoNetMvcApp.Data
{
    public class EmployeeRepository
    {
        private readonly string _connectionString;

        public EmployeeRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // Connected Mode (Using SqlCommand)
        public void AddEmployee(Employee emp)
        {
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "INSERT INTO Employees (Name, Position, Salary) VALUES (@Name, @Position, @Salary)";
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Name", emp.Name);
                cmd.Parameters.AddWithValue("@Position", emp.Position);
                cmd.Parameters.AddWithValue("@Salary", emp.Salary);
                conn.Open();
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        // Disconnected Mode (Using SqlDataAdapter)
        public List<Employee> GetEmployees()
        {
            List<Employee> employees = new List<Employee>();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                string query = "SELECT * FROM Employees";
                SqlDataAdapter adapter = new SqlDataAdapter(query, conn);
                DataTable dt = new DataTable();
                adapter.Fill(dt);
                foreach (DataRow row in dt.Rows)
                {
                    employees.Add(new Employee
                    {
                        Id = (int)row["Id"],
                        Name = row["Name"].ToString(),
                        Position = row["Position"].ToString(),
                        Salary = (decimal)row["Salary"]
                    });
                }
            }
            return employees;
        }
    }
}
