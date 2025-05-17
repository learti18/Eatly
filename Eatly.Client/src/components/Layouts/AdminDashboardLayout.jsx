import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./../Navigation/AdminSidebar";

export default function AdminDashboardLayout() {
  return (
    <div className="flex flex-row bg-white">
      <div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 py-8 px-8 md:px-10">
        <Outlet />
      </div>
    </div>
  );
}
