import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        Batch Management App {user ? `- Welcome, ${user.firstName || user.email}` : ""}
      </div>

      <div className="navbar-links">
        {token ? ( // Only show these links if the user is logged in
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/batch-management">Batches</Link>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link> // Show Login button if user is not authenticated
        )}
      </div>
    </nav>
  );
};

export default Navbar;
