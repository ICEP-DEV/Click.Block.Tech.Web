import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import './style.css';
import ProfileHeader from './ProfileHeader';
import StatsCards from './StatsCards';
import PanicButtonFeature from './PanicButtonFeature';
import AccountActionsLog from './AccountActionsLog';
import SupportMessages from './SupportMessages';
import SearchBar from './SearchBar';
import Footer from './Footer';  // Import the Footer component

const AdminDashboard = () => {
  const navigate = useNavigate(); // Use the navigate hook for routing
  const [supportMessages, setSupportMessages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const monthlyPieData = {
    'Jan 2024': [65, 25, 10],
    // Add other months here
  };

  const [selectedMonthYear, setSelectedMonthYear] = useState('Jan 2024');

   // Fetch account actions log from the endpoint
   useEffect(() => {
    const fetchAccountActionsLog = async () => {
      try {
        const response = await fetch('http://192.168.23.248:5000/api/account-actions');
        const data = await response.json();
        const formattedData = data.map((action) => ({
          accountNumber: action.CustomerAccountNumber,
          actionType: action['Action Type'],
          dateTime: new Date(action['Date/Time']).toLocaleString(),
          status: action['Account Status'],
          performedBy: action.PerformedBy,
        }));
        setTableData(formattedData); // Update the table data state
      } catch (error) {
        console.error('Error fetching account actions log:', error);
      }
    };

    fetchAccountActionsLog();
  }, []);

  // Fetch support messages from the endpoint
  useEffect(() => {
    const fetchSupportMessages = async () => {
      try {
        const response = await fetch('http://192.168.23.248:5000/api/messages');
        const data = await response.json();
        const formattedMessages = data.map(msg => ({
          initials: msg.FullNames
            .split(' ')
            .map(name => name[0])
            .join('.'),
          surname: msg.FullNames.split(' ').slice(-1)[0],
          fullName: msg.FullNames,
          phoneNumber: msg.PhoneNumber,
          email: msg.Email,
          message: msg.MessageDescription,
          status: msg.Status,
        }));
        setSupportMessages(formattedMessages);
      } catch (error) {
        console.error('Error fetching support messages:', error);
      }
    };

    fetchSupportMessages();
  }, []);

  // This function is passed to the SearchBar to handle search input
  const handleSearch = (searchTerm) => {
    if (searchTerm === 'frozen') {
      navigate('/frozen-accounts'); // Navigate to Frozen Accounts component
    }
    // Add other navigation logic here for other search terms if needed
  };

  return (
    <div className="dashboard-container">
      <ProfileHeader />
      <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch as a prop */}
      <div className="spacer"></div> {/* Spacer for space between header and the rest */}
      <h1 className="dashboard-heading">CUSTOMER ACCOUNTS MANAGEMENT</h1>
      <StatsCards/>
      <h1 className="dashboard-heading">PANIC BUTTON FEATURE USAGE</h1>
      <PanicButtonFeature
        monthlyPieData={monthlyPieData}
        selectedMonthYear={selectedMonthYear}
        setSelectedMonthYear={setSelectedMonthYear}
      />
      <h1 className="dashboard-heading">Account Actions Log</h1>
      <AccountActionsLog tableData={tableData} />
      <h2 className="dashboard-heading">Support Messages</h2>
      <SupportMessages supportMessages={supportMessages} />
      <Footer /> {/* Add the Footer component at the bottom */}
    </div>
  );
};

export default AdminDashboard;
