let employees = require('../data/employees');

// Get all employees
exports.getAllEmployees = (req, res) => {
    res.json(employees);
};

// Get employee by ID
exports.getEmployeeById = (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
};

// Add new employee
exports.addEmployee = (req, res) => {
    const { name, address, dept, manager } = req.body;
    const newEmployee = { id: employees.length + 1, name, address, dept, manager };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
};

// Update employee by ID
exports.updateEmployee = (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const { name, address, dept, manager } = req.body;
    if (name) employee.name = name;
    if (address) employee.address = address;
    if (dept) employee.dept = dept;
    if (manager) employee.manager = manager;

    res.json(employee);
};

// Delete employee by ID
exports.deleteEmployee = (req, res) => {
    employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
    res.json({ message: "Employee deleted successfully" });
};
