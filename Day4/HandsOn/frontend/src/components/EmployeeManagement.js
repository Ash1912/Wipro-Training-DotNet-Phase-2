import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Table } from "react-bootstrap";
import "../styles/EmployeeManagement.css"; // Import CSS

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees")
      .then(response => setEmployees(response.data))
      .catch(error => console.error("Error fetching employees:", error));
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    if (selectedEmployee) {
      axios.put(`http://localhost:5000/api/employees/${selectedEmployee.id}`, values)
        .then(response => {
          setEmployees(employees.map(emp => emp.id === selectedEmployee.id ? response.data : emp));
          setSelectedEmployee(null);
        })
        .catch(error => console.error("Error updating employee:", error));
    } else {
      axios.post("http://localhost:5000/api/employees", values)
        .then(response => setEmployees([...employees, response.data]))
        .catch(error => console.error("Error adding employee:", error));
    }
    resetForm();
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => setEmployees(employees.filter(emp => emp.id !== id)))
      .catch(error => console.error("Error deleting employee:", error));
  };

  return (
    <div className="container">
      <h2 className="title">Employee Management</h2>
      <div className="form-container">
        <Formik
          enableReinitialize
          initialValues={{
            id: selectedEmployee ? selectedEmployee.id : "",
            name: selectedEmployee ? selectedEmployee.name : "",
            address: selectedEmployee ? selectedEmployee.address : "",
            department: selectedEmployee ? selectedEmployee.department : "",
            manager: selectedEmployee ? selectedEmployee.manager : ""
          }}
          validationSchema={Yup.object({
            id: Yup.string().required("ID is required"),
            name: Yup.string().required("Name is required"),
            address: Yup.string().required("Address is required"),
            department: Yup.string().required("Department is required"),
            manager: Yup.string().required("Manager is required")
          })}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form className="form" onSubmit={handleSubmit}>
              <Field name="id" className="form-field" placeholder="ID" disabled={selectedEmployee} />
              <ErrorMessage name="id" component="div" className="error" />

              <Field name="name" className="form-field" placeholder="Name" />
              <ErrorMessage name="name" component="div" className="error" />

              <Field name="address" className="form-field" placeholder="Address" />
              <ErrorMessage name="address" component="div" className="error" />

              <Field name="department" className="form-field" placeholder="Department" />
              <ErrorMessage name="department" component="div" className="error" />

              <Field name="manager" className="form-field" placeholder="Manager" />
              <ErrorMessage name="manager" component="div" className="error" />

              <Button type="submit" className="submit-btn">
                {selectedEmployee ? "Update Employee" : "Add Employee"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Department</th>
              <th>Manager</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.address}</td>
                <td>{employee.department}</td>
                <td>{employee.manager}</td>
                <td>
                  <Button className="edit-btn" onClick={() => handleEdit(employee)}>Edit</Button>
                  <Button className="delete-btn" onClick={() => handleDelete(employee.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
