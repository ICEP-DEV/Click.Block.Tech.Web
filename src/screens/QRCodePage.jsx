import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import logo from '../assets/Logo.png'; // Adjust the path if needed
import withdraw from '../assets/withdraw.png'; // Adjust the path if needed
import deposit from '../assets/deposit.png'; // Adjust the path if needed
import transfer from '../assets/transfer.png'; // Adjust the path if needed
import wallet from '../assets/wallet.png'; // Adjust the path if needed
import './QRCodePage_styles.css'; // Create a separate CSS file for styles

const QRCodePage = () => {
  return (
    <div className="qr-code-container">
      {/* Logo at the top center */}
      <img src={logo} alt="Logo" className="qr-code-logo" />

      {/* Background wrapper for heading and subheading */}
      <div className="qr-code-heading-container">
        {/* Heading */}
        <h1 className="qr-code-heading">Hello Again, Jonathan Moatshe!</h1>

        {/* Subheading */}
        <p className="qr-code-subheading">
          Experience the convenience of banking at your fingertips!
        </p>
      </div>

      {/* Instruction text */}
      <p className="qr-code-instruction">Choose the type of transaction you want to make:</p>

      {/* Transaction Options */}
      <div className="qr-code-options">
        {/* Withdraw Option wrapped in Link */}
        <div className="qr-code-option">
          <Link to="/withdraw"> {/* Link to Withdraw page */}
            <img src={withdraw} alt="Withdraw" className="qr-code-option-image" />
          </Link>
          <p>Withdraw</p>
        </div>
        
        {/* Deposit Option */}
        <div className="qr-code-option">
          <img src={deposit} alt="Deposit" className="qr-code-option-image" />
          <p>Deposit</p>
        </div>
        
        {/* Transfer Option */}
        <div className="qr-code-option">
          <img src={transfer} alt="Transfer" className="qr-code-option-image" />
          <p>Transfer</p>
        </div>
        
        <div className="qr-code-option">
          <Link to="/wallet">
            <img src={wallet} alt="View Balance" className="qr-code-option-image" />
          </Link>
          <p>View Balance</p>
        </div>
        
      </div>
    </div>
  );
};

export default QRCodePage;
