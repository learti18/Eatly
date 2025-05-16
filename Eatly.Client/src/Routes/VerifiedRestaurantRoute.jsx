import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRestaurantByUserId } from "../Queries/Restaurants/useRestaurantByUserId";

export default function VerifiedRestaurantRoute() {
  const { data: restaurant, isLoading } = useRestaurantByUserId();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!restaurant?.isVerified) {
    return <Navigate to="/restaurant-verification" replace />;
  }

  return <Outlet />;
}
