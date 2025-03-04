import React from "react";

const PreviousSearches = ({ searches }) => {
  return (
    <div className="mt-3">
      <h5>Previous Searches</h5>
      <ul>
        {searches.map((symbol, index) => (
          <li key={index}>{symbol}</li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousSearches;
