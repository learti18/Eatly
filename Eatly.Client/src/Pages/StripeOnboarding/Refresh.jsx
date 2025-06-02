import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/Api";

export default function Refresh() {
  const { connectedAccountId } = useParams();
  const [accountLinkCreatePending, setAccountLinkCreatePending] =
    useState(false);
  const [error, setError] = useState(false);

  React.useEffect(() => {
    if (connectedAccountId) {
      setAccountLinkCreatePending(true);

      api
        .post(
          "/account_link",
          { account: connectedAccountId },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          setAccountLinkCreatePending(false);
          const { url, error } = response.data;

          if (url) {
            window.location.href = url;
          }

          if (error) {
            setError(true);
          }
        })
        .catch((err) => {
          console.error("Error creating account link:", err);
          setAccountLinkCreatePending(false);
          setError(true);
        });
    }
  }, [connectedAccountId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
      <div className="bg-purple-600 text-white p-4 rounded-t-lg mb-6">
        <h2 className="text-xl font-bold">Connect Your Account</h2>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Add information to start accepting payments
        </h2>
        <p className="text-gray-600">
          Complete your account setup to begin receiving payments through our
          platform.
        </p>
        {error && (
          <p className="p-3 bg-red-100 text-red-700 rounded-md">
            Something went wrong! Please try again.
          </p>
        )}
      </div>
      <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
        {connectedAccountId && (
          <p className="text-sm text-gray-700">
            Your connected account ID:{" "}
            <code className="bg-gray-100 px-2 py-1 rounded font-mono">
              {connectedAccountId}
            </code>
          </p>
        )}
        {accountLinkCreatePending && (
          <div className="flex items-center space-x-2 text-purple-600">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p>Creating a new Account Link...</p>
          </div>
        )}
      </div>
    </div>
  );
}
