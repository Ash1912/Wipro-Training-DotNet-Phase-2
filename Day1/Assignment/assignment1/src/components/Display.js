import React from "react";
  function Display({ name, setName, address, setAddress }) {
    return (
      <div>
        <h2>Modify Details</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
    );
  }
  export default Display;