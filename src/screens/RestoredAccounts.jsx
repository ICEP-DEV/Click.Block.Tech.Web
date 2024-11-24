import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import SearchBar from './SearchBar';
import ProfileHeader from './ProfileHeader';
import { BASE_URL } from '../API/API'; // Ensure BASE_URL is correctly imported or defined

const RestoredAccounts = () => {
  const [restoredAccountsData, setRestoredAccountsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Use the navigate hook for routing

  useEffect(() => {
    const fetchRestoredAccounts = async () => {
      try {
        const token = localStorage.getItem('adminToken'); // Retrieve token if required
        const response = await axios.get(`${BASE_URL}/accounts/filter?status=restored`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token if your API requires authentication
          },
        });
        setRestoredAccountsData(response.data); // Update state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching restored accounts:', error.response ? error.response.data : error);
        setError('Failed to load restored accounts.'); // Update error state
        setLoading(false);
      }
    };

    fetchRestoredAccounts();
  }, []);

  // This function is passed to the SearchBar to handle search input
  const handleSearch = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    if (term === 'all') {
      navigate('/customer-accounts'); // Navigate to Customer Accounts component
    } else if (term === 'deactivated') {
      navigate('/deactivated-accounts'); // Navigate to Deactivated Accounts component
    } else if (term === 'restored') {
      navigate('/restored-accounts'); // Navigate to Restored Accounts component
    } else if (term === 'frozen') {
      navigate('/frozen-accounts'); // Navigate to Frozen Accounts component
    } else if (term === 'active') {
      navigate('/active-accounts'); // Navigate to Active Accounts component
    } else if (term === 'home') {
      navigate('/dashboard'); // Navigate to Home component
    }
    // Add other navigation logic here for other search terms if needed
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <ProfileHeader />
        <SearchBar onSearch={handleSearch} />
        <h2 className="dashboard-heading">RESTORED ACCOUNTS</h2>
        <div>Loading restored accounts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <ProfileHeader />
        <SearchBar onSearch={handleSearch} />
        <h2 className="dashboard-heading">RESTORED ACCOUNTS</h2>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <ProfileHeader />
      <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch as a prop */}
      <h2 className="dashboard-heading">RESTORED ACCOUNTS</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Email Address</th>
            <th>Customer Details</th>
            <th>Registration Date</th>
            <th>Account Status</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {restoredAccountsData.map((account, index) => (
            <tr key={index}>
              <td>{account['Email Address']}</td>
              <td>{account['Customer Details']}</td>
              <td>{account['Registration Date']}</td>
              <td>{account['Account Status']}</td>
              <td>{account['Last Login']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestoredAccounts;
