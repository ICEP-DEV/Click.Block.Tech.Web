import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './style.css';
import profileIcon from '../assets/Homepage/account.png';
import notification from '../assets/Homepage/notification.png';
import appLogo from '../assets/Logo.png';

const ProfileHeader = () => {
  const navigate = useNavigate();
  const [isProfileCardVisible, setProfileCardVisible] = useState(false);
  const [adminDetails, setAdminDetails] = useState({ name: 'Shantel', surname: 'Msimango' });

  useEffect(() => {
    // Fetch admin details from localStorage
    const storedAdminDetails = localStorage.getItem('adminDetails');
    if (storedAdminDetails) {
      setAdminDetails(JSON.parse(storedAdminDetails));
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminDetails');
    // Navigate back to the login page
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
            <div className='card-main'>
              <img className='tokenImage' src={appLogo} alt="App Logo" />
              <hr />
              <h5 style={{ textAlign: 'center' }}>{adminDetails.name} {adminDetails.surname}</h5>
              <hr />
              <div className='creator'>
                <button onClick={handleLogout} className="logout-button"><b>Logout</b></button>
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
