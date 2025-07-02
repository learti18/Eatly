import React from "react";
import { ChefHat, MapPin } from "lucide-react";

export default function InPreparationOrderCard({ order }) {
  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-orange-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold text-white">
            <ChefHat size={18} />
            Order in Preparation
          </h2>
          <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            {order.orderStatus}
          </span>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-orange-100 p-4 rounded-full mb-4">
              <ChefHat size={32} className="text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Your order is being prepared
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We are working hard to prepare your meal. You'll be notified once
              it's ready for delivery.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 w-full">
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <MapPin size={16} className="text-orange-500" />
                <span className="font-medium">Delivering to:</span>
              </div>
              <div className="text-sm text-gray-800 ml-6">
                <p>{order.streetAddress}</p>
                {order.city && order.state && (
                  <p>
                    {order.city}, {order.state} {order.zipCode}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
