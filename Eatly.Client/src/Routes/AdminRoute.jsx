import React, { useEffect, useState } from "react";
import { useAuth } from "../Hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { STATUS } from "../Utils/AuthStatus";
import { getCurrentUser } from "../Utils/UserStore";

export default function AdminRoute() {
  const { isAuthenticated, status } = useAuth();
  const isAdmin = getCurrentUser()?.roles[0] === "Admin";

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
    )
  }
  if (!isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
