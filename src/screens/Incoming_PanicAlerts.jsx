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
              <td>{row.customerID}</td>
              <td>{row.alertType}</td>
              <td>{row.dateTime}</td>
              <td className='viewLiveLocation_tableData'>{row.view}</td>
              <td className='resolve_panicAlert_td'>{row.resolve}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomingPanicAlerts;
