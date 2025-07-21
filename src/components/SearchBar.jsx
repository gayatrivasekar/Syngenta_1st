import React from "react";

const SearchBar = ({ search, onSearch, onAddClick }) => {
  return (
    <div className="action-bar">
      <div className="action-right">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={onSearch}
          className="search-box"
        />
        <button onClick={onAddClick} className="manual-button">
          Manual SSR Creation+
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
