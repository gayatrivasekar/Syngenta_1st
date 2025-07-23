import React, { useState } from "react";
import "./Topbar.css";

const Topbar = () => {
  const [year, setYear] = useState("2024-25");

  const handleChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="topbar">
      <div className="left">
        <div className="profile-circle">SGA</div>

        <div className="user-info">
          <div className="role">Administrator</div>
          <div className="name">SSR</div>
        </div>

        <div className="year-dropdown">
          <label htmlFor="year-select">Select Year:</label>
          <select id="year-select" value={year} onChange={handleChange}>
            {Array.from({ length: 51 }, (_, i) => {
              const start = 2000 + i;
              const end = (start + 1).toString().slice(-2);
              return (
                <option key={start} value={`${start}-${end}`}>
                  {`${start}-${end}`}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
