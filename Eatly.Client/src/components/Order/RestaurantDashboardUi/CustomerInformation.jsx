import React from "react";
import { User, MapPin, Phone } from "lucide-react";

export default function CustomerInformation({ order }) {
  return (
    <div className="p-6 border-b">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
        <User size={18} className="mr-2 text-gray-500" />
        Customer Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
            Customer ID
          </p>
          <p className="text-gray-800 font-medium break-all">
            {order.userId}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg flex">
          <MapPin
            size={18}
            className="mr-2 text-gray-400 flex-shrink-0 mt-1"
          />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Delivery Address
            </p>
            <p className="text-gray-800 font-medium uppercase">
              {order.streetAddress ? (
                <>
                  {order.streetAddress}, <br />
                  {order.city}, {order.state} {order.zipCode}
                </>
              ) : (
                "Not provided"
              )}
            </p>
            {order.latitude && order.longitude && (
              <a
                href={`https://www.google.com/maps?q=${order.latitude},${order.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple underline mt-2 block"
              >
                View on map
              </a>
            )}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg flex">
          <Phone
            size={18}
            className="mr-2 text-gray-400 flex-shrink-0 mt-1"
          />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              Phone Number
            </p>
            <p className="text-gray-800 font-medium">
              {order.phoneNumber || "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
