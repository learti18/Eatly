import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { STATUS } from "../Utils/AuthStatus";

export default function RestaurantRoute() {
  const { isAuthenticated, status, user } = useAuth();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (status !== STATUS.PENDING) {
      setAuthChecked(true);
    }
  }, [status]);

  // Show loading state while checking auth
  if (status === STATUS.PENDING || !authChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  // Redirect to sign in if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  // Redirect to home if not a restaurant user
  if (!user?.roles?.includes("Restaurant")) {
    return <Navigate to="/" replace />;
  }

  // Allow access to all restaurant routes
  return <Outlet />;
}

