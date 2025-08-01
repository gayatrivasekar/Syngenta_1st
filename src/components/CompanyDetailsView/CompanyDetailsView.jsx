import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./CompanyDetailsView.css";
import ActualPurchasesTab from "../ActualPurchasesTab/ActualPurchasesTab";
import Committed  from "../Committed/Committed.jsx";
import RetailerTab from "../RetailerTab/RetailerTab"; 

const TABS = [
  "Company Details",
  "Retailer Details",
  "Committed Purchases",
  "Actual Purchases",
  "Price Fix",
  "Payout",
  "Documents",
];

const CompanyDetailsView = () => {
  const { companyName } = useParams();
  const location = useLocation();
  const company = location.state;

  const [activeTab, setActiveTab] = useState("Company Details");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(company || {});

  if (!company) return <p>No company data found.</p>;

  const handleChange = (e, key) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleConfirm = () => {
    setIsEditing(false);
    console.log("Updated data:", formData);
  };

  const handleCancel = () => {
    setFormData(company);
    setIsEditing(false);
  };

  const fields = [
    "Company Name",
    "Contact Name",
    "Payee Name",
    "Contact Email ID",
    "Legal Address",
    "Mobile Number",
    "Zip Code",
    "State",
    "City",
    "SFDC Contact ID",
    "SFDC Account ID",
    "Syngenta Sales Representative",
  ];

 const renderTabContent = () => {
  switch (activeTab) {
    case "Company Details":
      return (
        <div className="details-grid scrollable">
          {fields.map((field) => (
            <div
              key={field}
              className={`field ${
                field === "Syngenta Sales Representative" ? "full-row" : ""
              }`}
            >
              <label>{field}</label>
              <input
                value={formData[field] || ""}
                onChange={(e) => handleChange(e, field)}
                readOnly={!isEditing}
              />
            </div>
          ))}
        </div>
      );

    case "Retailer Details":
      return <RetailerTab />;

    case "Committed Purchases":
      return <Committed />;

    case "Actual Purchases":
      return <ActualPurchasesTab data={formData.actualPurchases || []} />;

    default:
      return (
        <div className="placeholder-tab">
          <p>{activeTab} content coming soon...</p>
        </div>
      );
  }
};



  return (
    <div className="company-details-container">
     
      <div className="header">
        <h2 className="company-title">
          {activeTab} - {companyName}
        </h2>
        {activeTab === "Company Details" && (
          <div className="actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="details-btn">Company Details</button>
          </div>
        )}
      </div>

     
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab);
              setIsEditing(false);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

    
      <div className="tab-content">{renderTabContent()}</div>

      {isEditing && activeTab === "Company Details" && (
        <div className="edit-actions">
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}

    
      {activeTab === "Company Details" && (
        <div className="fixed-actions">
          <button className="delete-btn">Delete Enrollment</button>
          <button className="reject-btn">Reject Customer</button>
          <button className="reset-btn">Reset Password</button>
        </div>
      )}
    </div>
  );
};

export default CompanyDetailsView;
