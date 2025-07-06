import React from "react";
import { X, Calendar, User, MapPin, CreditCard, Package } from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import {
  orderStatusColors,
  paymentStatusColors,
} from "../../constants/statuses";

export default function OrderDetailsModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  const getStatusColor = (status) => {
    return orderStatusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentStatusColor = (status) => {
    return paymentStatusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full my-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Order #{order.id}
            </h2>
            <p className="text-gray-600 mt-1">{formatDate(order.orderDate)}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Package className="text-gray-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Order Status</p>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="text-gray-600" size={20} />
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getPaymentStatusColor(
                      order.paymentStatus
                    )}`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Restaurant Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <User size={20} />
                Customer Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-lg font-medium text-purple-800">
                      {order.userId?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Customer ID: {order.userId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: {order.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Restaurant Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-900">
                  {order.restaurantName || "Unknown Restaurant"}
                </p>
                {order.restaurant?.address && (
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin size={14} />
                    {order.restaurant.address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Driver Information */}
          {order.driverId && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Driver Information
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-800">
                      {order.driverName?.charAt(0).toUpperCase() || "D"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.driverName || "Driver Assigned"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Phone: {order.driverPhoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delivery Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <MapPin size={20} />
              Delivery Address
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-1">
                <p className="text-gray-900 font-medium">
                  {order.streetAddress}
                </p>
                <p className="text-gray-700">
                  {order.city}, {order.state} {order.zipCode}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {order.phoneNumber}
                </p>
                {order.latitude && order.longitude && (
                  <p className="text-xs text-gray-500">
                    Coordinates: {order.latitude}, {order.longitude}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Order Items ({order.items?.length || 0})
            </h3>
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Item
                      </th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                        Price
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items?.map((item, index) => (
                      <tr key={index} className="bg-white">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.foodImageUrl || "/placeholder-food.jpg"}
                              alt={item.foodName || "Food Item"}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.foodName || "Unknown Item"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="text-sm text-gray-900">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-sm text-gray-900">
                            ${item.price?.toFixed(2) || "0.00"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-sm font-medium text-gray-900">
                            ${(item.quantity * (item.price || 0)).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">
                  $
                  {(
                    order.totalPrice -
                    (order.deliveryFee || 0) -
                    (order.tax || 0)
                  ).toFixed(2)}
                </span>
              </div>
              <hr className="border-gray-300" />
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">
                  ${order.totalPrice?.toFixed(2) || "0.00"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
