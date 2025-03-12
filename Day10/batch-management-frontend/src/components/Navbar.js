import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/Navbar.css";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">Batch Management App</div>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/batch-management">Batches</Link>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
