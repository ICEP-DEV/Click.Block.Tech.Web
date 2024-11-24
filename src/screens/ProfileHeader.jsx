import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import './style.css';
import profileIcon from '../assets/Homepage/account.png';
import notification from '../assets/Homepage/notification.png';
import appLogo from '../assets/Logo.png';
import { BASE_URL } from '../API/API'; // Ensure correct import for BASE_URL

const ProfileHeader = () => {
  const navigate = useNavigate();
  const [isProfileCardVisible, setProfileCardVisible] = useState(false);
  const [adminDetails, setAdminDetails] = useState({ name: '', surname: '' });

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        // Fetch admin ID from localStorage or another source
        const storedAdminDetails = localStorage.getItem('adminDetails');
        const adminID = storedAdminDetails ? JSON.parse(storedAdminDetails).adminID : null;

        if (adminID) {
          // Make API call to fetch admin details
          const response = await axios.get(`${BASE_URL}/admin/${adminID}`);
          const { _FirstName, _LastName } = response.data; // Use the correct response keys
          setAdminDetails({ name: _FirstName, surname: _LastName });
        }
      } catch (err) {
        console.error('Error fetching admin details:', err);
        setAdminDetails({ name: 'Unknown', surname: 'User' }); // Fallback for errors
      }
    };

    fetchAdminDetails();
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminDetails');
    // Navigate back to the login page
    navigate('/login');
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
