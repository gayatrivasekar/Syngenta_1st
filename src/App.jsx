import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import dataparse from "papaparse";

import AddRecordModal from "./components/AddRecordModal.jsx";
import Pagination from "./components/Pagination";
import SSRTable from "./components/SSRTable";
import SearchBar from "./components/SearchBar";
import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Sidebar/Sidebar";
import CatalogCard from "./components/CatalogCard/CatalogCard";
import AdminCatalog from "./components/AdminCatalog/AdminCatalog";
import RetailerCatalog from "./components/RetailerCatalog/RetailerCatalog";

// ✅ Corrected this import
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";
import CompanyDetailsView from "./components/CompanyDetailsView/CompanyDetailsView";

import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showSSR, setShowSSR] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showRetailer, setShowRetailer] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState("");

  const recordsPerPage = 10;

  useEffect(() => {
    const storedData = localStorage.getItem("employeeData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setData(parsed);
      setFiltered(parsed);
    } else {
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
    }
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
    localStorage.setItem("employeeData", JSON.stringify(updatedData));
  };

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / recordsPerPage);

  

  return (
    <Router>
      <div className="app-container" style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Topbar />
          <div style={{ padding: "20px", flex: 1, overflowY: "auto" }}>
            <Routes>
      
              <Route
                path="/"
                element={
                  <>
                    <CatalogCard
                      title="SSR Catalog"
                      description="Please add SSR to configure the grower data"
                      isOpen={showSSR}
                      onClick={() => setShowSSR(!showSSR)}
                    >
                  
                      <SearchBar
                        search={search}
                        onSearch={handleSearch}
                        onAddClick={() => setShowModal(true)}
                      />
                      <SSRTable records={currentRecords} />
                      <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                      />
                      {showModal && (
                        <AddRecordModal
                          onClose={() => setShowModal(false)}
                          onAdd={handleAddRecord}
                        />
                      )}
                    </CatalogCard>

                    <CatalogCard
                      title="Admin Catalog"
                      isOpen={showAdmin}
                      onClick={() => setShowAdmin(!showAdmin)}
                    >
                      <AdminCatalog />
                    </CatalogCard>

                    <CatalogCard
                      title="Retailer Catalog"
                      isOpen={showRetailer}
                      onClick={() => setShowRetailer(!showRetailer)}
                    >
                     <RetailerCatalog
                      label="Retailer Name"
                     value={selectedRetailer}
                     onChange={setSelectedRetailer}
                    />

                      {selectedRetailer && (
                        <p>
                           <strong>{selectedRetailer}</strong>
                        </p>
                      )}
                    </CatalogCard>
                  </>
                }
              />

              {/* ✅ Route for full company table */}
              <Route path="/admin" element={<CompanyDetails />} />

              {/* ✅ Route for company detail view page */}
              <Route path="/company/:companyName" element={<CompanyDetailsView />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
