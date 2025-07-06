import React from "react";
import { X, Clock } from "lucide-react";
import { formatDate } from "../../../utils/dateFormatter";

export default function CanceledOrderCard({ order }) {
  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-200">
        <div className="bg-red-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold text-white">
            <X size={18} />
            Order Canceled
          </h2>
          <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            {order.orderStatus}
          </span>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-50 border-2 border-red-200 p-4 rounded-full mb-4">
              <X size={32} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Your order has been canceled
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We're sorry, but your order has been canceled. If you have any
              questions or need assistance, please contact our support team.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 w-full">
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <Clock size={16} className="text-red-500" />
                <span className="font-medium">Canceled on:</span>
                <span>{formatDate(order.orderDate)}</span>
              </div>
              {order.cancelReason && (
                <div className="mt-2 text-sm text-gray-800">
                  <p className="font-medium">Reason:</p>
                  <p className="ml-2">{order.cancelReason}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
