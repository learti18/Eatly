import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  items-center justify-center h-screen bg-background-main">
      <div className="text-center p-8 bg-white rounded-xl shadow-sm max-w-md w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6">
          Add items to your cart before checking out.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="bg-purple hover:bg-purple-dark text-white font-semibold py-2 px-6 rounded-xl transition-colors"
        >
          Browse Menu
        </button>
      </div>
    </div>
  );
}
