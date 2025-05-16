import React from "react";
import { Link } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-5">
            <Lock className="text-red-600 h-6 w-6" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-500 mb-8">
            You don't have permission to access this page
          </p>

          <div className="border-t border-gray-200 pt-6 mb-6"></div>

          <p className="text-gray-600 mb-8">
            Please make sure you are logged in with an account that has the
            necessary permissions, or return to the homepage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition duration-150 ease-in-out"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 font-medium transition duration-150 ease-in-out"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>If you believe this is a mistake, please contact support</p>
        <a
          href="mailto:support@eatly.com"
          className="text-green-600 hover:text-green-700"
        >
          support@eatly.com
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
