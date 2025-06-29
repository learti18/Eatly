import React, { useState } from "react";
import { formatCurrency } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";
import { Clock, CheckCircle } from "lucide-react";

export default function OrderSummary({
  orderData,
  onMarkDelivered,
  updatingStatus,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "OutForDelivery":
        return "bg-purple-light text-purple";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isDeliverable = orderData?.orderStatus === "OutForDelivery";
  const isCompleted =
    orderData?.orderStatus === "Delivered" ||
    orderData?.orderStatus === "Completed";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order #{orderData.id}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            orderData.orderStatus
          )}`}
        >
          {orderData.orderStatus}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <Clock size={14} />
          Ordered on {formatDate(orderData.orderDate)}
        </p>
        <p className="text-2xl font-bold text-purple mt-2">
          ${formatCurrency(orderData.totalPrice)}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        {isDeliverable && (
          <button
            onClick={onMarkDelivered}
            disabled={updatingStatus}
            className={`w-full py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium ${
              updatingStatus
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {updatingStatus ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
                Updating...
              </>
            ) : (
              <>
                <CheckCircle size={18} />
                Mark as Completed
              </>
            )}
          </button>
        )}

        {isCompleted && (
          <div className="w-full bg-green-50 text-green-700 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium">
            <CheckCircle size={18} />
            Order Completed - Ready for new assignments
          </div>
        )}

        {!isDeliverable && !isCompleted && (
          <div className="w-full bg-gray-50 text-gray-600 py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium">
            <Clock size={18} />
            Waiting for pickup
          </div>
        )}
      </div>
    </div>
  );
}
