import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  
  if (!auth.user) {
    toast.error('Please login to book flights');
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;