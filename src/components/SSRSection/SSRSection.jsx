import React from "react";
import SearchBar from "../SearchBar";
import SSRTable from "../SSRTable";
import Pagination from "../Pagination";
import AddRecordModal from "../AddRecordModal";

const SSRSection = ({
  search,
  onSearch,
  onAddClick,
  records,
  totalPages,
  currentPage,
  onPageChange,
  showModal,
  onCloseModal,
  onAddRecord,
}) => {
  return (
    <>
      <h2>SSR LIST</h2>

      <SearchBar search={search} onSearch={onSearch} onAddClick={onAddClick} />

      <SSRTable records={records} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />

      {showModal && (
        <AddRecordModal onClose={onCloseModal} onAdd={onAddRecord} />
      )}
    </>
  );
};

export default SSRSection;
