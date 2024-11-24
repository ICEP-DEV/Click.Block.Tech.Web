import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import profileIcon from '../assets/Homepage/account.png';
import notification from '../assets/Homepage/notification.png';
import appLogo from '../assets/Logo.png';
import { BASE_URL } from '../API/API';

const ProfileHeader = () => {
  const navigate = useNavigate();
  const [isProfileCardVisible, setProfileCardVisible] = useState(false);
  const [adminDetails, setAdminDetails] = useState({ name: '', surname: '' });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const storedAdminDetails = localStorage.getItem('adminDetails');
        const adminID = storedAdminDetails ? JSON.parse(storedAdminDetails)._AdminID : null;

        if (adminID) {
          const token = localStorage.getItem('adminToken');
          const response = await axios.get(`${BASE_URL}/admin/${adminID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { _FirstName, _LastName } = response.data;
          setAdminDetails({ name: _FirstName, surname: _LastName });
        } else {
          console.error('No admin ID found in localStorage');
        }
      } catch (err) {
        console.error('Error fetching admin details:', err.response ? err.response.data : err);
        setAdminDetails({ name: 'Unknown', surname: 'User' });
      }
    };

    fetchAdminDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminDetails');
    navigate('/');
  };

  const toggleProfileCard = () => {
    setProfileCardVisible(!isProfileCardVisible);
  };

  return (
    <div className="top-header">
      <div className="profile-icon" onClick={toggleProfileCard}>
        <img src={profileIcon} alt="Profile Icon" className="icon-img" />
        {isProfileCardVisible && (
          <div className="profile-card">
            <div className="card-main">
              <img className="tokenImage" src={appLogo} alt="App Logo" />
              <hr />
              <h5 style={{ textAlign: 'center' }}>
                {adminDetails.name} {adminDetails.surname}
              </h5>
              <hr />
              <div className="creator">
                <button onClick={handleLogout} className="logout-button">
                  <b>Logout</b>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="app-logo">
        <img src={appLogo} alt="App Logo" className="center-logo-img" />
      </div>
      <div className="notification-bell">
        <img src={notification} alt="Notification Icon" className="icon-img" />
      </div>
    </div>
  );
};

export default ProfileHeader;
