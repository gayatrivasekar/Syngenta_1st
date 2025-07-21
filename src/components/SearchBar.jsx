import React from "react";

const SearchBar = ({ search, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={onSearch}
      style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
    />
  );
};

export default SearchBar;
