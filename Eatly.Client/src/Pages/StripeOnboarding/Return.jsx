import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../../components/Shared/Logo";
import api from "../../Services/Api";

export default function Return() {
  const { connectedAccountId } = useParams();
  const navigate = useNavigate();

  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isOnboardedLoading, setIsOnboardedLoading] = useState(true);
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const response = await api.get("/account/onboarding-status");

        if (response.status !== 200) {
          throw new Error("Failed to fetch onboarding status");
        }
        const { isOnboarded } = response.data;
        setIsOnboarded(isOnboarded);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600 font-medium">
            Checking account status...
          </p>
        </div>
      </div>
    );
  }

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-red-50 p-6 border-b border-red-100">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-red-700">
                Account Setup Incomplete
              </h2>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-700 mb-6">
              You haven't completed setting up your Stripe account. Additional
              information is needed before you can start receiving payments.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                What's missing?
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>Identity verification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>Banking information</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span>Business details</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => navigate("/restaurant-profile")}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-purple hover:bg-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Return to Onboarding
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-12 px-4">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-purple p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Account Setup Complete</h2>
            <div className="bg-white/20 p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="bg-green-100 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-green-800">
                Account Details Submitted
              </h3>
              <p className="text-green-700 text-sm">
                Your Stripe account has been set up successfully
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thank You for Joining Eatly!
          </h2>
          <p className="text-gray-700 mb-6">
            Your payment account has been successfully set up. You're now ready
            to receive payments through the Eatly platform.
          </p>

          {connectedAccountId && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Connected Account Information
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Account ID:</span>
                <code className="bg-gray-100 text-purple px-2 py-1 rounded font-mono text-sm">
                  {connectedAccountId}
                </code>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="bg-purple/5 border border-purple/10 rounded-xl p-4">
              <h3 className="font-medium text-gray-800 mb-2">Next Steps</h3>
              <ul className="space-y-3 pl-5">
                <li className="flex items-start gap-2">
                  <div className="min-w-5 min-h-5 bg-purple/20 text-purple rounded-full flex items-center justify-center mt-0.5">
                    1
                  </div>
                  <span className="text-gray-700">
                    Complete your restaurant profile and menu setup
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-5 min-h-5 bg-purple/20 text-purple rounded-full flex items-center justify-center mt-0.5">
                    2
                  </div>
                  <span className="text-gray-700">
                    Add your menu items and set pricing
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="min-w-5 min-h-5 bg-purple/20 text-purple rounded-full flex items-center justify-center mt-0.5">
                    3
                  </div>
                  <span className="text-gray-700">
                    Start receiving orders from hungry customers!
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple hover:underline flex items-center gap-1"
            >
              <span>View Stripe Dashboard</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <button
              onClick={() => navigate("/restaurant-dashboard")}
              className="bg-purple hover:bg-purple-dark transition-colors text-white font-medium py-2 px-6 rounded-xl"
            >
              Go to Dashboard
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            This is a sample app for Stripe-hosted Connect onboarding.{" "}
            <a
              href="https://docs.stripe.com/connect/onboarding/quickstart?connect-onboarding-surface=hosted"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple hover:underline"
            >
              View docs
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
