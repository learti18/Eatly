import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../../components/Shared/Logo";

export default function Return() {
  const { connectedAccountId } = useParams();
  const navigate = useNavigate();

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
