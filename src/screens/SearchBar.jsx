import React, { useState, useEffect, useRef } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import './searchstyles.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        !menuRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!isDropdownVisible);
  };

  const handleDropdownItemClick = (searchTerm) => {
    onSearch(searchTerm);
    setDropdownVisible(false);
  };

  return (
    <div className="custom-search-bar">
      <input
        type="text"
        placeholder="Search Customer Account Here"
        className="custom-search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        onClick={(e) => e.stopPropagation()} // Prevent dropdown closing when clicking inside input
      />
      <div 
        ref={menuRef}
        className="three-dot-menu" 
        onClick={toggleDropdown}
      >
        <FaEllipsisV />
      </div>

      {isDropdownVisible && (
        <div ref={dropdownRef} className="dropdown">
          <div className="dropdown-section">
            <div className="section-header">Status</div>
            <button onClick={() => handleDropdownItemClick('frozen')}>Frozen</button>
            <button onClick={() => handleDropdownItemClick('active')}>Active</button>
            <button onClick={() => handleDropdownItemClick('deactivated')}>Deactivated</button>
            <button onClick={() => handleDropdownItemClick('verified')}>Verified</button>
          </div>
          <div className="dropdown-section">
            <div className="section-header">Date Ranges</div>
            <button onClick={() => handleDropdownItemClick('registrationDate')}>Registration Date</button>
            <button onClick={() => handleDropdownItemClick('loginDate')}>Login Date</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
