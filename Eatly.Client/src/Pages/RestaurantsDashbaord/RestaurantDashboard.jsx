import React, { useState } from "react";
import api from "../../Services/Api";
import axios from "axios";

export default function RestaurantDashboard() {
  return (
    <div className="py-10 px-8">
      <div className="bg-purple text-white p-4 rounded-t-lg mb-6">
        <h2 className="text-xl font-bold">Restaurant Dashboard</h2>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome to Your Dashboard
        </h2>
        <p className="text-gray-600">
          Manage your restaurant, view orders, and update your profile.
        </p>
      </div>
      <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
        {/* Add your dashboard components here */}
        <p>Dashboard content goes here.</p>
      </div>
    </div>
  );
}
