import React, { useEffect, useState } from "react";
import dataparse from "papaparse";
import AddRecordModal from "./components/AddRecordModal.jsx";
import Pagination from "./components/Pagination";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const recordsPerPage = 10;

  useEffect(() => {
    fetch("/employee_data.csv")
      .then((res) => res.text())
      .then((csv) => {
        dataparse.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            setFiltered(results.data);
          },
        });
      });
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);
    const filteredData = data.filter((row) =>
      Object.values(row).some((val) => val.toLowerCase().includes(keyword))
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  };

  const handleAddRecord = (newRecord) => {
    const updatedData = [newRecord, ...data];
    setData(updatedData);
    setFiltered(updatedData);
  };

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>SSR LIST</h2>

     <div className="action-bar">
  <div className="action-right">
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={handleSearch}
      className="search-box"
    />
    <button onClick={() => setShowModal(true)} className="manual-button">
      Manual SSR Creation+
    </button>
  </div>
</div>


      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Email ID</th>
            <th>Phone Number</th>
            <th>Commercial</th>
            <th>SSR Sales Area / District</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((row, i) => (
            <tr key={i}>
              <td>{row["Name"]}</td>
              <td>{row["Title"]}</td>
              <td>{row["Email ID"]}</td>
              <td>{row["Phone Number"]}</td>
              <td>{row["Commercial"]}</td>
              <td>{row["SSR Sales Area / District"]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
 <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Add Record Modal */}
      {showModal && (
        <AddRecordModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddRecord}
        />
      )}
    </div>
  );
};

export default App;