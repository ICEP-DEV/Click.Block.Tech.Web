import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Card } from "react-bootstrap";
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
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(null);

  const handleAccountModalClose = () => {
    setShowAccountModal(false);
  };
  
  const handleAccountModalOpen = (accountNumber) => {
    setSelectedAccountNumber(accountNumber);
    setShowAccountModal(true);
  };
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
          customerID: msg.CustID_Nr,
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
      <h1 className="dashboard-heading">Recent Performed Actions</h1>
      <AccountActionsLog tableData={tableData} onAccountClick={handleAccountModalOpen} />
      <h2 className="dashboard-heading">Support Messages</h2>
      <SupportMessages supportMessages={supportMessages} />

      <Modal show={showAccountModal} onHide={handleAccountModalClose} centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="modal-header-buttons">
            <Button variant="outline-primary" className="me-2">Overview</Button>
            <Button variant="outline-secondary">Recents</Button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-content-container">
          {/* Left Side: Mini Map */}
          <div className="map-container">
            <div className="mini-map">[Mini Map Here]</div>
          </div>

          {/* Right Side: User Details and Chart */}
          <div className="user-details-container">
            <h4 style={{ fontWeight: "bold" }}>John Doe</h4> {/* Replace with dynamic data */}
            <p>
              <strong>Full Name:</strong> Johnathan Doe<br />
              <strong>Email:</strong> john.doe@example.com<br />
              <strong>Phone:</strong> +1 234 567 890<br />
              <strong>Address:</strong> 123 Main Street, Springfield<br />
            </p>

            {/* Mini Line Chart and Alert Count */}
            <div className="chart-alert-container d-flex align-items-center">
              <div className="mini-chart me-3">
                <p style={{ fontWeight: "bold" }}>Panic Button Usage</p>
                <div>[Line Chart Here]</div>
              </div>
              <Card className="alert-card text-white bg-primary">
                <Card.Body>
                  <Card.Title>Total Panic Alerts</Card.Title>
                  <h3>5</h3> {/* Replace with dynamic data */}
                </Card.Body>
              </Card>
            </div>

            {/* Recent Activations */}
            <div className="recent-activations mt-3">
              <h5 style={{ fontWeight: "bold" }}>Recent Activations</h5>
              <div className="activation-entry">
                <p>
                  <strong>Alert Triggered:</strong> 2025-01-28 14:30<br />
                  <strong>Frozen:</strong> No<br />
                  <strong>Activity Location:</strong> Downtown, Springfield<br />
                  <strong>Alert to SAPS:</strong> Yes
                </p>
              </div>
              <div className="activation-entry">
                <p>
                  <strong>Alert Triggered:</strong> 2025-01-27 10:15<br />
                  <strong>Frozen:</strong> Yes<br />
                  <strong>Activity Location:</strong> Westside Mall<br />
                  <strong>Alert to SAPS:</strong> No
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleAccountModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

      <Footer />
    </div>
  );
};

export default AdminDashboard;