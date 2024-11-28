import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../API/API';

export default function ResolvePanicAlert({ customerID, onResolved }) {
  const handleResolve = async () => {
    try {
      const response = await axios.patch(`${BASE_URL}/updatePanicStatus/${customerID}`);
      console.log(response.data);

      if (onResolved) onResolved(customerID);
    } catch (error) {
      console.error('Error resolving panic alert:', error);
      alert('Failed to resolve panic alert. Please try again.');
    }
  };

  return (
    <div className="resolve_panic_alert_btnContainer">
      <button onClick={handleResolve} className="resolve-btn">
        Resolve Alert
      </button>
    </div>
  );
}
