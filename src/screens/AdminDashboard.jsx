import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook for navigation
import './style.css';
import ProfileHeader from './ProfileHeader';
import StatsCards from './StatsCards';
import PanicButtonFeature from './PanicButtonFeature';
import AccountActionsLog from './AccountActionsLog';
import SupportMessages from './SupportMessages';
import SearchBar from './SearchBar';
import Footer from './Footer';  // Import the Footer component
import IncomingPanicAlerts from './Incoming_PanicAlerts';
import ViewLiveLocationBtn from './components/view_liveLocation_btn';
import ResolvePanicAlert from './components/resolve_panic_alert';
import { BASE_URL } from '../API/API';
import axios from 'axios';


const AdminDashboard = () => {

  const navigate = useNavigate(); // Use the navigate hook for routing
  const [supportMessages, setSupportMessages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [panicAlertsDate, setAlertData] = useState([]);

     // Fetch account actions log from the endpoint
     useEffect(() => {
      const fetchAccountActionsLog = async () => {
        try {
          const response = await fetch(`${BASE_URL}/account-actions`);
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
        const response = await fetch(`${BASE_URL}/messages`);
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

  //gettingAlerts
  useEffect(() => {
    const fetchAllAlerts = async () => {
      try{
      const response = await axios.get(`${BASE_URL}/getAll_Alert`);
      const customerData = response.data;
      setAlertData(customerData.result.map(alert => ({
      
        customerID: alert._CustID_Nr,
        alertType: alert._AlertType,
        dateTime: alert._SentDate,
        view: <ViewLiveLocationBtn locationID={alert._LocationID} route={'/live-location'}/>,
        resolve: <ResolvePanicAlert/>
    })));
      }catch(err){
        console.log(err);
      }
    };
    fetchAllAlerts();
  }, []);
  
  const monthlyPieData = {
    'Jan 2024': [65, 25, 10],
    // Add other months here
  };

  const [selectedMonthYear, setSelectedMonthYear] = useState('Jan 2024');

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
      <h1 className="dashboard-heading">PANIC ALERTS USAGE</h1>
      <PanicButtonFeature
        monthlyPieData={monthlyPieData}
        selectedMonthYear={selectedMonthYear}
        setSelectedMonthYear={setSelectedMonthYear}
      />
      <h1 className="dashboard-heading">Incoming Panic Alerts</h1>
      <IncomingPanicAlerts tableData={panicAlertsDate}/>
      <h1 className="dashboard-heading">Account Actions Log</h1>
      <AccountActionsLog tableData={tableData} />
      <h2 className="dashboard-heading">Support Messages</h2>
      <SupportMessages supportMessages={supportMessages} />
      <Footer /> {/* Add the Footer component at the bottom */}
    </div>
  );
};

export default AdminDashboard;
