import React from "react";
import { PackageCheck, MapPin } from "lucide-react";

export default function ReadyForPickupOrderCard({ order }) {
  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-blue-500 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-semibold text-white">
            <PackageCheck size={18} />
            Ready for Pickup
          </h2>
          <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
            {order.orderStatus}
          </span>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <PackageCheck size={32} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Your order is ready!
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your order has been prepared and is ready for pickup. A delivery
              driver will be assigned shortly to bring it to you.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 w-full">
              <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                <MapPin size={16} className="text-blue-500" />
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
