// src/components/SearchBar.js
import React from 'react';
import './style.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search customer accounts..." className="search-input" />
    </div>
  );
};

export default SearchBar;
