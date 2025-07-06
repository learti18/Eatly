import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import UserDeliveryMap from "../../components/UserDashboard/UserDeliveryMap";
import { ChevronLeft, UtensilsCrossed } from "lucide-react";
import { formatDate } from "../../Utils/dateFormatter";
import { useFetchUserOrderById } from "../../Queries/Order/useFetchUserOrderById";
import PendingOrderCard from "../../components/Order/OrderStatusCards/PendingOrderCard";
import InPreparationOrderCard from "../../components/Order/OrderStatusCards/InPreparationOrderCard";
import ReadyForPickupOrderCard from "../../components/Order/OrderStatusCards/ReadyForPickupOrderCard";
import CanceledOrderCard from "../../components/Order/OrderStatusCards/CanceledOrderCard";
import CompletedOrderCard from "../../components/Order/OrderStatusCards/CompletedOrderCard";

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
  const shouldShowInPreparation = order?.orderStatus === "InPreparation";
  const shouldShowCanceled = order?.orderStatus === "Canceled";
  const shouldShowReadyForPickup = order?.orderStatus === "ReadyForPickup";

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

            {/* Show different status cards based on order status */}
            {shouldShowWaitingForDriver && <PendingOrderCard order={order} />}
            {shouldShowInPreparation && (
              <InPreparationOrderCard order={order} />
            )}
            {shouldShowReadyForPickup && (
              <ReadyForPickupOrderCard order={order} />
            )}
            {shouldShowCanceled && <CanceledOrderCard order={order} />}
            {shouldShowCompletedState && <CompletedOrderCard order={order} />}

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
                    className="flex flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-200"
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
