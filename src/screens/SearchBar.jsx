import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa'; // Import the three-dot icon
import './searchstyles.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
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
      <div className="three-dot-menu" onClick={toggleDropdown}>
        <FaEllipsisV />
      </div>
      {isDropdownVisible && (
        <div className="dropdown">
          <p onClick={() => onSearch('active')}>View Active Accounts</p>
          <p onClick={() => onSearch('frozen')}>View Frozen Accounts</p>
          <p onClick={() => onSearch('deactivated')}>View Deactivated Accounts</p>
          <p onClick={() => onSearch('verified')}>View Verified Accounts</p>
          <p onClick={() => onSearch('registration')}>Registration Date</p>
          <p onClick={() => onSearch('login')}>Login Date</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
