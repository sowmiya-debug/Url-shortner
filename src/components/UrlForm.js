import React, { useState } from "react";

export default function UrlForm({ allUrls, setAllUrls, currentUser }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleShorten = () => {
    if (!title || !url) return alert("Please fill all fields");
    if (allUrls.length >= 5) return alert("Only 5 URLs allowed");

    const short = Math.random().toString(36).substring(2, 8);
    const newUrl = {
      id: Date.now(),
      title,
      original: url,
      short,
      date: new Date().toLocaleString(),
    };

    const updated = [...allUrls, newUrl];
    setAllUrls(updated);
    localStorage.setItem("shorturls_" + currentUser, JSON.stringify(updated));
    setTitle("");
    setUrl("");
  };

  return (
    <div className="mb-4">
      <input
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Original URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={handleShorten}>
        Add URL
      </button>
    </div>
  );
}
