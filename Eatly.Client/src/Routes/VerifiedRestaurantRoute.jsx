import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRestaurantByUserId } from "../Queries/Restaurants/useRestaurantByUserId";
import api from "../Services/Api";

export default function VerifiedRestaurantRoute() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isOnboardedLoading, setIsOnboardedLoading] = useState(true);

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

  if (isOnboardedLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!isOnboarded) {
    return <Navigate to="/restaurant-profile" replace />;
  }

  return <Outlet />;
}
