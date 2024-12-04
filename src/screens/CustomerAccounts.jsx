import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './noti.css';
import ProfileHeader from './ProfileHeader';
import { BASE_URL } from '../API/API'; // Ensure BASE_URL is correctly imported or defined

const CustomerAccounts = () => {
  const [customerAccountsData, setCustomerAccountsData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null); // State for selected customer
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerAccounts = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${BASE_URL}/customers/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched Data:", response.data); // Debug fetched data
        setCustomerAccountsData(response.data);
      } catch (error) {
        console.error('Error fetching customer accounts:', error.response ? error.response.data : error);
      }
    };

    fetchCustomerAccounts();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.toLowerCase() === 'all') {
      navigate('/customer-accounts');
    } else if (searchTerm.toLowerCase() === 'deactivated') {
      navigate('/deactivated-accounts');
    } else if (searchTerm.toLowerCase() === 'restored') {
      navigate('/restored-accounts');
    } else if (searchTerm.toLowerCase() === 'frozen') {
      navigate('/frozen-accounts');
    } else if (searchTerm.toLowerCase() === 'active') {
      navigate('/active-accounts');
    } else if (searchTerm.toLowerCase() === 'home') {
      navigate('/dashboard');
    }
  };

  const handleRowClick = (customer) => {
    console.log("Row clicked:", customer); // Debug the click event
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard-container">
      <ProfileHeader />
      <SearchBar onSearch={handleSearch} />
      <h2 className="dashboard-heading">CUSTOMER ACCOUNTS MANAGEMENT</h2>
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
          {customerAccountsData.map((account, index) => (
            <tr key={index} onClick={() => handleRowClick(account)}>
              <td>{account['email']}</td>
              <td>{account['customerDetails']}</td>
              <td>{account['registrationDate']}</td>
              <td>{account['accountStatus']}</td>
              <td>{account['lastLogin']}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedCustomer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>X</button>
            <h3>{selectedCustomer.customerDetails}</h3>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Phone Number:</strong> {selectedCustomer.phoneNumber}</p>
            <p><strong>Address:</strong> {selectedCustomer.physicalAddress}</p>
            <p><strong>Registered On:</strong> {selectedCustomer.registrationDate}</p>
            <p><strong>Last Login:</strong> {selectedCustomer.lastLogin}</p>
            <p><strong>Account Status:</strong> {selectedCustomer.accountStatus}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAccounts;
