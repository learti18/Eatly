import React from "react";
import { MapPin, Phone } from "lucide-react";

export default function CustomerDetails({ orderData }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h3 className="text-lg font-semibold mb-4">Customer Details</h3>

      <div className="flex items-start gap-3 mb-4">
        <Phone className="text-gray-400 mt-1" size={18} />
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">
            {orderData.phoneNumber || "Not provided"}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <MapPin className="text-gray-400 mt-1" size={18} />
        <div>
          <p className="text-sm text-gray-500">Delivery Address</p>
          <p className="font-medium">
            {orderData.streetAddress}, {orderData.city}
            <br />
            {orderData.state}, {orderData.zipCode}
          </p>
        </div>
      </div>
    </div>
  );
}
