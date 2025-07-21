import React, { useEffect, useState } from "react";
import dataparse from "papaparse";
import AddRecordModal from "./components/AddRecordModal.jsx";
import Pagination from "./components/Pagination";
import SSRTable from "./components/SSRTable";
import SearchBar from "./components/SearchBar";
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

    <SearchBar
  search={search}
  onSearch={handleSearch}
  onAddClick={() => setShowModal(true)}
/>


<SSRTable records={currentRecords} />

      
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