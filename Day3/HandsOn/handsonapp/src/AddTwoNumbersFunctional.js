import React, { useState } from "react";

const AddTwoNumbersFunctional = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [sum, setSum] = useState(null);

  const handleAddition = () => {
    setSum((parseFloat(num1) || 0) + (parseFloat(num2) || 0));
  };

  return (
    <div>
      <h2>Functional Component</h2>
      <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} placeholder="Enter first number" />
      <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} placeholder="Enter second number" />
      <button onClick={handleAddition}>Add</button>
      {sum !== null && <h3>Sum: {sum}</h3>}
    </div>
  );
};

export default AddTwoNumbersFunctional;
