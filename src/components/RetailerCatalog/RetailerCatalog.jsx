

import React from "react";

const RetailerCatalog = ({ label, options, value, onChange }) => {
  return (
    <div>
      <label>{label}: </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: "8px", borderRadius: "4px", marginLeft: "10px" }}
      >
        <option value="">-- Select Retailer --</option>
        {options.map((retailer, index) => (
          <option key={index} value={retailer}>
            {retailer}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RetailerCatalog;
