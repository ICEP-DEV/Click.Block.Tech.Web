import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import './noti.css'; // Import the new noti.css for notification styles
import profileIcon from '../assets/Homepage/account.png';
import notification from '../assets/Homepage/notification.png';
import appLogo from '../assets/Logo.png';
import { BASE_URL } from '../API/API';

// Define the close icon URL
const closeIconURL = 'https://img.icons8.com/stickers/50/multiply-2.png';

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
          const alertsWithState = response.data.result.map((alert) => ({
            ...alert,
            isVisible: true,
            isSwiping: false,
            startX: 0,
            currentX: 0,
            translationX: 0,
          }));
          setAlerts(alertsWithState);
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

  const toggleNotificationPanel = (e) => {
    e.stopPropagation();
    setNotificationPanelVisible(!isNotificationPanelVisible);
  };

  // Swipe handlers
  const handleSwipeStart = (e, alertID) => {
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert._AlertID === alertID
          ? { ...alert, isSwiping: true, startX: clientX }
          : alert
      )
    );
  };

  const handleSwipeMove = (e, alertID) => {
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    e.preventDefault(); // Prevent scrolling
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) => {
        if (alert._AlertID === alertID && alert.isSwiping) {
          const translationX = clientX - alert.startX;
          return { ...alert, translationX };
        }
        return alert;
      })
    );
  };

  const handleSwipeEnd = (e, alertID) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) => {
        if (alert._AlertID === alertID && alert.isSwiping) {
          const threshold = 100;
          if (Math.abs(alert.translationX) > threshold) {
            // Dismiss the alert after animation
            setTimeout(() => {
              setAlerts((prevAlerts) =>
                prevAlerts.filter((a) => a._AlertID !== alertID)
              );
            }, 300); // Match with CSS transition duration
            return {
              ...alert,
              isSwiping: false,
              translationX: alert.translationX > 0 ? window.innerWidth : -window.innerWidth,
            };
          } else {
            // Reset position
            return { ...alert, translationX: 0, isSwiping: false };
          }
        }
        return alert;
      })
    );
  };

  const handleCloseClick = (alertID) => {
    // Dismiss the alert with a fade-out animation
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert._AlertID === alertID
          ? {
              ...alert,
              isClosing: true, // Flag to trigger fade-out
            }
          : alert
      )
    );
    // Remove the alert after the animation completes
    setTimeout(() => {
      setAlerts((prevAlerts) =>
        prevAlerts.filter((a) => a._AlertID !== alertID)
      );
    }, 300); // Duration matches the CSS transition
  };

  // Count visible alerts
  const visibleAlertsCount = alerts.filter((alert) => alert.isVisible).length;

  return (
    <div className="top-header" onClick={() => setNotificationPanelVisible(false)}>
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

      {/* notification bell */}
      <div className="notification-bell" onClick={toggleNotificationPanel}>
        <img src={notification} alt="Notification Icon" className="icon-img" />
        {visibleAlertsCount > 0 && <div className="notification-badge">{visibleAlertsCount}</div>}
        {isNotificationPanelVisible && (
          <div className="notification-panel">
            {alerts.filter((alert) => alert.isVisible).length > 0 ? (
              alerts
                .filter((alert) => alert.isVisible)
                .map((alert) => (
                  <div
                    className="notification-card"
                    key={alert._AlertID}
                    onTouchStart={(e) => handleSwipeStart(e, alert._AlertID)}
                    onTouchMove={(e) => handleSwipeMove(e, alert._AlertID)}
                    onTouchEnd={(e) => handleSwipeEnd(e, alert._AlertID)}
                    onMouseDown={(e) => handleSwipeStart(e, alert._AlertID)}
                    onMouseMove={(e) => alert.isSwiping && handleSwipeMove(e, alert._AlertID)}
                    onMouseUp={(e) => handleSwipeEnd(e, alert._AlertID)}
                    onMouseLeave={(e) => alert.isSwiping && handleSwipeEnd(e, alert._AlertID)}
                    style={{
                      transform: `translateX(${alert.translationX}px) rotate(${alert.translationX / 15}deg)`,
                      transition: alert.isSwiping
                        ? 'none'
                        : 'transform 0.3s ease, opacity 0.3s ease',
                      opacity: alert.isClosing
                        ? 0
                        : 1 - Math.abs(alert.translationX) / 300, // Fade out
                      userSelect: 'none',
                    }}
                  >
                    <div className="notification-content">
                      <h5>{alert._AlertType}</h5>
                      <p>{alert._Message ? alert._Message : 'No additional message'}</p>
                      <p>{new Date(alert._SentDate).toLocaleString()}</p>
                    </div>
                    <div
                      className="close-icon"
                      onClick={() => handleCloseClick(alert._AlertID)}
                    >
                      {/* Replace the '✖' with the image */}
                      <img src={closeIconURL} alt="Close Icon" className="close-icon-img" />
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
