import React, { useState } from "react";
import api from "../../Services/Api";
import axios from "axios";

export default function RestaurantDashboard() {
  const [accountCreatePending, setAccountCreatePending] = useState(false);
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState();

  const handleCreateAccount = async () => {
    setAccountCreatePending(true);
    setError(false);
    try {
      const response = await api.post("/account");
      const { account, error } = response.data;

      if (account) {
        setConnectedAccountId(account);
      }
      if (error) {
        setError(error);
      }
    } catch (err) {
      setError("Failed to create account. Please try again.");
      console.error("Error creating account:", err);
    } finally {
      setAccountCreatePending(false);
    }
  };

  const handleAddInformation = async () => {
    setAccountLinkCreatePending(true);
    setError(false);
    try {
      const response = await api.post("/account_link", {
        account: connectedAccountId,
      });

      const { url, error } = response.data;
      if (url) {
        window.location.href = url;
      }
      if (error) {
        setError(error);
      }
    } catch (err) {
      setError("Failed to create account link. Please try again.");
      console.error("Error creating account link:", err);
    } finally {
      setAccountLinkCreatePending(false);
    }
  };

  return (
    <div className="py-12 px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Payment Setup</h1>
        <p className="text-gray-600 mt-2">
          Connect your restaurant with Stripe to start receiving payments from
          customers.
        </p>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-purple p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Stripe Connect Integration
              </h2>
              <p className="text-purple-100 mt-1">
                Securely process payments with Stripe
              </p>
            </div>
            <svg
              className="w-12 h-12 text-white opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM9 13V19H7V13H9ZM15 15V19H17V15H15ZM11 11V19H13V11H11Z" />
            </svg>
          </div>
        </div>

        <div className="p-6">
          {/* Connection status */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  connectedAccountId ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></div>
              <h3 className="font-medium text-lg text-gray-800">
                {connectedAccountId
                  ? "Account Connected"
                  : "Account Setup Required"}
              </h3>
            </div>
            <p className="text-gray-600 mt-2 pl-6">
              {connectedAccountId
                ? "Your Stripe account is connected. Complete the verification process to start accepting payments."
                : "Connect your restaurant with Stripe to accept online payments and manage your earnings."}
            </p>
          </div>

          {/* Onboarding steps */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div
              className={`border rounded-xl p-5 ${
                connectedAccountId
                  ? "bg-gray-50 border-gray-200"
                  : "bg-white border-purple-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    connectedAccountId
                      ? "bg-green-100 text-green-700"
                      : "bg-purple bg-opacity-10 text-purple"
                  }`}
                >
                  {connectedAccountId ? "✓" : "1"}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    Create Stripe Account
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Connect your restaurant to Stripe's payment processing
                    platform
                  </p>
                </div>
                {!connectedAccountId && (
                  <button
                    onClick={handleCreateAccount}
                    disabled={accountCreatePending}
                    className="bg-purple hover:bg-purple-dark text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center gap-2"
                  >
                    {accountCreatePending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Creating...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                )}
              </div>

              {connectedAccountId && (
                <div className="mt-3 pl-12">
                  <div className="bg-green-50 border border-green-200 rounded-lg py-2 px-3 text-sm text-green-800 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Account created successfully
                  </div>
                </div>
              )}
            </div>

            {/* Step 2 */}
            <div
              className={`border rounded-xl p-5 ${
                !connectedAccountId
                  ? "opacity-60 bg-gray-50 border-gray-200"
                  : "bg-white border-purple-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-purple bg-opacity-10 text-purple">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    Complete Verification
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Add your business details and banking information to start
                    accepting payments
                  </p>
                </div>
                {connectedAccountId && (
                  <button
                    onClick={handleAddInformation}
                    disabled={accountLinkCreatePending || !connectedAccountId}
                    className="bg-purple hover:bg-purple-dark text-white px-4 py-2 rounded-xl transition-colors font-medium flex items-center gap-2"
                  >
                    {accountLinkCreatePending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Preparing...
                      </>
                    ) : (
                      "Complete Setup"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Account ID info */}
          {connectedAccountId && (
            <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700">
                Connected Account Information
              </h4>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-sm text-gray-600">Account ID:</span>
                <code className="bg-gray-100 text-purple rounded px-2 py-1 font-mono text-sm">
                  {connectedAccountId}
                </code>
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-red-500 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-red-800">
                    Error occurred
                  </h4>
                  <p className="text-sm text-red-700 mt-1">
                    {typeof error === "string"
                      ? error
                      : "Something went wrong. Please try again."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer info */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-500 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 10-2 0v4a1 1 0 102 0V9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm text-gray-600">
                <p>
                  Stripe helps you accept payments securely and manage your
                  business finances.
                </p>
                <a
                  href="https://stripe.com/docs/connect/account-tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple hover:underline inline-flex items-center gap-1 mt-2"
                >
                  Learn more about Stripe Connect
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
