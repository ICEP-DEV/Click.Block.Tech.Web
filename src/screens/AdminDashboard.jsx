import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './style.css';
import ProfileHeader from './ProfileHeader';
import StatsCards from './StatsCards';
import PanicButtonFeature from './PanicButtonFeature';
import AccountActionsLog from './AccountActionsLog';
import SupportMessages from './SupportMessages';
import SearchBar from './SearchBar';
import Footer from './Footer';
import IncomingPanicAlerts from './Incoming_PanicAlerts';
import ViewLiveLocationBtn from './components/view_liveLocation_btn';
import ResolvePanicAlert from './components/resolve_panic_alert';
import { BASE_URL } from '../API/API';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [supportMessages, setSupportMessages] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [panicAlertsDate, setAlertData] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState('Jan 2024');
  const [showModal, setShowModal] = useState(false);

  // Modal control functions
  const handleModalClose = () => {
    setShowModal(false);
    window.location.reload(); // Refresh the page after modal is closed
  };

  // Fetch account actions log
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
        setTableData(formattedData);
      } catch (error) {
        console.error('Error fetching account actions log:', error);
      }
    };
    fetchAccountActionsLog();
  }, []);

  // Fetch support messages
  useEffect(() => {
    const fetchSupportMessages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/messages`);
        const data = await response.json();
        const formattedMessages = data.map((msg) => ({
          initials: msg.FullNames
            .split(' ')
            .map((name) => name[0])
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

  // Fetch panic alerts and handle resolve action
  useEffect(() => {
    const fetchAllAlerts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getAllActivatedPanic`);
        const customerData = response.data;
        setAlertData(
          customerData.result.map((alert) => ({
            customerID: alert._CustID_Nr,
            alertType: alert._AlertType,
            dateTime: alert._SentDate,
            view: (
              <ViewLiveLocationBtn
                locationID={alert._LocationID}
                route={'/live-location'}
              />
            ),
            resolve: (
              <ResolvePanicAlert
                customerID={alert._CustID_Nr}
                onResolved={(resolvedID) => {
                
                  setAlertData((prev) =>
                    prev.filter((alert) => alert.customerID !== resolvedID)
                  );
                
                  setShowModal(true);
                }}
              />
            ),
          }))
        );
      } catch (err) {
        console.error('Error fetching alerts:', err);
      }
    };
    fetchAllAlerts();
  }, []);

  // Handle search input
  const handleSearch = (searchTerm) => {
    if (searchTerm.toLowerCase() === 'all') {
      navigate('/customer-accounts');
    } else if (searchTerm.toLowerCase() === 'deactivated') {
      navigate('/deactivated-accounts');
    } else if (searchTerm.toLowerCase() === 'restored') {
      navigate('/restored-accounts');
    } else if (searchTerm.toLowerCase() === 'frozen') {
      navigate('/frozen-accounts');
    } else if (searchTerm.toLowerCase() === 'active') {
      navigate('/active-accounts');
    }
  };

  return (
    <div className="dashboard-container">
      <ProfileHeader />
      <SearchBar onSearch={handleSearch} />
      <div className="spacer"></div>
      <h1 className="dashboard-heading">CUSTOMER ACCOUNTS MANAGEMENT</h1>
      <StatsCards />
      <h1 className="dashboard-heading">PANIC ALERTS USAGE</h1>
      <PanicButtonFeature
        monthlyPieData={{ 'Jan 2024': [65, 25, 10] }}
        selectedMonthYear={selectedMonthYear}
        setSelectedMonthYear={setSelectedMonthYear}
      />
      <h1 className="dashboard-heading">Incoming Panic Alerts</h1>
      <IncomingPanicAlerts tableData={panicAlertsDate} />
      <h1 className="dashboard-heading">Account Actions Log</h1>
      <AccountActionsLog tableData={tableData} />
      <h2 className="dashboard-heading">Support Messages</h2>
      <SupportMessages supportMessages={supportMessages} />

      <Modal show={showModal} onHide={handleModalClose} centered className="custom-modal">
  <Modal.Header closeButton>
    <Modal.Title>Alert Resolved!</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    The panic alert was successfully resolved. Click "OK" to refresh the page.
  </Modal.Body>
  <Modal.Footer>
    <Button variant="primary" onClick={handleModalClose}>
      OK
    </Button>
  </Modal.Footer>
</Modal>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
