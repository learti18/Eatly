import { ChevronDown, X } from "lucide-react";
import React from "react";

export default function OrderFilters({
  showFilters,
  setShowFilters,
  orderStatusFilter,
  handleOrderStatusChange,
  paymentStatusFilter,
  handlePaymentStatusChange,
  resetFilters,
  hasActiveFilters,
  orderStatusOptions,
  paymentStatusOptions,
}) {
  return (
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden mb-6 ${
        showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg text-gray-800">Filter Orders</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Order Status
            </label>
            <div className="relative">
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple focus:ring focus:ring-purple focus:ring-opacity-50 h-10 pl-3 pr-10 text-gray-700 appearance-none"
                value={orderStatusFilter}
                onChange={(e) => handleOrderStatusChange(e.target.value)}
              >
                {orderStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Payment Status
            </label>
            <div className="relative">
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple focus:ring focus:ring-purple focus:ring-opacity-50 h-10 pl-3 pr-10 text-gray-700 appearance-none"
                value={paymentStatusFilter}
                onChange={(e) => handlePaymentStatusChange(e.target.value)}
              >
                {paymentStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={resetFilters}
            className={`px-4 py-2 rounded-lg ${
              hasActiveFilters
                ? "text-gray-700 bg-gray-100 hover:bg-gray-200"
                : "text-gray-400 cursor-not-allowed"
            }`}
            disabled={!hasActiveFilters}
          >
            Clear Filters
          </button>
          <button
            onClick={() => setShowFilters(false)}
            className="ml-3 px-4 py-2 bg-purple text-white rounded-lg hover:bg-purple-dark"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
