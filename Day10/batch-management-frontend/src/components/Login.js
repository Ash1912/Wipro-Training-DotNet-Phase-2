import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login } from "../api/authApi";
import "../assets/Login.css";

const Login = () => {
  const { login: setLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await login({ email, password });
      setLogin(token, user);
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
