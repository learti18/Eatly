import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import RestaurantSidebar from "../Navigation/RestaurantSidebar";
import api from "../../Services/Api";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import {
  ConnectPayments,
  ConnectComponentsProvider,
  ConnectDocuments,
} from "@stripe/react-connect-js";
import useLogout from "../../Queries/Auth/useLogout";

export default function RestaurantDashboardLayout() {
  const [stripeConnectInstance, setStripeConnectInstance] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      if (stripeConnectInstance) {
        await stripeConnectInstance.logout();
        console.log("Logged out from Stripe Connect");
      }
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.error("Error during logout process:", error);
    }
  };

  useEffect(() => {
    const initializeStripeConnect = async () => {
      try {
        const fetchClientSecret = async () => {
          const response = await api.post("/account/session");

          if (response.status !== 200) {
            const { error } = response.data;
            throw new Error(error || "Failed to get client secret");
          }

          const { clientSecret } = response.data;
          return clientSecret;
        };

        const instance = await loadConnectAndInitialize({
          publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
          fetchClientSecret,
          appearance: {
            variables: {
              colorPrimary: " #6c5fbc",
              colorBackground: "#FFFFFF",
              offsetBackgroundColor: "#f9f9f9",
              borderRadius: "8px",
              buttonBorderRadius: "6px",
              formBorderRadius: "6px",
              badgeBorderRadius: "6px",
              spacingUnit: "5px",
            },
          },
        });

        setStripeConnectInstance(instance);
      } catch (error) {
        console.error("Stripe Connect init error:", error);
        setErrorMessage(error.message);
      }
    };

    initializeStripeConnect();
  }, []);

  if (errorMessage) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">{`Error initializing Stripe Connect: ${errorMessage}`}</div>
    );
  }

  if (!stripeConnectInstance) {
    return <div className="p-4 text-center">Loading Stripe Connect...</div>;
  }

  return (
    <div className="flex flex-row bg-background-main">
      <div>
        <RestaurantSidebar onLogout={handleLogout} />
      </div>

     
      
      {/* Error Message */}
      {errorMessage ? (
        <div>{`Error: ${errorMessage}`}</div>
      ) : (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <div className="flex-1  ">
            <Outlet />
          </div>
        </ConnectComponentsProvider>
      )}
    </div>
  );
}
