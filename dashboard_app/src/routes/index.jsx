import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Auth from "../pages/Auth";
import ProtectedRoute from "./ProtectedRoute";
import { NotFound } from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
