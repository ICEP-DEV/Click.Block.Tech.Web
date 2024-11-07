import React, { useState } from 'react';
import './style.css';
import ProfileHeader from './ProfileHeader';
import StatsCards from './StatsCards';
import PanicButtonFeature from './PanicButtonFeature';
import AccountActionsLog from './AccountActionsLog';
import SupportMessages from './SupportMessages';
import SearchBar from './SearchBar';

const AdminDashboard = () => {
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
      <ProfileHeader />
      <SearchBar />
      <div className="spacer"></div> {/* Spacer for space between header and the rest */}
      <h1 className="dashboard-heading">CUSTOMER ACCOUNTS MANAGEMENT</h1>
      <StatsCards />
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
    </div>
  );
};

export default AdminDashboard;
