import React from "react";
import { Eye } from "lucide-react";
import {
  orderStatusColors,
  paymentStatusColors,
} from "../../constants/statuses";

export default function OrdersTable({ orders, onViewOrder }) {
  const getStatusColor = (status) => {
    return orderStatusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentStatusColor = (status) => {
    return paymentStatusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-gray-900">
                Order ID
              </th>
              <th className="px-4 py-3 text-left font-bold text-gray-900">
                Date
              </th>
              <th className="px-4 py-3 text-left font-bold text-gray-900">
                Restaurant
              </th>
              <th className="px-4 py-3 text-left font-bold text-gray-900">
                Customer
              </th>
              <th className="px-4 py-3 text-left font-bold text-gray-900">
                Total
              </th>
              <th className="px-4 py-3 text-left font-bold text-gray-900">
                Status
              </th>
              <th className="px-4 py-3 text-center font-bold text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    #{order.id}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div>{new Date(order.orderDate).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(order.orderDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 max-w-32 truncate">
                    {order.restaurantName || "Unknown Restaurant"}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                      <span className="text-xs font-medium text-purple-800">
                        {order.user?.email?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-900 max-w-24 truncate">
                      {order.user?.email?.split("@")[0] || "Unknown User"}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${order.totalPrice?.toFixed(2) || "0.00"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.items?.length || 0} items
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-xs text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    title="View order details"
                  >
                    <Eye size={14} className="mr-1" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
