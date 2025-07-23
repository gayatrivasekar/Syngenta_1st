

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const maxVisible = 5; 
  const currentGroup = Math.floor((currentPage - 1) / maxVisible);
  const startPage = currentGroup * maxVisible + 1;
  const endPage = Math.min(startPage + maxVisible - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }}>
      {/* Left Arrow */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          marginRight: "5px",
          padding: "5px 10px",
          background: "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        ◀
      </button>

  
      {pageNumbers.map((page) => (
        <button
  key={page}
  onClick={() => onPageChange(page)}
  style={{
    marginRight: "5px",
    padding: "5px 10px",
    background: currentPage === page ? "green" : "white",
    color: currentPage === page ? "white" : "green",
    border: "2px solid green",
    borderRadius: "4px",
    cursor: "pointer"
  }}
>
  {page}
</button>
      ))}

      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: "5px 10px",
          background: "#ccc",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
