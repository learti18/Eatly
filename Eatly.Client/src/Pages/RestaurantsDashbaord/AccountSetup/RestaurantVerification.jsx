import React from "react";
import Logo from "../../../components/Shared/Logo";
import useLogout from "../../../Queries/Auth/useLogout";

function RestaurantVerification() {
  const logoutMutation = useLogout();
  const handleLogout = () => {
    logoutMutation.mutateAsync();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mb-8">
        <Logo />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Verification in Progress
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're reviewing your restaurant details. This usually takes 24-48
            hours.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Progress indicator */}
          <div className="bg-purple-light px-8 py-4">
            <div className="flex items-center justify-between max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-purple text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <span className="text-xs mt-1 font-medium">Profile</span>
              </div>
              <div className="h-1 flex-1 mx-2 bg-purple"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-purple text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <span className="text-xs mt-1 font-medium">Verification</span>
              </div>
              <div className="h-1 flex-1 mx-2 bg-white"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-white text-gray-600 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <span className="text-xs mt-1">Dashboard</span>
              </div>
            </div>
          </div>

          <div className="py-12 px-6 sm:px-10">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-4">
                  <svg
                    className="w-full h-full text-purple"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Your Restaurant Profile is Complete!
                </h2>
                <p className="text-gray-600">
                  We've received your restaurant information and our team is
                  reviewing it.
                </p>
              </div>

              <div className="max-w-lg mx-auto bg-purple-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  What happens next?
                </h3>
                <ul className="text-left space-y-3">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-purple mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                      Our team will verify your restaurant details
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-purple mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                      We'll check your business documentation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-purple mt-1 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                      You'll receive an email once verified
                    </span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleLogout}
                className="bg-purple text-white rounded-xl px-8 text-lg py-2.5 cursor-pointer hover:bg-purple-dark mb-4"
              >
                Logout
              </button>

              <div className="text-sm text-gray-500">
                <p>
                  Need help?{" "}
                  <a href="/contact" className="text-purple hover:underline">
                    Contact our support team
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantVerification;
