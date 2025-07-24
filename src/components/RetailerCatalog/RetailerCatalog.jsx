import React, { useState } from "react";
const RetailerCatalog = ({ label, options, value, onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [headsheds, setHeadsheds] = useState([{ title: "", name: "", email: "" }]);

  const handleHeadshedChange = (index, field, fieldValue) => {
    const updated = [...headsheds];
    updated[index][field] = fieldValue;
    setHeadsheds(updated);
  };

  const addHeadshed = () => {
    setHeadsheds([...headsheds, { title: "", name: "", email: "" }]);
  };

  const deleteHeadshed = (index) => {
    const updated = headsheds.filter((_, i) => i !== index);
    setHeadsheds(updated);
  };

  const handleApply = () => {
    console.log("Headshed Data:", headsheds);
    setShowModal(false);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

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

      <div style={{ marginTop: "15px" }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "8px 16px",
            border: "1px solid green",
            background: "white",
            color: "green",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Headshed +
        </button>
      </div>

    
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "95%",
              maxWidth: "1000px",
              maxHeight: "90%",
              overflowY: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ color: "green", textAlign: "center", marginBottom: "20px" }}>
              Retail Headshed
            </h2>

            {headsheds.length === 0 ? (
              <p style={{ textAlign: "center", margin: "20px 0" }}>
                No Headsheds added yet. Click “Add Headshed +” below to add.
              </p>
            ) : (
              headsheds.map((hs, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "20px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4 style={{ margin: "0 0 10px 0", color: "#333" }}>
                      Retail Headshed {index + 1}
                    </h4>
                    <button
                      onClick={() => deleteHeadshed(index)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "Black",
                        fontSize: "18px",
                        cursor: "pointer",
                      }}
                      title="Delete Headshed"
                    >
                      ×

                    </button>
                  </div>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <input
                      type="text"
                      placeholder="Title *"
                      value={hs.title}
                      onChange={(e) => handleHeadshedChange(index, "title", e.target.value)}
                      style={{ flex: "1 1 30%", padding: "8px" }}
                    />
                    <input
                      type="text"
                      placeholder="Name *"
                      value={hs.name}
                      onChange={(e) => handleHeadshedChange(index, "name", e.target.value)}
                      style={{ flex: "1 1 30%", padding: "8px" }}
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      value={hs.email}
                      onChange={(e) => handleHeadshedChange(index, "email", e.target.value)}
                      style={{ flex: "1 1 30%", padding: "8px" }}
                    />
                  </div>
                </div>
              ))
            )}

            <button
              onClick={addHeadshed}
              style={{
                padding: "8px 16px",
                border: "1px solid green",
                background: "white",
                color: "green",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Add Headshed +
            </button>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px 16px",
                  border: "1px solid green",
                  background: "white",
                  color: "green",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  background: "green",
                  color: "white",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1100,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "500px",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ color: "green", marginBottom: "15px" }}>User Creation</h2>
            
            <button
              onClick={closeConfirmation}
              style={{
                padding: "8px 20px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RetailerCatalog;
