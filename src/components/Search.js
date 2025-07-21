
import React, { useState } from "react";

export default function Search({ searchTerm, setSearchTerm }) {

   const [input, setInput] = useState(searchTerm);

  const handleClick = () => {
    setSearchTerm(input);
  };
  return (
    <div className="mb-3">
      <input
        className="form-control"
        placeholder="Search by title or URL"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleClick}>
        Search
      </button>
    </div>
  );
}
