import React from 'react';
import './CustomerDetailsModal.css';

const CustomerDetailsModal = ({ isOpen, onClose, customer, transactionData }) => {
  if (!isOpen || !customer) {
    return null;
  }

  // Extract fields directly from the API data
  const customerDetails = customer['Customer Details'];
  const email = customer['Email Address'];
  const registrationDate = customer['Registration Date'];
  const accountStatus = customer['Account Status'];
  const lastLogin = customer['Last Login'];

  // Placeholder requests & activityLog data - replace with actual API data if available
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
            <span className="status-text">{accountStatus}</span>
            <span className="visited-text">Visited Today {lastLogin}</span>
          </div>
          <h2 className="customer-name">{customerDetails}</h2>
          <div className="customer-details">
            <p><span>Customer Details:</span> {customerDetails}</p>
            <p><span>Email Address:</span> {email}</p>
            <p><span>Registration Date:</span> {registrationDate}</p>
            <p><span>Account Status:</span> {accountStatus}</p>
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

        {transactionData && (
          <>
            <h3 className="section-title">TRANSACTION DETAILS</h3>
            <div className="transaction-section">
              <p><strong>Transaction ID:</strong> {transactionData.TransactionID}</p>
              <p><strong>Account ID:</strong> {transactionData.AccountID}</p>
              <p><strong>Type:</strong> {transactionData.TransactionType}</p>
              <p><strong>Date:</strong> {new Date(transactionData.TransactionDate).toLocaleString()}</p>
              <p><strong>Amount:</strong> {transactionData.TransactionAmount}</p>
              <p><strong>Status:</strong> {transactionData.Status}</p>
              <p><strong>Is Panic Triggered:</strong> {transactionData.IsPanicTrigered ? 'Yes' : 'No'}</p>
              <p><strong>Location ID:</strong> {transactionData.LocationID}</p>
            </div>
          </>
        )}

        <div className="action-button-section">
          <button className="action-button freeze">Freeze</button>
          <button className="action-button deactivate">Deactivate</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
