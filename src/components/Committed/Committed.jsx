import React, { useState } from "react";
import "./Committed.css"; // CSS file

const Committed = () => {
  const [committedArea, setCommittedArea] = useState(720);
  const [volume] = useState(450);
  const [pricePerUOM] = useState(79.21);
  const impliedUsage = 720;
  const totalPurchase = (volume * pricePerUOM).toFixed(2);

  return (
    <div className="container">
      <h1 className="title">CLONE Final Payout Assessment Campaign</h1>

      <div className="section">
        <h2 className="section-title">CP Commitments</h2>

        <div className="row">
          <label>Committed Corn CP Area:</label>
          <input
            type="number"
            value={committedArea}
            onChange={(e) => setCommittedArea(e.target.value)}
          />
          <span className="unit">Acres</span>
          <button className="icon-button"></button>
        </div>

        <h3 className="subheading">Herbicides/Insecticides (Optional)</h3>

        <div className="table">
         
          <div className="table-header">
            <div>Product Brand</div>
            <div>Volume</div>
            <div>Unit of Measure (UOM)</div>
            <div>Program Price per UOM</div>
            <div>Minimum Volume in UOM</div>
            <div>Implied Usage (Acres)</div>
            <div>Target Purchases USD</div>
          </div>

      
          <div className="table-row">
            <button className="brand-button">Acuron</button>
            <input type="number" value={volume} readOnly />
            <input type="text" value="Gallons" readOnly />
            <input type="number" value={pricePerUOM} readOnly />
            <input type="number" value={0} readOnly />
            <input type="number" value={impliedUsage} readOnly />
            <input type="number" value={totalPurchase} readOnly />
          </div>

        
          <div className="table-row">
            <button className="brand-button">Select Product Brand</button>
            <input disabled />
            <input disabled />
            <input disabled />
            <input disabled />
            <input disabled />
            <input disabled />
          </div>
        </div>

        <div className="total">✅ USD {totalPurchase}</div>
      </div>
    </div>
  );
};

export default Committed;
