import React from "react";
import { ChevronDown, X } from "lucide-react";
import {
  orderStatusOptions,
  paymentStatusOptions,
} from "../../constants/statuses";

export default function OrderFilters({
  showFilters,
  orderStatusFilter,
  paymentStatusFilter,
  hasActiveFilters,
  onOrderStatusChange,
  onPaymentStatusChange,
  onResetFilters,
  onRemoveOrderStatusFilter,
  onRemovePaymentStatusFilter,
}) {
  return (
    <>
      {/* Filters Section */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Status
              </label>
              <div className="relative">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => onOrderStatusChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                >
                  {orderStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Status
              </label>
              <div className="relative">
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => onPaymentStatusChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                >
                  {paymentStatusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex items-end">
                <button
                  onClick={onResetFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active filter indicators */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {orderStatusFilter !== "All" && (
            <div className="inline-flex items-center bg-purple-light text-purple-dark rounded-full px-3 py-1 text-sm">
              <span>Status: {orderStatusFilter}</span>
              <button
                onClick={onRemoveOrderStatusFilter}
                className="ml-2 hover:text-purple-darker"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {paymentStatusFilter !== "All" && (
            <div className="inline-flex items-center bg-purple-light text-purple-dark rounded-full px-3 py-1 text-sm">
              <span>Payment: {paymentStatusFilter}</span>
              <button
                onClick={onRemovePaymentStatusFilter}
                className="ml-2 hover:text-purple-darker"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
