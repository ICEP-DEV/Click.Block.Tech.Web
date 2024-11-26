import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import './noti.css'; // Import the new noti.css for notification styles
import profileIcon from '../assets/Homepage/account.png';
import notification from '../assets/Homepage/notification.png';
import appLogo from '../assets/Logo.png';
import { BASE_URL } from '../API/API';

const ProfileHeader = () => {
  const navigate = useNavigate();
  const [isProfileCardVisible, setProfileCardVisible] = useState(false);
  const [isNotificationPanelVisible, setNotificationPanelVisible] = useState(false);
  const [adminDetails, setAdminDetails] = useState({ name: '', surname: '' });
  const [alerts, setAlerts] = useState([]);

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

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getAll_Alert`);
        if (response.data && response.data.result) {
          setAlerts(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminDetails');
    navigate('/');
  };

  const toggleProfileCard = () => {
    setProfileCardVisible(!isProfileCardVisible);
  };

  const toggleNotificationPanel = () => {
    setNotificationPanelVisible(!isNotificationPanelVisible);
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
      <div className="notification-bell" onClick={toggleNotificationPanel}>
        <img src={notification} alt="Notification Icon" className="icon-img" />
        {isNotificationPanelVisible && (
          <div className="notification-panel">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <div className="notification-card" key={alert._AlertID}>
                  <div className="notification-icon">
                    {/* Add an icon based on AlertType, here just using a placeholder */}
                    🔔
                  </div>
                  <div className="notification-content">
                    <h5>{alert._AlertType}</h5>
                    <p>{alert._Message ? alert._Message : "No additional message"}</p>
                    <p>{new Date(alert._SentDate).toLocaleString()}</p>
                  </div>
                  <div className="close-icon" onClick={() => setNotificationPanelVisible(false)}>
                    ✖
                  </div>
                </div>
              ))
            ) : (
              <p>No alerts available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
