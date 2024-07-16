import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const  logedUserData = useSelector((state) => state.Auth. logedUserData);
  console.log( logedUserData)
  const userRole = useSelector((state) => state.Auth.isUserRole);
  console.log(userRole,"jjj",allowedRoles)
  if (! logedUserData) {
    return <Navigate to="/" replace />;
  }

  // if (allowedRoles && !allowedRoles.includes(userRole)) {
  //   return <Navigate to="/" replace />;
  // }

  return element;
};

export default ProtectedRoute;
