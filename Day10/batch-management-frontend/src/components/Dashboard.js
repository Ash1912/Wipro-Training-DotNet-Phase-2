import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../assets/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.firstName || user?.email || "Guest"}!</h2>
      <nav>
        <Link to="/batch-management">Batch Management</Link>
        <Link to="/user-management">User Management</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
