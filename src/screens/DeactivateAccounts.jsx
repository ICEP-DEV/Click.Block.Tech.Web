import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import SearchBar from './SearchBar';
import ProfileHeader from './ProfileHeader';

const DeactivatedAccounts = () => {
  const DeactivatedAccounts = [
    { email: 'kjmoatshe@gmail.com', name: 'KJ Moatshe', registrationDate: '09/10/2024', status: 'Active', lastLogin: 'Today 11:04 am' },
    { email: 'bmwalee@gmail.com', name: 'B Mwale', registrationDate: '12/10/2024', status: 'Active', lastLogin: 'Today 09:30 am' },
    { email: 'Bmwale@gmail.com', name: 'B Mwale', registrationDate: '16/10/2024', status: 'Active', lastLogin: 'Today 09:50 am' },
  ];

  // This function is passed to the SearchBar to handle search input
  const navigate = useNavigate(); // Use the navigate hook for routing
  const handleSearch = (searchTerm) => {
    if (searchTerm === 'all' || searchTerm === 'All') {
      navigate('/customer-accounts'); // Navigate to Customer Accounts component
    } else if (searchTerm === 'deactivated' || searchTerm === 'Deactivated') {
      navigate('/deactivated-accounts'); // Navigate to Deactivated Accounts component
    } else if (searchTerm === 'restored' || searchTerm === 'Restored') {
      navigate('/restored-accounts'); // Navigate to Restored Accounts component
    } else if (searchTerm === 'frozen' || searchTerm === 'Frozen') {
      navigate('/frozen-accounts'); // Navigate to Frozen Accounts component
    } else if (searchTerm === 'active' || searchTerm === 'Active') {
      navigate('/active-accounts'); // Navigate to Active Accounts component
    } else if (searchTerm === 'home' || searchTerm === 'Home') {
        navigate('/'); // Navigate to Active Accounts component
     }

    // Add other navigation logic here for other search terms if needed
  };

  return (
    <div className="dashboard-container">
      <ProfileHeader />
      <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch as a prop */}
      <h2 className="dashboard-heading">DEACTIVATED ACCOUNTS</h2>
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
          {DeactivatedAccounts.map((account, index) => (
            <tr key={index}>
              <td>{account.email}</td>
              <td>{account.name}</td>
              <td>{account.registrationDate}</td>
              <td>{account.status}</td>
              <td>{account.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeactivatedAccounts;
