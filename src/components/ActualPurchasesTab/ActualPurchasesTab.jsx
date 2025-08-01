import React, { useState } from "react";
import "./ActualPurchasesTab.css";

const ActualPurchasesTab = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [lastUploadedDate, setLastUploadedDate] = useState(null);
  const [comment, setComment] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedFiles = [...uploadedFiles, ...files];
    setUploadedFiles(updatedFiles);
    setLastUploadedDate(new Date().toLocaleDateString("en-GB"));
  };

  const handleFileRemove = (index) => {
    const updated = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updated);
  };

  const handleSubmit = () => {
    console.log("Submitting files:", uploadedFiles);
    console.log("Comment:", comment);
  
  };

  return (
    <div className="actual-purchases-tab">
      <div className="info-alert">
        <span className="info-icon">ℹ️</span>
        <p>
          "With the Commodity Price Protection Offer, Syngenta will share in your risk of decreasing commodity
          prices, ensuring that you receive up to 15% cashback on your premium Syngenta products if the market
          takes an unfavorable turn later in the season. Must purchase a minimum of 500 acres of Golden Harvest corn"
        </p>
      </div>

      <h3 className="section-title">Validation of Purchases - Corn SE</h3>

      <table className="purchase-table">
        <thead>
          <tr>
            <th>Product Brand</th>
            <th>Committed Volume</th>
            <th>Minimum Volume in UOM</th>
            <th>Actuals</th>
            <th>Implied Usage Actuals Volume/Usage (Acres)</th>
          </tr>
        </thead>

        <tbody>
          <tr className="fungicide-label">
            <td colSpan="5"><strong>Fungicides</strong> (Optional)</td>
          </tr>
          <tr>
            <td><strong>Golden Harvest ® Corn</strong></td>
            <td>1230.00 <span className="unit-label">Units</span></td>
            <td>5 <span className="unit-label">Units</span></td>
            <td><input type="text" value="0.00" readOnly /> <span className="unit-label">Units</span></td>
            <td><input type="text" value="0" readOnly /></td>
          </tr>
          <tr>
            <td><strong>Corn SE Purchases</strong></td>
            <td colSpan="2">307 500.00 <span className="unit-label">USD</span></td>
            <td colSpan="2">0.00 <span className="unit-label">USD</span></td>
          </tr>
        </tbody>
      </table>

      
      <div className="upload-section">
        <h3>Upload your proof of purchases</h3>
        <div className="upload-wrapper">
          <label className="upload-box">
            <div className="upload-icon">📁</div>
            <p>Click or drag file to this area to upload</p>
            <p>Support for single or bulk upload</p>
            <input type="file" multiple hidden onChange={handleFileChange} />
          </label>

          <div className="upload-info">
            <div className="upload-info-icon">📎</div>
            <p>{uploadedFiles.length} Invoice{uploadedFiles.length !== 1 ? 's' : ''} added</p>
            <p>Last Uploaded: {lastUploadedDate || "--"}</p>
          </div>
        </div>

        <div className="file-list">
          {uploadedFiles.length === 0 ? (
            <span style={{ color: '#888' }}>No documents available</span>
          ) : (
            uploadedFiles.map((file, index) => (
              <div className="file-item" key={index}>
                <span>{file.name}</span>
                <button onClick={() => handleFileRemove(index)}>🗑️</button>
              </div>
            ))
          )}
        </div>

        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>

    
<div className="comment-section">
  <h3>Add your comment</h3>
  <div className="comment-input-wrapper">
    <input
      type="text"
      className="comment-input"
      placeholder="Please add your comment here..."
    />
    <button className="comment-send-btn">📤</button>
  </div>
</div>


<div className="tiles-section">
  <div className="tile-box">
    <div className="tile-title">Committed Area</div>
    <div className="tile-value">720.00 Acres</div>
  </div>

  <div className="tile-box">
    <div className="tile-title">Actual Area</div>
    <div className="tile-value">0.00 Acres</div>
  </div>

  <div className="tile-box">
    <div className="tile-title">Committed Purchases</div>
    <div className="tile-value">USD 35 644.50</div>
  </div>

  <div className="tile-box">
    <div className="tile-title">Actual Purchases</div>
    <div className="tile-value">USD 0.00</div>
  </div>
</div>


<div className="bottom-buttons">
  <button className="cancel">Cancel</button>
  <button className="save">Save</button>
  <button className="confirm">Confirm</button>
</div>

    </div>
  );
};

export default ActualPurchasesTab;
