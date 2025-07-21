import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UrlForm from "./UrlForm";
import UrlList from "./UrlList";
import Search from "./Search";
import Pagination from "./Pagination";

export default function Dashboard() {
  const currentUser = localStorage.getItem("currentUser");
  const [allUrls, setAllUrls] = useState([]);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const urlsPerPage = 1;
  const navigate=useNavigate();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shorturls_" + currentUser)) || [];
    setAllUrls(data);
    setFilteredUrls(data);
  }, [currentUser]);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [allUrls]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = allUrls.filter(
      (item) =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.original.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUrls(filtered);
    setPage(1);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
   navigate("/login", { replace: true }); 
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Welcome, {currentUser}</h2>
      <UrlForm allUrls={allUrls} setAllUrls={setAllUrls} currentUser={currentUser} />
      <Search searchTerm={searchTerm} setSearchTerm={handleSearch} />
      <UrlList
        urls={filteredUrls.slice((page - 1) * urlsPerPage, page * urlsPerPage)}
        allUrls={allUrls}
        setAllUrls={setAllUrls}
        currentUser={currentUser}
      />
      <Pagination
        total={filteredUrls.length}
        perPage={urlsPerPage}
        currentPage={page}
        setPage={setPage}
      />
      <button className="btn btn-danger w-100 mt-3" onClick={handleLogout}>Logout</button>
    </div>
  );
}
