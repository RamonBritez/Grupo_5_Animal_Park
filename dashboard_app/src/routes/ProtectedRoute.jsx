import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function ProtectedRoute() {
  const { currentUser } = useAuth();
  return currentUser ? (<Outlet />) : (<Navigate to="/login" replace />);
}

export default ProtectedRoute;
