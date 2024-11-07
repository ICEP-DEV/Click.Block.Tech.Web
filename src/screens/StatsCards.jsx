import React from 'react';
import { FaUsers } from 'react-icons/fa'; // Importing an icon library for user icons
import './style.css';

const StatsCards = () => {
  return (
    <div className="cards-container">
      
      <div className="card">
        <FaUsers className="card-icon" />
        <p className="card-value" >1200</p>
        <h3 style={{ color: 'white' }}>Total Customer Accounts</h3>
      </div>
      <div className="card">
        <FaUsers className="card-icon" />
        <p className="card-value active-value">950</p>
        <h3  style={{ color: 'white' }}>Active Accounts</h3>
       
      </div>
      <div className="card">
        <FaUsers className="card-icon" />
        <p className="card-value frozen-value">50</p>
        <h3  style={{ color: 'white' }}>Frozen Accounts</h3>
        
      </div>
      <div className="card">
        <FaUsers className="card-icon" />
        <p className="card-value deactivated-value">100</p>
        <h3  style={{ color: 'white' }}>Deactivated Accounts</h3>
        
      </div>
      <div className="card">
        <FaUsers className="card-icon" />
        <p className="card-value restored-value">100</p>
        <h3  style={{ color: 'white' }}>Restored Accounts</h3>
        
      </div>
    </div>
  );
};

export default StatsCards;
