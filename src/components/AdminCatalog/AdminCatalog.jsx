import React, { useEffect, useState, useRef } from "react";
import Papa from "papaparse";
import "./AdminCatalog.css";

const AdminCatalog = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const filterBoxRef = useRef(null);
  const titleHeaderRef = useRef(null);
  const [filterPosition, setFilterPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    fetch("/admin_catalog.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
          },
        });
      });
  }, []);

  const allTitles = [...new Set(data.map((row) => row.Title))];

  const handleTitleFilterChange = (title) => {
    if (selectedTitles.includes(title)) {
      setSelectedTitles(selectedTitles.filter((t) => t !== title));
    } else {
      setSelectedTitles([...selectedTitles, title]);
    }
  };

  const handleReset = () => {
    setSelectedTitles([]);
    setShowFilter(false);
  };

  const handleApply = () => {
    setShowFilter(false);
  };

  const filtered = data.filter((row) => {
    const matchesSearch = Object.values(row).some((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    );
    const matchesTitle =
      selectedTitles.length === 0 || selectedTitles.includes(row.Title);
    return matchesSearch && matchesTitle;
  });

  // Position filter popup below Title header
  const toggleFilter = () => {
    if (titleHeaderRef.current) {
      const rect = titleHeaderRef.current.getBoundingClientRect();
      setFilterPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setShowFilter((prev) => !prev);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filterBoxRef.current &&
        !filterBoxRef.current.contains(e.target) &&
        !titleHeaderRef.current.contains(e.target)
      ) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="admin-catalog">
      <div className="admin-catalog-header">
        <h2>Admin Catalog</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            {data[0] &&
              Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  ref={key === "Title" ? titleHeaderRef : null}
                  style={{ position: "relative" }}
                >
                  {key}
                  {key === "Title" && (
                    <span
                      className="filter-icon"
                      onClick={toggleFilter}
                      style={{ marginLeft: "5px", cursor: "pointer" }}
                    >
                      ▼
                    </span>
                  )}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {showFilter && (
        <div
          className="filter-dropdown"
          ref={filterBoxRef}
          style={{
            position: "absolute",
            top: filterPosition.top + "px",
            left: filterPosition.left + "px",
          }}
        >
          <div className="filter-options-scroll">
            {allTitles.map((title) => (
              <label key={title} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedTitles.includes(title)}
                  onChange={() => handleTitleFilterChange(title)}
                />
                <span style={{ marginLeft: "5px" }}>{title}</span>
              </label>
            ))}
          </div>
          <div className="filter-actions-fixed">
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleApply}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCatalog;
