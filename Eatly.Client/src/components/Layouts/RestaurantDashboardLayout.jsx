import React from "react";
import { Link, Outlet } from "react-router-dom";
import RestaurantSidebar from "../Navigation/RestaurantSidebar";

export default function RestaurantDashboardLayout() {
  return (
    <div className="flex flex-row bg-background-main">
      <div>
        <RestaurantSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
}
