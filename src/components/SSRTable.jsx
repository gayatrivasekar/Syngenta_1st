import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import SearchBar from "./SearchBar";
import EmployeeTable from "./EmployeeTable";
import Pagination from "./Pagination";
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    fetch("/employee_data.csv")
      .then((res) => res.text())
      .then((csv) => {
        Papa.parse(csv, {
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
      Object.values(row).some((val) =>
        val.toLowerCase().includes(keyword)
      )
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Employee Table</h2>
      <SearchBar search={search} onSearch={handleSearch} />
      <EmployeeTable records={currentRecords} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default App;
