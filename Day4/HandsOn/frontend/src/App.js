import React from "react";
import EmployeeManagement from "./components/EmployeeManagement";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/EmployeeManagement.css"; // Import custom CSS

const App = () => {
  return (
    <div className="app-container">
      <EmployeeManagement />
    </div>
  );
};

export default App;
