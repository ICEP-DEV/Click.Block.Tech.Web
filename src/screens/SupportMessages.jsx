import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Import an icon for user initials
import './style.css';

const SupportMessages = ({ supportMessages }) => {
  return (
    <div className="support-messages-section">
      <div className="support-messages-container">
        {supportMessages.map((msg, index) => (
          <div className="support-card" key={index}>
            <div className="support-card-header">
              <FaUserCircle className="support-card-icon" />
              <div>
                <h3 className="support-card-name">
                  {msg.initials} {msg.surname}
                </h3>
                <p className="support-card-email">{msg.email}</p>
              </div>
            </div>
            <div className="support-card-body">
              <p>
                <strong>Full names:</strong> {msg.fullName}
              </p>
              <p>
                <strong>Phone Number:</strong> {msg.phoneNumber}
              </p>
              <p>
                <strong>Email address:</strong> {msg.email}
              </p>
              <p className="support-card-message">{msg.message}</p>
              <p className="support-card-datetime">{msg.dateTime}</p>
            </div>
            <div className="support-buttons">
              <button className="resolve-btn">Resolve</button>
              <button className="view-btn">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportMessages;
