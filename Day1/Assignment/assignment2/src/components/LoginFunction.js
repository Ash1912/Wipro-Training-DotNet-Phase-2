import React, { useState } from "react";

function LoginFunction({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    onLogin(username);
  };

  return (
    <div className="login-container">
      <h2>Login (Function Component)</h2>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}

export default LoginFunction;
