import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import logo from '../assets/Logo.png'; // Adjust the path if needed
import './PinEntry_styles.css'; // Create a separate CSS file for styles

const PinEntry = () => {
  const [pin, setPin] = useState(new Array(5).fill("")); // State for storing PIN digits
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Handle changes in the input boxes
  const handleChange = (value, index) => {
    if (isNaN(value)) return; // Allow only numeric input

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Move focus to the next input field automatically if a digit is entered
    if (value && index < 4) {
      document.getElementById(`pin-input-${index + 1}`).focus();
    }
  };

  // Handle cancel button click to navigate back to the ATM Simulator
  const handleCancel = () => {
    navigate('/'); // Navigate back to the root, which is AtmSimulator
  };

  return (
    <div className="pin-entry-container">
      {/* Logo centered at the top */}
      <img src={logo} alt="Logo" className="pin-entry-logo" />

      {/* Heading and Subheading */}
      <h1 className="pin-entry-heading">Enter PIN</h1>
      <p className="pin-entry-subheading">Secure Your Transaction</p>

      {/* Instruction text */}
      <p className="pin-entry-instruction">
        Please enter your <b>card PIN</b> to continue with your withdrawal:
      </p>

      {/* PIN input boxes */}
      <div className="pin-input-container">
        {pin.map((digit, index) => (
          <input
            key={index}
            id={`pin-input-${index}`}
            type="password" // Changed type to 'password' to mask input
            maxLength="1"
            className="pin-input-box"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
          />
        ))}
      </div>

      {/* Warning Text */}
      <p className="pin-entry-warning">
        Note: For your security, ensure no one is watching as you enter your PIN.
      </p>

      {/* Buttons */}
      <div className="pin-entry-buttons">
        <button className="transparent-button" onClick={handleCancel}>Cancel</button> {/* Cancel button with navigation */}
        <button className="transparent-button">Confirm</button>
      </div>
    </div>
  );
};

export default PinEntry;
