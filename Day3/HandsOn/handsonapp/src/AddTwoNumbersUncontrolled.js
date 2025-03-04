import React, { useRef, useState } from "react";

const AddTwoNumbersUncontrolled = () => {
  const num1Ref = useRef(null);
  const num2Ref = useRef(null);
  const [sum, setSum] = useState(null);

  const handleAddition = () => {
    const num1 = parseFloat(num1Ref.current.value) || 0;
    const num2 = parseFloat(num2Ref.current.value) || 0;
    setSum(num1 + num2);
  };

  return (
    <div>
      <h2>Uncontrolled Component</h2>
      <input type="number" ref={num1Ref} placeholder="Enter first number" />
      <input type="number" ref={num2Ref} placeholder="Enter second number" />
      <button onClick={handleAddition}>Add</button>
      {sum !== null && <h3>Sum: {sum}</h3>}
    </div>
  );
};

export default AddTwoNumbersUncontrolled;
