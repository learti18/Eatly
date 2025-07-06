import React from "react";
import { formatCurrency } from "../../Utils/currencyFormatter";
import { formatDate } from "../../Utils/dateFormatter";

export default function OrderDetailsPanel({ order, onClose, statusColors }) {
  return (
    <div className="bg-gray-50 p-6 rounded-b-xl animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg text-gray-900">Order Details</h3>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CustomerInformation order={order} />
        <OrderSummary order={order} statusColors={statusColors} />
      </div>

      <OrderItems items={order.items} />
    </div>
  );
}

function CustomerInformation({ order }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h4 className="text-sm font-medium text-gray-500 mb-2">
        Customer Information
      </h4>
      <div className="text-sm">
        <p>
          <span className="font-medium">User ID:</span> {order.userId}
        </p>
        <p>
          <span className="font-medium">Order Date:</span>{" "}
          {formatDate(order.orderDate)}
        </p>
        <p>
          <span className="font-medium">Total Amount:</span> $
          {formatCurrency(order.totalPrice)}
        </p>
      </div>
    </div>
  );
}

function OrderSummary({ order, statusColors }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h4 className="text-sm font-medium text-gray-500 mb-2">Order Summary</h4>
      <div className="text-sm">
        <p>
          <span className="font-medium">Total Items:</span>{" "}
          {order.items.reduce((sum, item) => sum + item.quantity, 0)} (
          {order.items.length} unique)
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${
              statusColors[order.status]
            }`}
          >
            {order.status}
          </span>
        </p>
        <p>
          <span className="font-medium">ID:</span> #{order.id}
        </p>
      </div>
    </div>
  );
}

function OrderItems({ items }) {
  return (
    <>
      <h4 className="font-medium text-gray-700 mb-3">Order Items</h4>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <OrderItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

function OrderItemCard({ item }) {
  return (
    <div className="flex gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <img
        src={item.foodImageUrl}
        alt={item.foodName}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex flex-col justify-between">
        <div>
          <p className="font-medium text-gray-900">{item.foodName}</p>
          <p className="text-sm text-gray-600 mb-1">
            Qty: {item.quantity} × ${formatCurrency(item.price / item.quantity)}
          </p>
        </div>
        <p className="text-sm font-semibold text-purple">
          Subtotal: ${formatCurrency(item.price)}
        </p>
      </div>
    </div>
  );
}
