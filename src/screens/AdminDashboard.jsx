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
  const [panicAlertsDate, setAlertData] = useState([]);
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

  
  const tableData = [
    { accountNumber: '123456', actionType: 'Frozen Account', dateTime: '2024-01-15 14:30', status: 'Frozen', performedBy: 'Admin John' },
    { accountNumber: '123456', actionType: 'Active Account', dateTime: '2024-01-15 14:30', status: 'Frozen', performedBy: 'Admin John' },
    { accountNumber: '123456', actionType: 'Frozen Account', dateTime: '2024-01-15 14:30', status: 'Frozen', performedBy: 'Admin John' },
    { accountNumber: '123456', actionType: 'Deactivated Accound', dateTime: '2024-01-15 14:30', status: 'Frozen', performedBy: 'Admin John' },
    
    // Add more table data here
  ];

  const supportMessages = [
    { initials: 'J.D.', surname: 'Doe', email: 'jdoe@example.com', dateTime: '2024-01-20 08:30', message: 'Need help with account activation' },
    { initials: 'M.S.', surname: 'Smith', email: 'msmith@example.com', dateTime: '2024-01-20 09:15', message: 'Unable to login' },
    { initials: 'A.T.', surname: 'Taylor', email: 'ataylor@example.com', dateTime: '2024-01-20 10:00', message: 'Request for password reset' },
    { initials: 'R.B.', surname: 'Brown', email: 'rbrown@example.com', dateTime: '2024-01-20 10:45', message: 'Issue with account freezing' },
    { initials: 'S.L.', surname: 'Lee', email: 'slee@example.com', dateTime: '2024-01-20 11:30', message: 'Account deactivation request' },
    { initials: 'L.P.', surname: 'Perez', email: 'lperez@example.com', dateTime: '2024-01-20 12:00', message: 'Inquiry about account status' }
  ];

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
