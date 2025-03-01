import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext

const ProtectedRoute = () => {
  const { token } = useAuth(); // Check if token exists

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
