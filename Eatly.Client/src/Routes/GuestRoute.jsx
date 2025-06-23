import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { STATUS } from "../Utils/AuthStatus";
import { useMemo } from "react";

export default function GuestRoute() {
  const { isAuthenticated, status } = useAuth();
  const location = useLocation();

  return useMemo(() => {
    if (status === STATUS.PENDING) {
      return (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      );
    }

    if (isAuthenticated) {
      return <Navigate to={location.state?.from?.pathname || "/"} replace />;
    }

    return <Outlet />;
  }, [isAuthenticated, status, location]);
}
