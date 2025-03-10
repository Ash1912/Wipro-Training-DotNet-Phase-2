import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BatchManagement from "./components/BatchManagement";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center">Batch Management System</h1>
        <Routes>
          <Route path="/" element={<BatchManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
