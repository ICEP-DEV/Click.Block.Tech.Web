import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logo from '../assets/Logo.png';  // Import the logo
import { useNavigate } from 'react-router-dom'; // to navigate after successful login
import { BASE_URL } from '../API/API';  // Correct path to import API.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // for navigation (replacing useHistory)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    try {
      const response = await axios.post(`${BASE_URL}admin/login`, {
        Email: email,
        LoginPin: loginPin,
      });

      // If login is successful, navigate to the admin dashboard
      if (response.data) {
        navigate('/'); // Navigate to admin dashboard
      }
    } catch (err) {
      console.error('Error details:', err.response);  // Log the entire error response
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Nexis Logo" className="logo" />
        <h2 className="welcome-text">WELCOME</h2>
        <p className="login-prompt">Please login to admin dashboard</p>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={loginPin}
            onChange={(e) => setLoginPin(e.target.value)}
          />
          <button type="submit" className="login-button">Login</button>
          <p className="forgot-password">
            <button onClick={() => alert("Forgot password functionality will be added here.")} className="forgot-password-button">
              Forgot Password
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;





