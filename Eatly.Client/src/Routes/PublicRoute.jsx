import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function PublicRoute() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Don't redirect if we're on the registration page
  if (location.pathname === "/restaurant-signup") {
    return <Outlet />;
  }

  // For authenticated users, redirect based on role
  if (isAuthenticated) {
    if (user?.roles?.includes("Restaurant")) {
      return <Navigate to="/restaurant-profile" replace />;
    }
    if (user?.roles?.includes("Admin")) {
      return <Navigate to="/dashboard" replace />;
    }
    if (user?.roles?.includes("DeliveryDriver")) {
      return <Navigate to="/driver-dashboard" replace />;
    }
  }

  return <Outlet />;
}
