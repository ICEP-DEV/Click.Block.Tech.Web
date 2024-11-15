import React from 'react';
import './style.css';

const IncomingPanicAlerts = ({ tableData }) => {
  return (
    <div className="table-section">
     
      <table className="data-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Alert Type</th>
            <th>Alert Sent Date</th>
            <th>View live location</th>
            <th>Resolve</th>
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

export default IncomingPanicAlerts;
