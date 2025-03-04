let employees = [];

exports.getEmployees = (req, res) => {
  res.json(employees);
};

exports.addEmployee = (req, res) => {
  const employee = req.body;
  employees.push(employee);
  res.json(employee);
};

exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const updatedEmployee = req.body;

  employees = employees.map(emp => (emp.id === id ? updatedEmployee : emp));
  res.json(updatedEmployee);
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  employees = employees.filter(emp => emp.id !== id);
  res.json({ message: "Employee deleted successfully" });
};
