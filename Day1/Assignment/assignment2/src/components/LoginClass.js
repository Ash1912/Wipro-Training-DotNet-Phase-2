import React, { Component } from "react";

class LoginClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  handleChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = () => {
    this.props.onLogin(this.state.username);
  };

  render() {
    return (
      <div className="login-container">
        <h2>Login (Class Component)</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    );
  }
}

export default LoginClass;
