import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './style.css';
import profileIcon from '../assets/Homepage/account.png';
import notification from '../assets/Homepage/notification.png';
import appLogo from '../assets/Logo.png';


const ProfileHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminDetails');
    // Navigate back to the login page
    navigate('/login');
  };

  return (
    <div className="top-header">
      <div className="profile-icon">
        <img src={profileIcon} alt="Profile Icon" className="icon-img" />
      </div>
      <div className="app-logo">
        <img src={appLogo} alt="App Logo" className="center-logo-img" />
      </div>
      <div className="logout-button" onClick={handleLogout}>
        Logout
        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828466.png" alt="Logout Icon" className="icon-img" />
      </div>
      <div className="notification-bell">
        <img src={notification} alt="Notification Icon" className="icon-img" />
      </div>
    </div>
  );
};

export default ProfileHeader;
