import React from "react";
import { useFetchOrderById } from "../../Queries/Order/useFetchOrderById";
import { useParams, Link } from "react-router-dom";
import OrderItemsTable from "../../components/Table/OrderItemsTable";
import OrderCard from "../../components/OrderCard";
import DeliveryMap from "../../components/DriverDashboard/DeliveryMap";
import UserDeliveryMap from "../../components/UserDashboard/UserDeliveryMap";
import { ChevronLeft, Package, ShoppingBag, Clock, MapPin } from "lucide-react";
import { formatDate } from "../../utils/dateFormatter";
import {
  orderStatusColors,
  paymentStatusColors,
} from "../../constants/statuses";

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
                      orderStatusColors[order.orderStatus]
                    }`}
                  >
                    {order.orderStatus}
                  </span>
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

            {/* Order summary section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <ShoppingBag size={18} className="mr-2 text-purple" />
                Order Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    DELIVERY DETAILS
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{order.streetAddress}</p>
                    <p className="text-gray-600">
                      {order.deliveryAddress?.street}
                    </p>
                    <p className="text-gray-600">
                      {order.city}, {order.state} {order.zipCode}
                    </p>
                    <p className="text-gray-600 mt-2">
                      {order.deliveryAddress?.phoneNumber}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    PAYMENT INFORMATION
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">
                      <span className="font-medium">Subtotal:</span> $
                      {order.subtotal?.toFixed(2)}
                    </p>
                    <p className="text-gray-800">
                      <span className="font-medium">Delivery Fee:</span> $
                      {order.deliveryFee?.toFixed(2)}
                    </p>
                    {order.discount > 0 && (
                      <p className="text-green-600">
                        <span className="font-medium">Discount:</span> -$
                        {order.discount?.toFixed(2)}
                      </p>
                    )}
                    <div className="border-t border-gray-200 my-2 pt-2">
                      <p className="text-gray-900 font-semibold">
                        <span>Total:</span> ${order.totalPrice?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order items section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Package size={18} className="mr-2 text-purple" />
                Order Items
              </h2>
              <div className="space-y-6">
                {order.items.map((item) => (
                  <OrderCard {...item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
