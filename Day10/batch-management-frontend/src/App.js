import React from "react";
import { Routes, Route } from "react-router-dom";  // ❌ Removed BrowserRouter
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import BatchManagement from "./components/BatchManagement";
import UserManagement from "./components/UserManagement";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <AuthProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/batch-management" element={<BatchManagement />} />
      <Route path="/user-management" element={<UserManagement />} />
    </Routes>
  </AuthProvider>
);

export default App;
