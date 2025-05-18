import React, { useEffect } from "react";
import { useRestaurantByUserId } from "../../../Queries/Restaurants/useRestaurantByUserId";
import RestaurantProfile from "./RestaurantProfile";
import RestaurantVerification from "./RestaurantVerification";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function RestaurantSetup() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFromRegistration = location.state?.from === "/restaurant-signup";
  const { data: restaurant, isLoading } = useRestaurantByUserId();

  // Clear the registration state after first render
  useEffect(() => {
    if (isFromRegistration && restaurant) {
      // Replace the current location without the state
      navigate(location.pathname, { replace: true });
    }
  }, [isFromRegistration, restaurant, navigate, location.pathname]);

  console.log("RestaurantSetup Debug:", {
    isFromRegistration,
    isLoading,
    restaurant,
    location: location.pathname,
    state: location.state
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  // If no restaurant exists, show profile creation
  if (!restaurant) {
    console.log("Showing RestaurantProfile because no restaurant exists");
    return <RestaurantProfile />;
  }

  // If restaurant exists but is not verified, show verification
  if (!restaurant.isVerified) {
    console.log("Showing RestaurantVerification because restaurant is not verified");
    return <RestaurantVerification />;
  }

  // If restaurant is verified, redirect to dashboard
  console.log("Redirecting to dashboard because restaurant is verified");
  return <Navigate to="/restaurant-dashboard" replace />;
} 