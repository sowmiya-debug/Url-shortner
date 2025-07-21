import React from "react";

export default function UrlList({ urls, allUrls, setAllUrls, currentUser }) {
  const handleDelete = (id) => {
    const updated = allUrls.filter((item) => item.id !== id);
    setAllUrls(updated);
    localStorage.setItem("shorturls_" + currentUser, JSON.stringify(updated));
  };

  const handleEdit = (id) => {
    const itemToEdit = allUrls.find((item) => item.id === id);
    if (!itemToEdit) return;

    const newTitle = prompt("Edit title:", itemToEdit.title);
    if (!newTitle) return;

    const newOriginal = prompt("Edit original URL:", itemToEdit.original);
    if (!newOriginal) return;

    const updated = allUrls.map((item) =>
      item.id === id
        ? { ...item, title: newTitle.trim(), original: newOriginal.trim() }
        : item
    );

    setAllUrls(updated);
    localStorage.setItem("shorturls_" + currentUser, JSON.stringify(updated));
  };

  return (
    <div>
      {urls.length === 0 && <p>No URLs found.</p>}
      <ul className="list-group">
        {urls.map((item) => (
          <li key={item.id} className="list-group-item">
            <strong>{item.title}</strong> <br />
            <span>Original:</span> {item.original} <br />
            <span>Short:</span>{" "}
            <a href={item.original} target="_blank" rel="noreferrer">
              https://short.ly/{item.short}
            </a>
            <br />
            <small>{item.date}</small>
            <div className="mt-2">
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(item.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
