import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
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
            <tr key={index} onClick={() => handleRowClick(account)} style={{ cursor: 'pointer' }}>
              <td>{account['Email Address']}</td>
              <td>{account['Customer Details']}</td>
              <td>{account['Registration Date']}</td>
              <td>{account['Account Status']}</td>
              <td>{account['Last Login']}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedCustomer && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>X</button>
            <div className="profile-section">
              <img src={selectedCustomer.profilePicture || 'default-avatar.png'} alt="Customer" className="profile-picture" />
              <div className="customer-info">
                <h3>{selectedCustomer['Customer Details']}</h3>
                <div className="status-badge">Active Now</div>
                <p>Visited Today {selectedCustomer['Last Login']}</p>
              </div>
            </div>
            <div className="tabs">
              <button className="tab-button active">Overview</button>
              <button className="tab-button">Login</button>
              <button className="tab-button">Transaction</button>
            </div>
            <div className="requests-section">
              <h5>REQUESTS</h5>
              <p>Support Message <span className="timestamp">Yesterday 08:35</span></p>
            </div>
            <div className="activity-log">
              <h5>RECENT ACTIVITY LOG</h5>
              {selectedCustomer.activityLog && selectedCustomer.activityLog.map((log, idx) => (
                <div className={`log-entry ${log.status}`} key={idx}>
                  <h6>{log.activity}</h6>
                  <span className="timestamp">{log.date}</span>
                </div>
              ))}
            </div>
            <div className="button-section">
              <button className="action-button freeze">Freeze</button>
              <button className="action-button deactivate">Deactivate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAccounts;
