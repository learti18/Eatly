import React, { useState } from "react";
import { formatCurrency } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";
import { Clock, CheckCircle } from "lucide-react";

export default function OrderSummary({ orderData, onMarkDelivered }) {
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleMarkDelivered = () => {
    setUpdatingStatus(true);

    // Simulate API call delay
    setTimeout(() => {
      onMarkDelivered();
      setUpdatingStatus(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order #{orderData.id}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            orderData.orderStatus === "OutForDelivery"
              ? "bg-purple-100 text-purple-800"
              : orderData.orderStatus === "Delivered"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
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

      <div className="flex flex-col gap-4">
        {orderData.orderStatus === "OutForDelivery" && (
          <button
            onClick={handleMarkDelivered}
            disabled={updatingStatus}
            className="py-3 px-4 bg-purple text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-purple-dark transition-colors"
          >
            {updatingStatus ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <CheckCircle size={18} />
                Mark as Delivered
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
