import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element}) => {
  const  logedUserData = useSelector((state) => state.Auth.logedUserData);

  if (!logedUserData) {
    return <Navigate to="/job_Portal_Testing" replace />;
  }

  return element;
};

export default ProtectedRoute;
