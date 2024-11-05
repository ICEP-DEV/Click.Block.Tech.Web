import React from 'react';
import './style.css';

const SupportMessages = ({ supportMessages }) => {
  return (
    <div className="support-messages-section">
      <h2 className="section-heading">Support Messages</h2>
      <div className="support-messages-container">
        {supportMessages.map((msg, index) => (
          <div className="support-card" key={index}>
            <h3>{msg.initials} {msg.surname}</h3>
            <p>Email: {msg.email}</p>
            <p>Date/Time: {msg.dateTime}</p>
            <p>{msg.message}</p>
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
