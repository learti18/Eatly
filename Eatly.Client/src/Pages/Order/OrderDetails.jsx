import React from "react";
import { useFetchOrderById } from "../../Queries/Order/useFetchOrderById";
import { useParams, Link } from "react-router-dom";

import UserDeliveryMap from "../../components/UserDashboard/UserDeliveryMap";
import { ChevronLeft, Package, ShoppingBag, Clock, MapPin } from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import { paymentStatusColors } from "../../constants/statuses";

const MAPBOX_TOKEN =
  import.meta.env.VITE_APP_MAPBOX_TOKEN || "your_mapbox_token_here";

export default function OrderDetails() {
  const { id } = useParams();
  const { data: order, isLoading, error } = useFetchOrderById(id);

  // Determine if we should show the delivery map (when order is out for delivery)
  const shouldShowDeliveryMap = order?.orderStatus === "OutForDelivery";

  return (
    <div className="bg-background-main min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            Error fetching order details. Please try again later.
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <Link
                to="/orders"
                className="flex items-center text-gray-600 hover:text-purple mb-4"
              >
                <ChevronLeft size={20} />
                <span>Back to Orders</span>
              </Link>

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Order #{order.id}
                  </h1>
                  <p className="text-gray-500 mt-1">
                    Placed on {formatDate(order.orderDate)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      paymentStatusColors[order.paymentStatus]
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Show delivery map if order is out for delivery */}
            {shouldShowDeliveryMap && order.driverId && (
              <UserDeliveryMap orderData={order} mapboxToken={MAPBOX_TOKEN} />
            )}

            {/* Order items section */}
            <div className="max-w-3xl mx-auto my-20">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Package size={18} className="mr-2 text-purple" />
                Order Items
              </h2>
              <div className="space-y-5">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-xl"
                  >
                    <div className="flex space-x-4">
                      <img
                        src={item.foodImageUrl}
                        alt={item.foodName}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.foodName}
                        </h3>
                        <p className="text-sm text-gray-600">{item.price}$</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div className="text-right">
                        <p className="text-gray-800 font-semibold">
                          ${item.price.toFixed(2) * item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="my-5">
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
        )}
      </div>
      <p className="text-xs text-gray-500 mt-10">
        ©{" "}
        <a href="https://www.mapbox.com/about/maps/" target="_blank">
          Mapbox
        </a>
        ©{" "}
        <a href="https://www.openstreetmap.org/about/" target="_blank">
          OpenStreetMap
        </a>
      </p>
    </div>
  );
}
