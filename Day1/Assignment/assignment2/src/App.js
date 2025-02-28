import React, { useState } from "react";
import LoginClass from "./components/LoginClass";
import WelcomeClass from "./components/WelcomeClass";
import LoginFunction from "./components/LoginFunction";
import WelcomeFunction from "./components/WelcomeFunction";
import "./App.css";

function App() {
  const [usernameClass, setUsernameClass] = useState("");
  const [usernameFunction, setUsernameFunction] = useState("");

  return (
    <div className="app-container">
      <h1>User Login</h1>
      
      {/* Class Component Implementation */}
      <LoginClass onLogin={setUsernameClass} />
      {usernameClass && <WelcomeClass username={usernameClass} />}
      
      <hr />
      
      {/* Function Component Implementation */}
      <LoginFunction onLogin={setUsernameFunction} />
      {usernameFunction && <WelcomeFunction username={usernameFunction} />}
    </div>
  );
}

export default App;
