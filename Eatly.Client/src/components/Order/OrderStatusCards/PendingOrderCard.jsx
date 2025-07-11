import React from "react";
import { Clock, ShoppingBag, MapPin, Package } from "lucide-react";

export default function PendingOrderCard({ order }) {
  return (
    <div className="mb-20">
      {/* Status Section */}
      <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100 mb-5">
        <img
          src="/Map.png"
          alt="a map background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        ></div>
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center z-10">
          <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-full mb-6 shadow-lg">
            <Package size={36} className="text-gray-800" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
            Order is being processed
          </h3>
          <p className="text-white mb-8 leading-relaxed max-w-lg text-base md:text-lg drop-shadow-md">
            Once the order goes through, we will start preparing it. You'll see
            real-time tracking once a driver is assigned.
          </p>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="drop-shadow-2xl bg-white mx-auto w-full rounded-2xl max-w-md">
        <div className="bg-text-dark w-full text-white font-light px-8 py-4 rounded-t-3xl">
          <h2 className="flex items-center gap-2">
            <Clock size={18} />
            Order Details
          </h2>
        </div>
        <div className="px-4 py-8">
          <div className="flex items-center justify-start w-full gap-6">
            <div className="flex flex-col">
              <img
                src="/icons/Locatin.svg"
                alt="Location Icon"
                className="size-10"
              />
              <div className="h-16 flex flex-col items-center justify-center">
                <div className="w-1 h-1.5 bg-purple rounded-full my-0.5"></div>
                <div className="w-1 h-1.5 bg-purple rounded-full my-0.5"></div>
                <div className="w-1 h-1.5 bg-purple rounded-full my-0.5"></div>
                <div className="w-1 h-1.5 bg-purple rounded-full my-0.5"></div>
                <div className="w-1 h-1.5 bg-purple rounded-full my-0.5"></div>
                <div className="w-1 h-1.5 bg-purple rounded-full my-0.5"></div>
                <div className="w-1 h-1.5 bg-purple rounded-full my-0.5"></div>
              </div>
              <img src="/icons/Time.svg" alt="Time Icon" className="size-10" />
            </div>
            <div className="flex flex-col gap-7 text-xs md:text-sm">
              <div>
                <p className="text-gray-400">Your Address</p>
                <p>{order.streetAddress}</p>
                <p>
                  {order.city}, {order.state} {order.zipCode}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Order Status</p>
                <p className="text-gray-800">Processing your order</p>
                <p className="text-gray-800">
                  We'll notify you when it's ready
                </p>
              </div>
            </div>
            <p className="bg-purple text-white text-sm px-5 py-3 rounded-md self-end ml-auto">
              {order.orderStatus}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between bg-white p-4"
            >
              <div className="flex space-x-4">
                <img
                  src={item.foodImageUrl}
                  alt={item.foodName}
                  className="w-20 h-20 rounded-full object-contain"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.foodName}
                  </h3>
                  <p className="text-sm text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="p-5 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  Total Amount
                </h3>
                <p className="text-sm text-gray-600">
                  {order.items.length} items
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-gray-800">
                  ${order.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
