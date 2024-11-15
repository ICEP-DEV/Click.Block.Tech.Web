import React from 'react';
import './style.css';
import profileIcon from '../assets/Homepage/account.png';
import notification from '../assets/Homepage/notification.png';
import appLogo from '../assets/Logo.png';

const ProfileHeader = () => {
  return (
    <div className="top-header">
      <div className="profile-icon">
        <img src={profileIcon} alt="Profile Icon" className="profile-icon-img" />
      </div>
      <div className="app-logo">
        <img src={appLogo} alt="App Logo" className="center-logo-img" />
      </div>
      <div className="notification-bell">
        <img src={notification} alt="Notification Icon" className="notification-icon-img" />
      </div>
    </div>
  );
};

export default ProfileHeader;
