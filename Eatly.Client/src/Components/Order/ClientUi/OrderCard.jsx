import React, { useState } from "react";
import { formatDate } from "../../../utils/dateFormatter";
import { formatCurrency } from "../../../utils/currencyFormatter";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  ShoppingBag,
  CreditCard,
} from "lucide-react";

export default function OrderCard({
  order,
  orderStatusColors,
  paymentStatusColors,
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Order header - always visible */}
      <div
        className="p-6 border-b border-gray-100 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-purple-50 rounded-full p-3">
              <ShoppingBag size={20} className="text-purple" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">Order #{order.id}</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                <span>{formatDate(order.orderDate)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-lg font-bold text-gray-900">
              ${formatCurrency(order.totalPrice)}
            </div>

            <div className="flex flex-wrap gap-2">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  orderStatusColors[order.orderStatus]
                }`}
              >
                {order.orderStatus}
              </span>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  paymentStatusColors[order.paymentStatus]
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-end">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {/* Order details - visible when expanded */}
      {expanded && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipping & Payment Information */}
            <div>
              <h3 className="text-md font-medium mb-3 text-gray-700">
                Shipping Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin
                    size={16}
                    className="text-gray-500 mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-medium">{order.streetAddress}</p>
                    <p className="text-sm text-gray-600">
                      {order.city}, {order.state} {order.zipCode}
                    </p>
                  </div>
                </div>

                {order.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-sm">{order.phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order timeline or additional info */}
            <div>
              <h3 className="text-md font-medium mb-3 text-gray-700">
                Payment Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      paymentStatusColors[order.paymentStatus]
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>

                {order.isPaid && order.paymentDate && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Paid on:</span>
                    <span className="text-sm font-medium">
                      {formatDate(order.paymentDate)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total:</span>
                  <span className="text-sm font-medium">
                    ${formatCurrency(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mt-6">
            <h3 className="text-md font-medium mb-3 text-gray-700">
              Order Items
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 border-b last:border-b-0 border-gray-200"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0">
                    <img
                      src={item.foodImageUrl}
                      alt={item.foodName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/64x64?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-gray-900">
                      {item.foodName}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${formatCurrency(item.price)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Subtotal: ${formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Driver information if available */}
          {order.driverId && (
            <div className="mt-6">
              <h3 className="text-md font-medium mb-3 text-gray-700">
                Delivery Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {order.driverName ? (
                  <p className="text-sm">
                    <span className="font-medium">Driver:</span>{" "}
                    {order.driverName}
                    {order.driverPhoneNumber && (
                      <span className="ml-2">({order.driverPhoneNumber})</span>
                    )}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">
                    A driver has been assigned to your order.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
