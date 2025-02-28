import React from "react";

function WelcomeFunction({ username }) {
  return (
    <div className="welcome-container">
      <h2>Welcome, {username}!</h2>
    </div>
  );
}

export default WelcomeFunction;
