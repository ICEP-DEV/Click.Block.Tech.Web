import React from 'react';
import './realTime.css';  // Import the CSS for styling

// Import your icons 
import UserIcon from '../assets/user.png';
import BellIcon from '../assets/padlock.png';

// Import the background image
import BackgroundImage from '../assets/backgroundPic.jpeg';

function RealTimeTracking() {
  const handleBackClick = () => {
    console.log("Refresh button clicked");
  };

  return (
    <div className="realTimeTracking" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      {/* Header Section */}
      <header className="header">
        <div className="header-icon">
          <img src={UserIcon} alt="User Icon" className="icon" />
        </div>
        
        <div className="header-logo">
          <h1>NEXIS</h1>
          <p className="subtitle"> Real-time Tracking </p>
        </div>

        <div className="header-icon">
          <img src={BellIcon} alt="Bell Icon" className="icon" />
        </div>
      </header>

      {/* Main Container */}
      <div className="main-container">
        <p>Location display will go here</p>
      </div>

      {/* refresh Button Outside the Container */}
      <button className="refresh-button" onClick={handleBackClick}>Refresh</button>
    </div>
  );
}

export default RealTimeTracking;

