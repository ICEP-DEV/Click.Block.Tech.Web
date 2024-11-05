import React from 'react';
import './style.css';
const StatsCards = () => {
  return (
    <div className="cards-container">
      <div className="card">
        <h2>Total Customer Accounts</h2>
        <p style={{ color: 'white' }}>1200</p>
      </div>
      <div className="card">
        <h2>Active Accounts</h2>
        <p style={{ color: '#4CAF50' }}>950</p>
      </div>
      <div className="card">
        <h2>Frozen Accounts</h2>
        <p style={{ color: 'grey' }}>50</p>
      </div>
      <div className="card">
        <h2>Deactivated Accounts</h2>
        <p style={{ color: 'red' }}>100</p>
      </div>
      <div className="card">
        <h2>Restored Accounts</h2>
        <p style={{ color: 'blue' }}>100</p>
      </div>
    </div>
  );
};

export default StatsCards;
