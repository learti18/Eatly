import React from "react";
import { Truck, UserCheck } from "lucide-react";

export default function DriverAssignment({ 
  order, 
  canAssignDriver, 
  isPaid, 
  isOrderConfirmed, 
  availableDrivers, 
  onAssignDriver 
}) {
  // Show driver assignment section when appropriate
  if (canAssignDriver) {
    return (
      <div className="p-6 border-b bg-blue-50">
        {!order.driverId ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Truck size={18} className="mr-2 text-blue-600" />
              <span className="text-md font-medium text-gray-700">
                Assign Driver:
              </span>
            </div>

            <div className="flex-grow max-w-xs">
              <select
                className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-purple/30 focus:border-purple transition-all"
                onChange={(e) => onAssignDriver(e.target.value)}
                value=""
              >
                <option value="">Select a driver</option>
                {availableDrivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.fullName} ({driver.phoneNumber})
                  </option>
                ))}
                {availableDrivers.length === 0 && (
                  <option disabled>No available drivers</option>
                )}
              </select>
            </div>
          </div>
        ) : (
          <DriverInfo order={order} isActive={true} />
        )}
      </div>
    );
  }

  // Show read-only driver info for completed/delivered orders with a driver
  if (isPaid && order.driverId && 
    (order.orderStatus === "Delivered" || order.orderStatus === "Completed")) {
    return (
      <div className="p-6 border-b bg-gray-50">
        <DriverInfo order={order} isActive={false} />
      </div>
    );
  }

  // Show payment required message
  if (isOrderConfirmed && order.paymentStatus !== "Paid" && 
    order.orderStatus !== "Delivered" && order.orderStatus !== "Completed") {
    return (
      <div className="p-4 border-b bg-amber-50">
        <div className="flex items-center gap-3">
          <div className="text-amber-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-2 4a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-amber-700 text-sm">
            Driver can only be assigned after payment is confirmed.
          </p>
        </div>
      </div>
    );
  }

  // No driver section needed
  return null;
}

// Helper component for displaying driver information
function DriverInfo({ order, isActive }) {
  const bgColor = isActive ? "bg-green-100" : "bg-gray-200";
  const textColor = isActive ? "text-green-600" : "text-gray-600";
  const titleColor = isActive ? "text-green-800" : "text-gray-700";
  const badgeColor = isActive ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-700";
  const infoColor = isActive ? "text-green-700" : "text-gray-700";
  const detailColor = isActive ? "text-green-600" : "text-gray-600";

  return (
    <div className="flex items-start gap-4">
      <div className={`${bgColor} p-3 rounded-full`}>
        <UserCheck size={24} className={textColor} />
      </div>
      <div>
        <h3 className={`text-lg font-semibold ${titleColor} flex items-center`}>
          {isActive ? "Assigned Driver" : "Delivery Driver"}
          <span className={`ml-2 px-2 py-1 ${badgeColor} text-xs rounded-full`}>
            {isActive ? "Active" : order.orderStatus}
          </span>
        </h3>
        <p className={`${infoColor} font-medium text-lg mt-1`}>
          {order.driverName || "Driver Name"}
        </p>
        {order.driverPhoneNumber && (
          <p className={`${detailColor} mt-1`}>
            <span className="font-medium">Phone:</span> {order.driverPhoneNumber}
          </p>
        )}
      </div>
    </div>
  );
}
