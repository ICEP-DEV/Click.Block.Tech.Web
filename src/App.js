import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './screens/AdminDashboard';
import FrozenAccounts from './screens/Frozen'; // Import the frozen accounts component
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from '../src/screens/Login';
import RealTimeTracking from './screens/realTimeTracking';
import ProtectedRoute from './screens/components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route exact path='/' element={<ProtectedRoute> <AdminDashboard /></ProtectedRoute>} />
        <Route exact path='/Login' element={<Login />} />
        <Route path='/frozen-accounts' element={<FrozenAccounts />} />
        
        <Route path='/live-location' element={<RealTimeTracking />} />
      </Routes>
    </Router>
  );
}
export default App;

