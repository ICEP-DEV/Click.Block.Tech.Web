import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import logo from '../assets/Logo.png'; // Adjust the path if needed
import './PinEntry_styles.css'; // Create a separate CSS file for styles
import { BASE_URL } from '../API/API';
import axios from "axios";
import bcrypt from "bcryptjs-react";
import Lottie from "lottie-react";
import animationData from '../assets/lottie/loading.json'

const PinEntry = () => {
  const [pin, setPin] = useState(new Array(5).fill("")); // State for storing PIN digits
  const [encryptStoredPIN, setEncryptstoredPIN] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [accountId, setAccountId] = useState('');
  const [widrawalAmnt, setWithdrawalAmnt] = useState('');
  const [transactionID, setTransactionID] = useState('');
  const [isLoadingTransaction, setIsLoadingTransaction] = useState(false);
  const [isTransactionWaiting, setIsTransactionWaiting]  = useState(false);
  const [seconds, setSeconds] = useState(60); //timer for transaction
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const intervalRef = useRef(null);
  const [isTransactionApproved, setIsTransactionApproved] = useState(false);
  const [isTransactionDeclined, setIsTransactionDeclined] = useState(false);
  const [isTransactionPanicTriggered, setIsTransactionPanicTriggered] = useState(false);
 


  useEffect(()=>{
    const fetchingCustomer = async() =>{
      const accID = localStorage.getItem("accountID");
      const withdrawAmnt = localStorage.getItem("withdrawalAmount");
      setWithdrawalAmnt(withdrawAmnt);
      setAccountId(accID);
      console.log(`AccID: ${accID}`)
    try{
      const response = await axios.get(`${BASE_URL}getCustByAccID/${accID}`);
    const customerData = response.data;
    if(customerData){
      const storedPIN = customerData._LoginPin;
      setEncryptstoredPIN(storedPIN);
    }
    }catch(err){
      console.log(err);
    }
  
    };
    fetchingCustomer();

  },[encryptStoredPIN, accountId, widrawalAmnt,isAuthenticated, ]);

  useEffect(()=>{

  },[isLoadingTransaction, transactionID])

  //updating transaction status
  async function updateTransactionStatus(status){
    console.log('running')
    const updateData = {
      "status": `${status}`,
      "transactionID": `${transactionID}`
    }
    try{
     await axios.put(`${BASE_URL}updateTransaction`,updateData);
  
    }catch(err){
      console.log(err);
    }
  }
  //updating notification status
  async function updateNotificationStatus(status){
    console.log('running')
    const updateData = {
      "status": `${status}`,
      "transactionID": `${transactionID}`
    }
    try{
     await axios.put(`${BASE_URL}updateNotificationStatus`,updateData);
    
    }catch(err){
      console.log(err);
    }
  }
  
  async function checkTransaction(){
    try{
      const response = await axios.get(`${BASE_URL}getTransactionByID/${transactionID}`);
      const transactions = response.data;
      console.log(transactions)
      console.log(transactions.IsPanicTrigered)
      console.log(transactions.Status)
      if(transactions.Status === 'approved'){
        console.log('is approved');
        setIsTransactionApproved(true);
      }else if(transactions.IsPanicTrigered === 1){
        setIsTransactionPanicTriggered(true);
        console.log('is alert trigger');
      }else if(transactions.Status === 'declined'){
        console.log('declinde');
        setIsTransactionDeclined(true)
      }else{
        setIsTransactionApproved(false);
        setIsTransactionPanicTriggered(false);
        setIsTransactionDeclined(false);
      }

    }catch(err)
    {
      console.log(err)
    }
  }
  //This useEffect attempt to update the transaction to declined if its not approved
    useEffect(() => {
    if (isTransactionWaiting) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
          checkTransaction(accountId);
          if(isTransactionApproved){
            clearInterval(intervalRef.current);
            setIsTransactionWaiting(false)
            navigate('/')
          }
          if(isTransactionPanicTriggered){
            clearInterval(intervalRef.current);
            setIsTransactionWaiting(false)
            navigate('/insufficientFunds');
          }
          if(isTransactionDeclined){
            clearInterval(intervalRef.current);
            setIsTransactionWaiting(false)
            navigate('/declinedScreen')
          }
         

        } else {
          clearInterval(intervalRef.current);
          // Handle the case when the timer reaches 0
          console.log('Declined');
          updateNotificationStatus(`declined`);
          updateTransactionStatus(`declined`);

          navigate('/declinedScreen');
          setIsTransactionWaiting(false); // Reset the flag
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isTransactionWaiting, seconds, isTransactionApproved, isTransactionDeclined, isTransactionPanicTriggered]);

  //This method if for checking if the requested withdrawal amount is not greater than bank balance
  const creatingTransaction = async (bankBalance)=>{
    setIsLoadingTransaction(true);
    if(bankBalance >= widrawalAmnt){
      try{
        const transactionData = {
          "transactionType": `Widthdrawal`,
          "transactionAmount": `${widrawalAmnt}`,
          "accountID": `${accountId}`
        }
        const response = await axios.post(`${BASE_URL}create_transaction/`,transactionData);
        const createdTransaction = response.data;
      console.log(`Created Transaction: ${JSON.stringify(createdTransaction.transactionID)}`);
      if(createdTransaction.transactionID > 0){
        setTransactionID(createdTransaction.transactionID);
        setIsTransactionWaiting(true);
      
      }else{
           setIsLoadingTransaction(false);
           navigate('/lockedAccount');
      }
      
      }catch(err){
        console.log(err);
      }
      
    }else{
      console.log("Insufficient funds");
     setIsLoadingTransaction(false);
     
     navigate('/insufficientFunds');
     

    }
  }
  //This method will create a transaction If the user is autheticated
  async function processTransaction(){
      //comparing balance with withdrawal account
      const response = await axios.get(`${BASE_URL}getBankAccount/${accountId}`);
      const accountData = response.data;
      console.log(accountData);
      creatingTransaction(accountData._Balance);
  }
  //This method attempt to authenticate the customer requesting withdrawal but comparing the entered PIN with the remote PIN
  const authenticateCustomer = async() =>{
    if(encryptStoredPIN && pin){
      let PIN = "";
      for(let i = 0; i< pin.length; i++){
        PIN += pin[i];
      }
      bcrypt.compare(PIN, encryptStoredPIN, (err, result) => {
        if (err) {
            // Handle error
            console.error('Error comparing PIN:', err);
            return;
        }
 
        if (result) {
        // PIN match, authentication successful
        console.log(`Remote PINS match ${result}`);
       setIsAuthenticated(true);
       processTransaction();
        } else {
        // PIN don't match, authentication failed
        console.log('Remote PINS dont match');
        setIsAuthenticated(false)
        }
    });
    }
    
  }
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
    localStorage.clear();
    navigate('/'); // Navigate back to the root, which is AtmSimulator
  };

  return (
    <div className="pin-entry-container">
      {/* Logo centered at the top */}
      <img src={logo} alt="Logo" className="pin-entry-logo" />

    {isLoadingTransaction ? <div className='loading-container'>
      <div className='loading-anim-container'><Lottie animationData={animationData} loop={true} /></div>
      <h4>Transaction in-progress waiting for approval...{`(${seconds})`}</h4>
    </div>:<div className='inner'>
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
        <button className="transparent-button" onClick={authenticateCustomer}>Confirm</button>
      </div>
      { isAuthenticated? '' : <p className="error_message">
      Please enter the correct PIN
      </p>}
    </div>}
    </div>
  );
};

export default PinEntry;
