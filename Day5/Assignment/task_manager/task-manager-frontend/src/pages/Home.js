import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <h1 className="mb-3">Welcome to Task Manager</h1>
        <p className="lead">Organize your tasks efficiently and stay productive.</p>
        <div className="mt-4">
          <Link to="/login" className="btn btn-primary me-2">Login</Link>
          <Link to="/register" className="btn btn-outline-primary">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
