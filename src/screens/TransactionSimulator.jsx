import React, { useState } from 'react';
import _ from 'lodash';
import './TS_styles.css'; // Ensure this CSS file exists or create it
import logo from '../assets/Logo.png'; // Adjust the path if needed

const formatCurrency = (value) => {
  if (!value) return '';
  const options = { style: 'currency', currency: 'ZAR' };
  return new Intl.NumberFormat('en-ZA', options).format(value);
};

const parseCurrency = (value) => {
  const cleanValue = value.replace(/[^0-9.-]+/g, '');
  return parseFloat(cleanValue) || 0;
};

// TransactionForm component
const TransactionForm = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [pin, setPin] = useState('');
  const [transactionType, setTransactionType] = useState('cash transfer');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const parsedAmount = parseCurrency(amount);
    if (!cardNumber || !pin || parsedAmount <= 0 || cardNumber.length !== 12 || pin.length !== 5) {
      alert('Please enter valid transaction details (Card: 12 digits, PIN: 5 digits, Amount: > R0.00).');
      return;
    }

    onSubmit({ cardNumber, pin, transactionType, amount: parsedAmount });

    // Reset form fields
    setCardNumber('');
    setPin('');
    setTransactionType('cash transfer');
    setAmount('');
  };

  const handleAmountChange = (event) => {
    const value = event.target.value.replace(/[^0-9]/g, ''); // Allow only digits
    const numericValue = parseInt(value, 10) || 0; // Convert to number
    const formattedValue = (numericValue / 100).toFixed(2); // Format as currency
    setAmount(formattedValue);
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div>
        <label>Input Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(event) => setCardNumber(event.target.value)}
          maxLength="12"
        />
      </div>
      <br />
      <div>
        <label>Input PIN:</label>
        <input
          type="password"
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          maxLength="5"
        />
      </div>
      <br />
      <div>
        <label>Transaction Type:</label>
        <select
          value={transactionType}
          onChange={(event) => setTransactionType(event.target.value)}
        >
          <option value="cash transfer">Cash Transfer</option>
          <option value="eft">EFT</option>
          <option value="payment order">Payment Order</option>
          <option value="online purchase">Online Purchase</option>
          <option value="cash payment">Cash Payment</option>
        </select>
      </div>
      <br />
      <div>
        <label>Amount:</label>
        <input
          type="text" // Change type to text for better formatting control
          value={formatCurrency(amount)} // Format as currency for display
          onChange={handleAmountChange} // Use custom change handler
          placeholder="R0.00"
        />
      </div>
      <br />
      <button type="submit">Simulate Transaction</button>
    </form>
  );
};

// TransactionList component
const TransactionList = ({ transactions }) => {
  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p>Transaction ID: {transaction.id}</p>
          <p>Card Number: {transaction.cardNumber}</p>
          <p>Transaction Type: {transaction.transactionType}</p>
          <p>Amount: {transaction.amount}</p>
          <p>Status: {transaction.status}</p>
          <p>Timestamp: {transaction.timestamp}</p>
        </li>
      ))}
    </ul>
  );
};

// TransactionSimulator component
const TransactionSimulator = () => {
  const [transactions, setTransactions] = useState([]);

  const simulateTransaction = (data) => {
    const newTransaction = {
      id: _.uniqueId(),
      cardNumber: data.cardNumber,
      transactionType: data.transactionType,
      amount: data.amount,
      status: 'completed',
      timestamp: new Date().toISOString(),
    };

    // Add transaction to list
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
  };

  return (
    <div className="fullscreen-container">
      <img src={logo} alt="Logo" className="logo" />
      <TransactionForm onSubmit={simulateTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
};

export default TransactionSimulator; // Export the TransactionSimulator component
