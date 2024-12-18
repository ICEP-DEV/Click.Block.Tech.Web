import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../Login';

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');

  return adminToken ? children : <Login/>;
};

export default ProtectedRoute;
