import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import UserDeliveryMap from "../../components/UserDashboard/UserDeliveryMap";
import {
  ChevronLeft,
  Package,
  ShoppingBag,
  Clock,
  MapPin,
  Home,
  UtensilsCrossed,
  Check,
} from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import { paymentStatusColors } from "../../constants/statuses";
import { useFetchUserOrderById } from "../../Queries/Order/useFetchUserOrderById";

const MAPBOX_TOKEN =
  import.meta.env.VITE_APP_MAPBOX_TOKEN || "your_mapbox_token_here";

export default function OrderDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { data: order, isLoading, error } = useFetchUserOrderById(id);

  const backToOrdersUrl = location.state?.returnTo || "/orders";

  const shouldShowDeliveryMap =
    order?.orderStatus === "OutForDelivery" && order.driverId;
  const shouldShowWaitingForDriver =
    order?.orderStatus === "Pending" && !order.driverId;
  const shouldShowCompletedState =
    order?.orderStatus === "Completed" || order?.orderStatus === "Delivered";

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
              <div className="flex items-start justify-between gap-4 mb-6">
                <Link
                  to={backToOrdersUrl}
                  className="flex items-center text-gray-600 hover:text-purple"
                >
                  <ChevronLeft size={20} />
                  <span>Back to Orders</span>
                </Link>

                <div className="text-right">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Order #{order.id}
                  </h1>
                  <p className="text-gray-500 mt-1">
                    {formatDate(order.orderDate)}
                  </p>
                </div>
              </div>
              {order.restaurantName && (
                <div className="flex items-center gap-3 mt-8 pl-2">
                  <div className="bg-purple text-white rounded-lg p-3">
                    <UtensilsCrossed />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Restaurant
                    </p>
                    <h2 className="text-xl font-bold text-gray-800">
                      {order.restaurantName}
                    </h2>
                  </div>
                </div>
              )}
            </div>

            {/* Show waiting for driver state */}
            {shouldShowWaitingForDriver && (
              <div className="mb-8 max-w-md mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <div className="bg-purple-lighter text-white px-6 py-4 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 font-semibold text-white">
                      <Clock size={18} />
                      Waiting for Delivery Driver
                    </h2>
                    <span className="bg-white text-purple-darker px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-purple-lighter p-4 rounded-full mb-4">
                        <ShoppingBag size={32} className="text-purple-darker" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Please wait while we prepare your order
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Once the order is ready, we will assign a delivery
                        driver. You'll see real-time tracking once a driver is
                        assigned.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 w-full">
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                          <MapPin size={16} className="text-purple" />
                          <span className="font-medium">Delivering to:</span>
                        </div>
                        <div className="text-sm text-gray-800 ml-6">
                          <p>{order.streetAddress}</p>
                          {order.city && order.state && (
                            <p>
                              {order.city}, {order.state} {order.zipCode}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Show completed/delivered state */}
            {shouldShowCompletedState && (
              <div className="mb-8 max-w-md mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 font-semibold text-white">
                      <Package size={18} />
                      Order {order.orderStatus}
                    </h2>
                    <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-green-50 border-2 border-green-200 p-4 rounded-full mb-4">
                        <Check className="text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {order.orderStatus === "Completed"
                          ? "Your order has been completed!"
                          : "Your order has been delivered!"}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Thank you for choosing us! We hope you enjoyed your
                        meal. Don't forget to rate your experience.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4 w-full">
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
                          <MapPin size={16} className="text-green-600" />
                          <span className="font-medium">Delivered to:</span>
                        </div>
                        <div className="text-sm text-gray-800 ml-6">
                          <p>{order.streetAddress}</p>
                          {order.city && order.state && (
                            <p>
                              {order.city}, {order.state} {order.zipCode}
                            </p>
                          )}
                        </div>
                        {order.deliveredAt && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <Clock size={16} className="text-green-600" />
                              <span className="font-medium">Delivered on:</span>
                              <span>{formatDate(order.deliveredAt)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Show delivery map if order is out for delivery */}
            {shouldShowDeliveryMap && (
              <UserDeliveryMap orderData={order} mapboxToken={MAPBOX_TOKEN} />
            )}

            {/* Order items section */}
            <div className="max-w-3xl mx-auto my-20">
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
