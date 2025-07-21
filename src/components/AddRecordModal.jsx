import React, { useState } from "react";

const AddRecordModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    SSR: "",
    Type: "",
    Name: "",
    Title: "",
    "Email ID": "",
    "Phone Number": "",
    Commercial: "",
    "SSR Sales Area / District": "",
  });

  
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  
  const isFormValid = Object.entries(form)
  .filter(([key]) => key !== "SSR") 
  .every(([, val]) => val.trim() !== "");


  // Submit form data if valid
  const handleSubmit = () => {
    if (!isFormValid) {
      alert("Please fill in all fields.");
      return;
    }
    onAdd(form);
    onClose();
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#333",
  };

  const rowStyle = {
    display: "flex",
    gap: "20px",
    marginBottom: "18px",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "15px",
      }}
      onClick={onClose} 
    >
      <div
        onClick={(e) => e.stopPropagation()} 
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "30px 35px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "25px", color: "#2a7a2a" }}>Add SSR</h2>

        {/* Row 1 */}
        <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <label htmlFor="SSR" style={labelStyle}>SSR</label>   
          </div>
          </div>
          <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <label htmlFor="Type" style={labelStyle}>Type</label>
            <input
              id="Type"
              name="Type"
              type="text"
              value={form.Type}
              onChange={handleChange}
              placeholder="Enter Type"
              style={inputStyle}
              autoComplete="off"
            />
          </div>
        </div>

        
        <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <label htmlFor="Name" style={labelStyle}>Name</label>
            <input
              id="Name"
              name="Name"
              type="text"
              value={form.Name}
              onChange={handleChange}
              placeholder="Enter Name"
              style={inputStyle}
              autoComplete="off"
            />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="Email ID" style={labelStyle}>Email ID</label>
            <input
              id="Email ID"
              name="Email ID"
              type="email"
              value={form["Email ID"]}
              onChange={handleChange}
              placeholder="Enter Email"
              style={inputStyle}
              autoComplete="off"
            />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="Title" style={labelStyle}>Title</label>
            <input
              id="Title"
              name="Title"
              type="text"
              value={form.Title}
              onChange={handleChange}
              placeholder="Enter Title"
              style={inputStyle}
              autoComplete="off"
            />
          </div>
        </div>


        <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <label htmlFor="Phone Number" style={labelStyle}>Phone Number</label>
            <input
              id="Phone Number"
              name="Phone Number"
              type="tel"
              value={form["Phone Number"]}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              style={inputStyle}
              autoComplete="off"
            />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="Commercial" style={labelStyle}>Commercial</label>
            <input
              id="Commercial"
              name="Commercial"
              type="text"
              value={form.Commercial}
              onChange={handleChange}
              placeholder="Enter Commercial Unit"
              style={inputStyle}
              autoComplete="off"
            />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="SSR Sales Area / District" style={labelStyle}>SSR Sales Area / District</label>
            <input
              id="SSR Sales Area / District"
              name="SSR Sales Area / District"
              type="text"
              value={form["SSR Sales Area / District"]}
              onChange={handleChange}
              placeholder="Enter Sales Area or District"
              style={inputStyle}
              autoComplete="off"
            />
          </div>
        </div>

      
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "10px 18px",
              fontSize: "14px",
              borderRadius: "6px",
              border: "1px solid #888",
              backgroundColor: "#fff",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f0f0"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid}
            style={{
              padding: "10px 22px",
              fontSize: "14px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: isFormValid ? "#2a7a2a" : "#94c394",
              color: "#fff",
              cursor: isFormValid ? "pointer" : "not-allowed",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={e => {
              if (isFormValid) e.currentTarget.style.backgroundColor = "#225f22";
            }}
            onMouseLeave={e => {
              if (isFormValid) e.currentTarget.style.backgroundColor = "#2a7a2a";
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRecordModal;
