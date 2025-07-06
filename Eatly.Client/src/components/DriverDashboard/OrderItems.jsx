import React from "react";
import { formatCurrency } from "../../Utils/currencyFormatter";

export default function OrderItems({ orderData }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        Order Items ({orderData.items.length})
      </h3>

      <div className="space-y-4">
        {orderData.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
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
              <h4 className="font-medium">{item.foodName}</h4>
              <p className="text-sm text-gray-500">
                ${formatCurrency(item.price)} × {item.quantity}
              </p>
            </div>
            <div className="font-medium">
              ${formatCurrency(item.price * item.quantity)}
            </div>
          </div>
        ))}

        <div className="pt-4 flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold text-purple">
            ${formatCurrency(orderData.totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
