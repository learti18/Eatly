import React, { useEffect, useState } from "react";
import { useRestaurantByUserId } from "../../../Queries/Restaurants/useRestaurantByUserId";
import RestaurantProfile from "./RestaurantProfile";
import RestaurantVerification from "./RestaurantVerification";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import api from "../../../Services/Api";

export default function RestaurantSetup() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isOnboardedLoading, setIsOnboardedLoading] = useState(true);
  const isFromRegistration = location.state?.from === "/restaurant-signup";
  const { data: restaurant, isLoading } = useRestaurantByUserId();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const response = await api.get("/restaurants/me");

        if (response.status !== 200) {
          throw new Error("Failed to fetch onboarding status");
        }
        const { isVerified } = response.data;
        setIsOnboarded(isVerified);
      } catch (error) {
        setIsOnboarded(false);
      } finally {
        setIsOnboardedLoading(false);
      }
    };
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (isFromRegistration && restaurant) {
      navigate(location.pathname, { replace: true });
    }
  }, [isFromRegistration, restaurant, navigate, location.pathname]);

  if (isLoading || isOnboardedLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!restaurant) {
    console.log("Showing RestaurantProfile because no restaurant exists");
    return <RestaurantProfile />;
  }

  if (!isOnboarded) {
    console.log(
      "Showing RestaurantVerification because restaurant is not verified"
    );
    return <RestaurantVerification />;
  }

  return <Navigate to="/restaurant-dashboard" replace />;
}
