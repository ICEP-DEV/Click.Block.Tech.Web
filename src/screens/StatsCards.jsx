import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing axios
import { FaUsers } from 'react-icons/fa'; // Importing an icon library for user icons
import './statscard.css';
import { BASE_URL } from '../API/API';
const StatsCards = () => {
  // State to hold the fetched data
  const [stats, setStats] = useState({
    totalAccounts: 0,
    activeAccounts: 0,
    frozenAccounts: 0,
    deactivatedAccounts: 0,
    restoredAccounts: 0,
  });



  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the API
        const response = await axios.get(`${BASE_URL}customers/statistics`);

        // Log the response to check the data returned
        console.log('API Response:', response.data);

        const data = response.data;

        // Log data before setting the state
        console.log('Data to be set in state:', {
          totalAccounts: data.TotalAccounts || 0,
          activeAccounts: data.ActiveAccounts || 0,
          frozenAccounts: data.FrozenAccounts || 0,
          deactivatedAccounts: data.DeactivatedAccounts || 0,
          restoredAccounts: data.RestoredAccounts || 0,
        });

        // Set the fetched data into state
        setStats({
          totalAccounts: data.TotalAccounts || 0,
          activeAccounts: data.ActiveAccounts || 0,
          frozenAccounts: data.FrozenAccounts || 0,
          deactivatedAccounts: data.DeactivatedAccounts || 0,
          restoredAccounts: data.RestoredAccounts || 0, // Default to 0 if null
        });

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        // Log the error if the API request fails
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once after the initial render

  // If data is still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cards-container">
      <div className="card">
        <FaUsers className="card-icon" />
        <p className="card-value">{stats.totalAccounts}</p>
        <h3 style={{ color: 'white' }}>Customer Accounts</h3>
      </div>
      <div className="card">
        <FaUsers className="card-icon" />
        <p className="card-value active-value">{stats.activeAccounts}</p>
        <h3 style={{ color: 'white' }}>Active Accounts</h3>
      </div>
      <div className="card">
        <FaUsers className="card-icon" />
        <p className="card-value frozen-value">{stats.frozenAccounts}</p>
        <h3 style={{ color: 'white' }}>Frozen Accounts</h3>
      </div>
      <div className="card">
        <FaUsers className="card-icon" />
        <p className="card-value deactivated-value">{stats.deactivatedAccounts}</p>
        <h3 style={{ color: 'white' }}>Deactivated Accounts</h3>
      </div>
      <div className="card">
        <FaUsers className="card-icon" />
        <p className="card-value restored-value">{stats.restoredAccounts}</p>
        <h3 style={{ color: 'white' }}>Restored Accounts</h3>
      </div>
    </div>
  );
};

export default StatsCards;
