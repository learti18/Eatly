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
            {/* Clean Header */}
            <div className="mb-8">
              {/* Back Button */}
              <Link
                to={backToOrdersUrl}
                className="inline-flex items-center text-gray-600 hover:text-purple mb-6 transition-colors"
              >
                <ChevronLeft size={20} />
                <span>Back to Orders</span>
              </Link>

              {/* Simple Order Info */}
              <div className="">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Order #{order.id}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                      {formatDate(order.orderDate)}
                    </p>
                  </div>

                  {order.restaurantName && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Restaurant</p>
                      <p className="text-xl md:text-3xl font-semibold text-gray-900">
                        {order.restaurantName}
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
          </div>
        )}
      </div>
      {/* <p className="text-xs text-gray-500 mt-10">
        ©{" "}
        <a href="https://www.mapbox.com/about/maps/" target="_blank">
          Mapbox
        </a>
        ©{" "}
        <a href="https://www.openstreetmap.org/about/" target="_blank">
          OpenStreetMap
        </a>
      </p> */}
    </div>
  );
}
