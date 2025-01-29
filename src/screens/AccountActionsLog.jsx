import React from 'react';
import './style.css';

const AccountActionsLog = ({ tableData, onAccountClick }) => {
  return (
    <div className="table-section">
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
            <tr key={index} onClick={() => onAccountClick(row.accountNumber)} className="clickable-row">
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
