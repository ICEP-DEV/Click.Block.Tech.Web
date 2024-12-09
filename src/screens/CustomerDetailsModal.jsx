import React from 'react';
import './CustomerDetailsModal.css';

const CustomerDetailsModal = ({ isOpen, onClose, customer, transactionData }) => {
  if (!isOpen || !customer) {
    return null;
  }

  // Example data points (adjust keys to match your actual data)
  const fullName = customer['Fullname(s)'] || 'N/A';
  const email = customer['Email Address'] || 'N/A';
  const phone = customer['Phone number'] || 'N/A';
  const address = customer['Physical Address'] || 'N/A';
  const registeredOn = customer['Registered On'] || 'N/A';
  const verified = customer['Verified'] || 'N/A';
  const lastLogin = customer['Last Login'] || 'N/A';

  const requests = customer.requests || [
    { type: 'Support Message', date: 'Yesterday 08:35' }
  ];

  const activityLog = customer.activityLog || [
    { activity: 'Withdrawal', date: '28 Oct 12:30', color: '#2ecc71' },
    { activity: 'Account Restored', date: '27 Oct 09:00', color: '#3498db' },
    { activity: 'Panic Pin Triggered', date: '26 Oct 19:09', color: '#e67e22' },
    { activity: 'Airtime', date: '24 Oct 08:10', color: '#9b59b6' },
    { activity: 'BluVoucher', date: '27 Oct 07:00', color: '#e74c3c' },
  ];

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="custom-close-button" onClick={onClose}>X</button>

        <div className="custom-tabs">
          <button className="custom-tab-button active">Overview</button>
          <button className="custom-tab-button">Login</button>
          <button className="custom-tab-button">Transaction</button>
        </div>

        <div className="custom-profile-section">
          <div className="status-row">
            <span className="status-indicator"></span>
            <span className="status-text">Active Now</span>
            <span className="visited-text">Visited Today {lastLogin}</span>
          </div>
          <h2 className="customer-name">{fullName}</h2>
          <div className="customer-details">
            <p><span>Fullname(s):</span> {fullName}</p>
            <p><span>Email Address:</span> {email}</p>
            <p><span>Phone number:</span> {phone}</p>
            <p><span>Physical Address:</span> {address}</p>
            <p><span>Registered On:</span> {registeredOn}</p>
            <p><span>Verified:</span> {verified}</p>
            <p><span>Last Login:</span> {lastLogin}</p>
          </div>
        </div>

        <h3 className="section-title">REQUESTS</h3>
        <div className="requests-section">
          {requests.map((req, index) => (
            <div className="request-item" key={index}>
              <div className="request-type">{req.type}</div>
              <div className="request-date">{req.date}</div>
            </div>
          ))}
        </div>

        <h3 className="section-title">RECENT ACTIVITY LOG</h3>
        <div className="activity-log-section">
          {activityLog.map((log, idx) => (
            <div className="log-item" key={idx} style={{borderLeftColor: log.color}}>
              <div className="log-activity">{log.activity}</div>
              <div className="log-date">{log.date}</div>
            </div>
          ))}
        </div>

        <div className="action-button-section">
          <button className="action-button freeze">Freeze</button>
          <button className="action-button deactivate">Deactivate</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
