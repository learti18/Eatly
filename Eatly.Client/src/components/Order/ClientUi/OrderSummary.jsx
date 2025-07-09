import React from "react";

export default function OrderSummary({ cart, subtotal, deliveryFee, total }) {
  const tax = (subtotal * 0.07).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 mt-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        {cart.cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-100 pb-3"
          >
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden mr-3">
                {item.foodImageUrl && (
                  <img
                    src={item.foodImageUrl}
                    alt={item.foodName}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div>
                <p className="font-medium">{item.foodName}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium">${item.price}</p>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>${tax}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
}
