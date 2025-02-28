import React, { Component } from "react";

class WelcomeClass extends Component {
  render() {
    return (
      <div className="welcome-container">
        <h2>Welcome, {this.props.username}!</h2>
      </div>
    );
  }
}

export default WelcomeClass;
