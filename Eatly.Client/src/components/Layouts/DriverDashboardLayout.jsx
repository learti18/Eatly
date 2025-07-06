import React from "react";
import { Link, Outlet } from "react-router-dom";
import DriverSidebar from "../Navigation/DriverSidebar";

export default function DriverDashboardLayout() {
  return (
    <div className="flex flex-row bg-white">
      <div>
        <DriverSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8 px-8 md:px-10">
        <Outlet />
      </div>
    </div>
  );
}
