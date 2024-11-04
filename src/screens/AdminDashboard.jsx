import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import './style.css';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import profileIcon from '../assets/user.png';
import appLogo from '../assets/Logo.png';

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Panic Button Usage',
        data: [5, 12, 8, 14, 18, 11, 9, 13, 17, 10, 7, 15],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }
    ]
  };

  const monthlyPieData = {
    'Jan 2024': [65, 25, 10],
    'Feb 2024': [60, 30, 10],
    'Mar 2024': [55, 35, 10],
    'Apr 2024': [70, 20, 10],
    'May 2024': [80, 15, 5],
    'Jun 2024': [60, 25, 15],
    'Jul 2024': [75, 20, 5],
    'Aug 2024': [68, 22, 10],
    'Sep 2024': [63, 27, 10],
    'Oct 2024': [72, 18, 10],
    'Nov 2024': [65, 25, 10],
    'Dec 2024': [60, 30, 10]
  };

  const [selectedMonthYear, setSelectedMonthYear] = useState('Jan 2024');

  const pieData = {
    labels: ['Resolved', 'Pending', 'False Alarms'],
    datasets: [
      {
        label: 'Panic Button Responses',
        data: monthlyPieData[selectedMonthYear],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverOffset: 4
      }
    ]
  };

  const tableData = [
    { accountNumber: '123456', actionType: 'Frozen Account', dateTime: '2024-01-15 14:30', status: 'Frozen', performedBy: 'Admin John' },
    { accountNumber: '234567', actionType: 'Activated Account', dateTime: '2024-01-16 09:20', status: 'Active', performedBy: 'Automation' },
    { accountNumber: '345678', actionType: 'Approved Account', dateTime: '2024-01-17 11:15', status: 'Pending', performedBy: 'Admin Lisa' },
    { accountNumber: '456789', actionType: 'Action Needed', dateTime: '2024-01-18 12:50', status: 'Pending', performedBy: 'Admin Alex' },
    { accountNumber: '567890', actionType: 'Activated Account', dateTime: '2024-01-19 10:00', status: 'Active', performedBy: 'Automation' }
  ];

  const supportMessages = [
    { initials: 'J.D.', surname: 'Doe', email: 'jdoe@example.com', dateTime: '2024-01-20 08:30', message: 'Need help with account activation' },
    { initials: 'M.S.', surname: 'Smith', email: 'msmith@example.com', dateTime: '2024-01-20 09:15', message: 'Unable to login' },
    { initials: 'A.T.', surname: 'Taylor', email: 'ataylor@example.com', dateTime: '2024-01-20 10:00', message: 'Request for password reset' },
    { initials: 'R.B.', surname: 'Brown', email: 'rbrown@example.com', dateTime: '2024-01-20 10:45', message: 'Issue with account freezing' },
    { initials: 'S.L.', surname: 'Lee', email: 'slee@example.com', dateTime: '2024-01-20 11:30', message: 'Account deactivation request' },
    { initials: 'L.P.', surname: 'Perez', email: 'lperez@example.com', dateTime: '2024-01-20 12:00', message: 'Inquiry about account status' }
  ];

  return (
    <div className="dashboard-container">
      <div className="top-header">
        <div className="profile-icon"><img src={profileIcon} alt="Profile Icon" /></div>
        <div className="app-logo"><img src={appLogo} alt="App Logo" /></div>
        <div className="notification-bell">🔔</div>
      </div>

      {/* Search Bar placed under the header */}
      <div className="search-bar">
        <input type="text" placeholder="Search customer accounts..." className="search-input" />
      </div>

      <h1 className="dashboard-heading">Customer Accounts Management</h1>

      <div className="cards-container">
        <div className="card">
          <h2 >Total Customer Accounts</h2>
          <p style={{ color: 'white' }}>1200</p>
        </div>
        <div className="card">
          <h2>Active Accounts</h2>
          <p style={{ color: '#4CAF50' }}>950</p>
        </div>
        <div className="card">
          <h2>Frozen Accounts</h2>
          <p style={{ color: 'grey' }}>50</p>
        </div>
        <div className="card">
          <h2>Deactivated Accounts</h2>
          <p style={{ color: 'red' }}>100</p>
        </div>
        <div className="card">
          <h2>Restored Accounts</h2>
          <p style={{ color: 'blue' }}>100</p>
        </div>
      </div>

      <div className="panic-feature-section">
        <h2 className="section-heading">Panic Button Feature Usage</h2>
        <div className="charts-container">
          <div className="line-chart"><Line data={lineData} options={{ responsive: true }} /></div>
          <div className="pie-chart">
            <Pie data={pieData} options={{ responsive: true }} />
            <div className="month-year-filter">
              <label htmlFor="month-year">Filter by Month and Year:</label>
              <select id="month-year" value={selectedMonthYear} onChange={(e) => setSelectedMonthYear(e.target.value)}>
                {Object.keys(monthlyPieData).map((monthYear) => (
                  <option key={monthYear} value={monthYear}>{monthYear}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="table-section">
        <h2 className="section-heading">Account Actions Log</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer Account Number</th>
              <th>Action Type</th>
              <th>Date/Time</th>
              <th>Account Status</th>
              <th>Performed By</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.accountNumber}</td>
                <td>{row.actionType}</td>
                <td>{row.dateTime}</td>
                <td>{row.status}</td>
                <td>{row.performedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Support Messages Section */}
      <div className="support-messages-section">
        <h2 className="section-heading">Support Messages</h2>
        <div className="support-messages-container">
          {supportMessages.map((msg, index) => (
            <div className="support-card" key={index}>
              <h3>{msg.initials} {msg.surname}</h3>
              <p>Email: {msg.email}</p>
              <p>Date/Time: {msg.dateTime}</p>
              <p>{msg.message}</p>
              <div className="support-buttons">
                <button className="resolve-btn">Resolve</button>
                <button className="view-btn">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
