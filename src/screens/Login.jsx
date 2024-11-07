import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import logo from '../assets/Logo.png';  // Import the logo
import { useNavigate } from 'react-router-dom'; // to navigate after successful login

const Login = () => {
  const [email, setEmail] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // for navigation (replacing useHistory)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state

    // Send login credentials to the backend API
    try {
      const response = await axios.post('http://localhost:5000/admin/login', {
        Email: email,
        LoginPin: loginPin,
      });

      // If login is successful, navigate to the admin dashboard
      if (response.data) {
        // Assuming response contains some kind of success message or admin info
        // Redirect to the admin dashboard (adjust this route accordingly)
        navigate('/screens/AdminDashboard.jsx'); // Use useNavigate hook for navigation in React Router v6
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Invalid credentials or server error'); // Handle errors
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
