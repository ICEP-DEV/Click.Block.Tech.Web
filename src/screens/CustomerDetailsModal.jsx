import React from 'react';
import './CustomerDetailsModal.css';
 
const CustomerDetailsModal = ({ isOpen, onClose, customerDetails }) => {
  if (!isOpen || !customerDetails) {
    return null;
  }
 
  const { name, email, phoneNumber, address, registeredOn, lastLogin, requests, recentActivityLog } = customerDetails;
 
  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="custom-close-button" onClick={onClose}>X</button>
 
        <h2 className="customer-name">{name}</h2>
        <div className="customer-details">
          <p><span>Email:</span> {email}</p>
          <p><span>Phone:</span> {phoneNumber}</p>
          <p><span>Address:</span> {address}</p>
          <p><span>Registered On:</span> {new Date(registeredOn).toLocaleDateString()}</p>
          <p><span>Last Login:</span> {new Date(lastLogin).toLocaleString()}</p>
        </div>
 
        <h3 className="section-title">Requests</h3>
        <div className="requests-section">
          {requests && requests.length > 0 ? (
            requests.map((req, index) => (
              <div className="request-item" key={index}>
                <div className="request-type">{req.type}</div>
                <div className="request-date">{new Date(req.time).toLocaleString()}</div>
              </div>
            ))
          ) : (
            <p>No requests found.</p>
          )}
        </div>
 
        <h3 className="section-title">Recent Activity Log</h3>
        <div className="activity-log-section">
          {recentActivityLog && recentActivityLog.length > 0 ? (
            recentActivityLog.map((log, index) => (
              <div className="log-item" key={index}>
                <div className="log-activity">{log.type}</div>
                <div className="log-date">{new Date(log.date).toLocaleDateString()}</div>
              </div>
            ))
          ) : (
            <p>No activity log found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default CustomerDetailsModal;