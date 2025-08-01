import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import "./CompanyDetails.css";

const CompanyDetails = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/company-details.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
            setFilteredData(result.data); 
          },
        });
      });
  }, []);

  useEffect(() => {
    const keyword = searchTerm.toLowerCase();
    const results = data.filter((row) =>
      Object.values(row).some((value) =>
        value?.toLowerCase().includes(keyword)
      )
    );
    setFilteredData(results);
  }, [searchTerm, data]);

  const columns = [
    "Company Name",
    "Contact Name",
    "Contact Email ID",
    "Contact Number",
    "Retailer",
    "SSR Contact",
    "SFDC Contact ID",
    "SFDC Account ID",
    "Committed",
    "SE Purchase(USD)",
    "Total Committed Area(Acres)",
    "Actual SE Purchases(USD)",
    "Total Actual Area(Acres)",
    "StageStatus of Customer",
    "Date of Registration",
    "Invoices count",
  ];

  return (
    <div className="company-details">
      <div className="header-row">
        <h2>Company Details</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="top-controls">
        <div className="left-side">
          <select className="email-reminder">
            <option>Select reminder option</option>
          </select>
        </div>
        <div className="right-side">
          <button>Send Email Reminder</button>
          <button>Confirm Actuals</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/company/${encodeURIComponent(row["Company Name"])}`, {
                    state: row,
                  })
                }
              >
                <td><input type="checkbox" /></td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col] || "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button>{"<"}</button>
        <span>1</span>
        <select>
          <option>50/page</option>
          <option>100/page</option>
        </select>
      </div>
    </div>
  );
};

export default CompanyDetails;
