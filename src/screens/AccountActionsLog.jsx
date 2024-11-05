import React from 'react';
import './style.css';

const AccountActionsLog = ({ tableData }) => {
  return (
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
  );
};

export default AccountActionsLog;
