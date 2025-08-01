import React from "react";
import "./RetailerTab.css";

const RetailerTab = () => {
  return (
    <div className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label>Retailer / Customer Name</label>
          <select>
            <option>Select</option>
          </select>
        </div>

        <div className="form-group">
          <label>Retailer / Customer Sales Rep Name</label>
          <input type="text" placeholder="" />
        </div>

        <div className="form-group">
          <label>Retailer / Customer Sales Rep Email</label>
          <select>
            <option>Select</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Retailer Location</label>
          <input type="text" placeholder="" />
        </div>

        <div className="form-group">
          <label>Syngenta Sales Rep Name</label>
          <input type="text" value="US SSR 101" readOnly />
        </div>

        <div className="form-group">
          <label>SAP ID</label>
          <input type="text" placeholder="" />
        </div>
      </div>
    </div>
  );
};

export default RetailerTab;
