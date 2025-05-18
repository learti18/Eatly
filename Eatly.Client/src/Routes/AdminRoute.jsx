import React, { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { STATUS } from "../Utils/AuthStatus";

export default function AdminRoute() {
  const { isAuthenticated, status, user } = useAuth();
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (status !== STATUS.PENDING) {
      setAuthChecked(true);
    }
  }, [status]);

  if (status === STATUS.PENDING || !authChecked) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (!user?.roles?.includes("Admin")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
