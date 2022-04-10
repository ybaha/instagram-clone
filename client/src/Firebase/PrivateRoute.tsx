import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute: React.FC = ({ children }): any => {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
