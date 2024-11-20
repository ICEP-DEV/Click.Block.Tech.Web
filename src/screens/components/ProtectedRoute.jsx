import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');

  return adminToken ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
