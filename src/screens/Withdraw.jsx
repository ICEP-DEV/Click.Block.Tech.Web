import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import './Withdraw_styles.css';
import axios from "axios";
import { BASE_URL } from '../API/API';
const Withdraw = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('0.00'); // Start with default amount
  const [cardNumber, setCardNumber] = useState('');
  const [isMessageShown, setIsMessageShown] = useState(false);

  
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


  useEffect(()=>{
  },[isMessageShown, cardNumber]);

  const handleConfirm = async() => {
    console.log(cardNumber)
    if(cardNumber && amount >= 10.00){
    const response = await axios.get(`${BASE_URL}verifyCardNumber/${cardNumber}`);
    const bankCardData = response.data;
    console.log( `data:${bankCardData}`)
    if(bankCardData){
      console.log(bankCardData)
      localStorage.setItem("accountID", bankCardData._AccountID);
      //setting amount the user is requesting to withdraw
      localStorage.setItem("withdrawalAmount", amount);
      navigate('/pin-entry');
    }else{
      console.log('No data')
    }
  
    }
    else{
      setIsMessageShown(true);
      console.log(isMessageShown);
    }
    
   
  };

  return (
    <div className="withdraw-container">
      <img src={logo} alt="Logo" className="withdraw-logo" />

      <h1 className="withdraw-heading">Withdraw Funds</h1>
      <p className="withdraw-instruction">Enter your card number:</p>
      <input
        type="text"
        placeholder="Enter card Number"
        onChange={(e) => setCardNumber(e.target.value)} // Update state on change
        className="withdraw-input"
      />
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
      { isMessageShown? <p className="error_message">
      Error: Please provide your card number and amount to withdraw!
      </p> : ''}
    </div>
  );
};

export default Withdraw;
