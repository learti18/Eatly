import React from "react";
import { Package, Check, MapPin, Clock } from "lucide-react";
import { formatDate } from "../../../Utils/dateFormatter";

export default function CompletedOrderCard({ order }) {
  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold text-white">
            <Package size={18} />
            Order {order.orderStatus}
          </h2>
          <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            {order.orderStatus}
          </span>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-50 border-2 border-green-200 p-4 rounded-full mb-4">
              <Check className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {order.orderStatus === "Completed"
                ? "Your order has been completed!"
                : "Your order has been delivered!"}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for choosing us! We hope you enjoyed your meal. Don't
              forget to rate your experience.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 w-full">
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <MapPin size={16} className="text-green-600" />
                <span className="font-medium">Delivered to:</span>
              </div>
              <div className="text-sm text-gray-800 ml-6">
                <p>{order.streetAddress}</p>
                {order.city && order.state && (
                  <p>
                    {order.city}, {order.state} {order.zipCode}
                  </p>
                )}
              </div>
              {order.deliveredAt && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock size={16} className="text-green-600" />
                    <span className="font-medium">Delivered on:</span>
                    <span>{formatDate(order.deliveredAt)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
