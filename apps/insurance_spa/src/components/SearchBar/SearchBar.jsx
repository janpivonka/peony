import React from "react";
import "./SearchBarBase.css";
import "./SearchBarEffects.css";

export default function SearchBar({ isOpen, isVisible, query, setQuery, closeSearch, clearQuery, handleKeyDown, inputRef }) {
  if (!isOpen) return null;

  return (
    <div className={`search-container ${isVisible ? "open" : ""}`}>
      <button className="search-close-btn" onClick={closeSearch} aria-label="Zavřít vyhledávání">
        ✕
      </button>

      <input
        ref={inputRef}
        type="text"
        className="header-search-input"
        placeholder="Hledat..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Hledat"
      />

      {query && (
        <button className="search-clear-btn" onClick={clearQuery} aria-label="Vymazat text">
          ×
        </button>
      )}
    </div>
  );
}
