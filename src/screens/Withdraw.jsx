import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import './Withdraw_styles.css';

const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0.00'); // Start with default amount

  const handleInputChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, ''); // Allow only digits

    // Convert the input to a number
    const numericValue = parseInt(value, 10) || 0;

    // Format the number to always show two decimal places
    const formattedValue = (numericValue / 100).toFixed(2);

    // Update state with formatted value
    setAmount(formattedValue);
  };

  const handleBlur = () => {
    // Ensure it has two decimal places on blur
    const parts = amount.split('.');
    
    if (parts.length === 1) {
      setAmount(parts[0] + '.00');
    } else if (parts[1].length === 0) {
      setAmount(parts[0] + '.00');
    } else if (parts[1].length === 1) {
      setAmount(parts[0] + '.' + parts[1] + '0');
    } else if (parts[1].length > 2) {
      setAmount(parts[0] + '.' + parts[1].slice(0, 2));
    }
  };

  const handleConfirm = () => {
    console.log("Amount entered:", amount); // Log the entered amount
    navigate('/pin-entry'); // Navigate to the PIN entry page
  };

  return (
    <div className="withdraw-container">
      <img src={logo} alt="Logo" className="withdraw-logo" />

      <h1 className="withdraw-heading">Withdraw Funds</h1>
      <p className="withdraw-instruction">Enter the amount you wish to withdraw below:</p>

      <input
        type="text"
        placeholder="R0.00"
        value={amount} // Bind input value to state
        onChange={handleInputChange} // Update state on change
        onBlur={handleBlur} // Format when input loses focus
        className="withdraw-input"
      />

      <p className="withdraw-warning">
        Note: Please ensure your requested amount is within your account balance.
      </p>

      <div className="withdraw-buttons">
        <button className="transparent-button" onClick={() => navigate('/')}>Main Menu</button>
        <button className="transparent-button" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
