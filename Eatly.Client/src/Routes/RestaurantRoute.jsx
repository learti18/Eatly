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

  if (!user?.roles?.includes("Restaurant")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
