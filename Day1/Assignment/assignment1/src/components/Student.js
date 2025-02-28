import React from "react";
  function Student({ name, address, scores }) {
    return (
      <div>
        <h2>Student Details</h2>
        <p>Name: {name}</p>
        <p>Address: {address}</p>
        <p>Scores: {scores.join(", ")}</p>
      </div>
    );
  }
  export default Student;