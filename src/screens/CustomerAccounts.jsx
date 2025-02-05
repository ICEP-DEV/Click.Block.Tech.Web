import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProfileHeader from './ProfileHeader';
import CustomerDetailsModal from './CustomerDetailsModal';
import { BASE_URL } from '../API/API'; // Ensure BASE_URL is correctly imported or defined
 
const CustomerAccounts = () => {
  const [customerAccountsData, setCustomerAccountsData] = useState([]);
  const [selectedCustomerDetails, setSelectedCustomerDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
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
 
  const handleRowClick = async (customer) => {
    try {
      const response = await axios.get(`${BASE_URL}/getCustomerDetails/${customer.CustID_Nr}`);
      setSelectedCustomerDetails(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching customer details:', error.response ? error.response.data : error);
    }
  };
 
  const closeModal = () => {
    setSelectedCustomerDetails(null);
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
            <tr
              key={index}
              onClick={() => handleRowClick(account)}
              style={{ cursor: 'pointer' }}
            >
              <td>{account['Email Address']}</td>
              <td>{account['Customer Details']}</td>
              <td>{account['Registration Date']}</td>
              <td>{account['Account Status']}</td>
              <td>{account['Last Login']}</td>
            </tr>
          ))}
        </tbody>
      </table>
 
      {isModalOpen && (
        <CustomerDetailsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          customerDetails={selectedCustomerDetails}
        />
      )}
    </div>
  );
};
 
export default CustomerAccounts;
