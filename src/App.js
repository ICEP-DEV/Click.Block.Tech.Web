import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AtmSimulator from './screens/AtmSimulator';
import QRCodePage from './screens/QRCodePage';
import Withdraw from './screens/Withdraw';
import PinEntry from './screens/PinEntry'; 
import Wallet from './screens/Wallet';
import TransactionSimulator from './screens/TransactionSimulator';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AtmSimulator />} />
        <Route path="/qr-code" element={<QRCodePage />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/pin-entry" element={<PinEntry />} />
        <Route path="/wallet" element={<Wallet />} /> {/* Route for Pin Entry */}
        <Route path="/TransactionSimulator" element={<TransactionSimulator />} />
      </Routes>
    </Router>
  );
};

export default App;
