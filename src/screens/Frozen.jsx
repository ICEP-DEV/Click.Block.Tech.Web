import React from 'react';

const FrozenAccounts = () => {
  const frozenAccountsData = [
    { email: 'kjmoatshe@gmail.com', name: 'KJ Moatshe', registrationDate: '09/10/2024', status: 'Frozen', lastLogin: 'Today 11:04 am' },
    { email: 'bmwalee@gmail.com', name: 'B Mwale', registrationDate: '12/10/2024', status: 'Frozen', lastLogin: 'Today 09:30 am' },
    { email: 'Bmwale@gmail.com', name: 'B Mwale', registrationDate: '16/10/2024', status: 'Frozen', lastLogin: 'Today 09:50 am' },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Frozen Accounts</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Email Address</th>
            <th>Customer Details</th>
            <th>Registration Date</th>
            <th>Account Status</th>
            <th>Last Login</th>
          </tr>
        </thead>
        <tbody>
          {frozenAccountsData.map((account, index) => (
            <tr key={index}>
              <td>{account.email}</td>
              <td>{account.name}</td>
              <td>{account.registrationDate}</td>
              <td>{account.status}</td>
              <td>{account.lastLogin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FrozenAccounts;
