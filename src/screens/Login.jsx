import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Updated to match the new CSS styling
import logo from '../assets/Logo.png'; // Import the logo
import { useNavigate } from 'react-router-dom'; // to navigate after successful login
import { BASE_URL } from '../API/API'; // Correct path to import API.js

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // for navigation (replacing useHistory)

  const handleLogin = async (e) => {
    
    e.preventDefault();
    setError(''); // Reset error state

    try {
     
      const response = await axios.post(`${BASE_URL}admin/login`, {
        Email: email,
        LoginPin: loginPin,
      });
      const adminData = response.data;
      // If login is successful, store details in localStorage and navigate
      if (adminData) {
        const token = adminData.token;
        const adminDetails = adminData.admin;
        console.log(JSON.stringify(adminDetails));
        localStorage.setItem('adminToken', token); // Store admin token
        localStorage.setItem('adminDetails', JSON.stringify(adminDetails)); 
        navigate('/dashboard'); // Navigate to admin dashboard
      }
    } catch (err) {
      console.error('Error details:', err.response); // Log the entire error response
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-box">
          <img src={logo} alt="Nexis Logo" className="admin-logo" />
          <h2 className="admin-welcome-text">WELCOME</h2>
          <p className="admin-login-prompt">Please login to admin dashboard</p>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="admin-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="admin-input-field"
              value={loginPin}
              onChange={(e) => setLoginPin(e.target.value)}
            />
            <button type="submit" className="admin-login-button">Login</button>
            <p className="admin-forgot-password">
              <button
                onClick={() => alert('Forgot password functionality will be added here.')}
                className="admin-forgot-password-button"
              >
                Forgot Password
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
