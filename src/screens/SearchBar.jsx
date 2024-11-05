// src/components/SearchBar.js
import React, { useState } from 'react';
import './style.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="custom-search-bar">
      <input
        type="text"
        placeholder="Search Here"
        className="custom-search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
    </div>
  );
};

export default SearchBar;
