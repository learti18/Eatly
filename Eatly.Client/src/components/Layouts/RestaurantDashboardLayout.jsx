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

export default function RestaurantDashboardLayout() {
  const [stripeConnectInstance, setStripeConnectInstance] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

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
              colorPrimary: "#6c5fbc",
              colorBackground: "#ffff",
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
    return <div>{`Error initializing Stripe Connect: ${errorMessage}`}</div>;
  }

  if (!stripeConnectInstance) {
    return <div>Loading Stripe Connect...</div>;
  }

  return (
    <div className="flex flex-row bg-background-main">
      <div>
        <RestaurantSidebar />
      </div>

      {/* Error Message */}
      {errorMessage ? (
        <div>{`Error: ${errorMessage}`}</div>
      ) : (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <div className="flex-1 py-8 px-8 md:px-10">
            <Outlet />
          </div>
        </ConnectComponentsProvider>
      )}
    </div>
  );
}
