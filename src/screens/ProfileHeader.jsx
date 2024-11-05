import React from 'react';
import './style.css';
import profileIcon from '../assets/user.png';
import appLogo from '../assets/Logo.png';

const ProfileHeader = () => {
  return (
    <div className="top-header">
      <div className="profile-icon"><img src={profileIcon} alt="Profile Icon" /></div>
      <div className="app-logo"><img src={appLogo} alt="App Logo" /></div>
      <div className="notification-bell">🔔</div>
    </div>
  );
};

export default ProfileHeader;
