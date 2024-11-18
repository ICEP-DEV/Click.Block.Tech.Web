import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './ATM_styles.css'; // Import the CSS file
import logo from '../assets/Logo.png'; // Adjust the path if needed
import qrcode from '../assets/QRcode.png'; // Adjust the path if needed
import insertCard from '../assets/InsertCard.png'; // Adjust the path if needed

const AtmSimulator = () => {
  return (
    <div className="atm-container">
      {/* Logo at the top middle */}
      <img src={logo} alt="Logo" className="atm-logo" />

      {/* Welcome text */}
      <h1 className="atm-welcome-text">Welcome to our ATM Simulator</h1>

      {/* Instruction text */}
      <p className="atm-instruction-text">Choose your preferred method to get started:</p>

      {/* QR Code and Insert Card section */}
      <div className="atm-options">
        {/* QR Code Option (internal link using Link component) */}
        <div className="atm-option">
          <Link to="/qr-code">
            <img src={qrcode} alt="QR Code" className="atm-option-image qr-code" />
          </Link>
          <p>QR CODE</p>
        </div>

        {/* Insert Card Option (internal link using Link component) */}
        <div className="atm-option">
          <Link to="/insert-card">
            <img src={insertCard} alt="Insert Card" className="atm-option-image card-image" />
          </Link>
          <p>INSERT CARD</p>
        </div>
      </div>
    </div>
  );
};

export default AtmSimulator;
