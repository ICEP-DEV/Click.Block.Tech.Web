import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Wallet_styles.css';

const Wallet = () => {
  const navigate = useNavigate();

  const accounts = [
    { name: 'Savings Account', balance: 2500.75 },
    { name: 'Checking Account', balance: 1300.20 },
    { name: 'Business Account', balance: 7850.50 },
  ];

  return (
    <div className="wallet-full-bg">
      <h1 className="wallet-title">Your Account Balances</h1>
      <ul className="wallet-list">
        {accounts.map((account, index) => (
          <li key={index} className="wallet-item">
            <span className="account-name">{account.name}</span>
            <span className="account-balance">R{account.balance.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* Transparent Back Button */}
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default Wallet;
