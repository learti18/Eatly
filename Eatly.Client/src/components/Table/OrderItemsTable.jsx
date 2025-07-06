import React from "react";
import { formatCurrency } from "../../Utils/currencyFormatter";

export default function OrderItemsTable({ order }) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Items</h3>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-100">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {order.items.map((item, index) => (
              <tr key={item.id || index}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 mr-4 bg-gray-100">
                      <img
                        className="h-full w-full object-cover"
                        src={item.foodImageUrl}
                        alt={item.foodName}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/64x64?text=No+Image";
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.foodName}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {item.foodId}
                      </div>
                      {item.options && (
                        <div className="text-xs text-gray-500 mt-1">
                          {item.options}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-500">
                  <span className="px-2 py-1 bg-purple-50 text-purple rounded-lg font-medium">
                    {item.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                  ${formatCurrency(item.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                  ${formatCurrency(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td
                colSpan="3"
                className="px-6 py-3 text-right text-sm font-medium text-gray-700"
              >
                Subtotal
              </td>
              <td className="px-6 py-3 text-right text-sm font-semibold text-gray-800">
                ${formatCurrency(order.totalPrice - (order.deliveryFee || 0))}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td
                colSpan="3"
                className="px-6 py-3 text-right text-sm font-medium text-gray-700"
              >
                Delivery Fee
              </td>
              <td className="px-6 py-3 text-right text-sm font-semibold text-gray-800">
                ${formatCurrency(order.deliveryFee || 0)}
              </td>
            </tr>
            <tr className="bg-purple-50">
              <td
                colSpan="3"
                className="px-6 py-4 text-right text-sm font-bold text-gray-800"
              >
                Total
              </td>
              <td className="px-6 py-4 text-right text-base font-bold text-purple">
                ${formatCurrency(order.totalPrice)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
