import React from "react";

export default function Pagination({ total, perPage, currentPage, setPage }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center mt-3">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`btn btn-sm mx-1 ${i + 1 === currentPage ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
