import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ allowedRoles }) => {
  const { currentUser } = useAuth();
  console.log("PrivateRoute: curUser: ", currentUser);

    const token = localStorage.getItem("token"); // Get token from storage
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

/*
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }*/

  /*
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }*/

/*
  return <Outlet />;
};*/

export default PrivateRoute;
