import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './screens/AdminDashboard';
import FrozenAccounts from './screens/Frozen'; // Import the frozen accounts component
import CustomerAccounts from './screens/CustomerAccounts'; // Import the customer accounts component
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from '../src/screens/Login';
import RealTimeTracking from './screens/realTimeTracking';
import DeactivatedAccounts from './screens/DeactivateAccounts';
import ProtectedRoute from './screens/components/ProtectedRoute';
import ActiveAccounts from './screens/ActiveAccounts';
import RestoredAccounts from './screens/RestoredAccounts';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/dashboard' element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
        <Route path='/frozen-accounts' element={<ProtectedRoute> <FrozenAccounts /> </ProtectedRoute>} />
        <Route path='/customer-accounts' element={<ProtectedRoute> <CustomerAccounts /> </ProtectedRoute>} />
        <Route path='/active-accounts' element={<ProtectedRoute> <ActiveAccounts /> </ProtectedRoute>} />
        <Route path='/deactivated-accounts' element={<ProtectedRoute> <DeactivatedAccounts /> </ProtectedRoute>} />
        <Route path='/restored-accounts' element={<ProtectedRoute> <RestoredAccounts /> </ProtectedRoute>} />
        <Route path='/live-location' element={<ProtectedRoute> <RealTimeTracking /> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
