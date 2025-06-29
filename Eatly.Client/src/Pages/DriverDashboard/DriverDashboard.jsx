import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useFetchOrderById } from "../../Queries/Order/useFetchOrderById";
import { Package } from "lucide-react";
import { toast } from "sonner";

const MAPBOX_TOKEN =
  import.meta.env.VITE_APP_MAPBOX_TOKEN || "your_mapbox_token_here";

import OrderSummary from "./../../components/DriverDashboard/OrderSummary";
import CustomerDetails from "./../../components/DriverDashboard/CustomerDetails";
import DeliveryMap from "../../components/DriverDashboard/DeliveryMap";
import OrderItems from "./../../components/DriverDashboard/OrderItems";
import { useUpdateOrderStatus } from "../../Queries/Order/useUpdateOrderStatus";

export default function DriverDashboard() {
  const [orderId, setOrderId] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [unsubscribeCallbacks, setUnsubscribeCallbacks] = useState([]);
  const {
    data: orderData,
    isLoading: isOrderLoading,
    error: orderError,
    refetch: refetchOrder,
  } = useFetchOrderById(orderId);
  const { mutate: updateOrderStatus, isPending: isUpdating } =
    useUpdateOrderStatus();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentDriverId = user.uid;
        setDriverId(currentDriverId);
        listenForAssignedOrder(currentDriverId, (orderId) => {
          console.log(`New order assigned: ${orderId}`);

          const db = getDatabase();
          const orderRef = ref(db, `orders/${orderId}`);
          const orderUnsubscribe = onValue(orderRef, (snapshot) => {
            const orderData = snapshot.val();
            if (orderData) {
              console.log(`Order details:`, orderData);
              setOrderId(orderId);
            }
          });

          // Store unsubscribe callback
          setUnsubscribeCallbacks((prev) => [...prev, orderUnsubscribe]);
        });
      } else {
        console.warn("Driver not logged in");
      }
    });

    // Cleanup on unmount
    return () => {
      unsubscribeCallbacks.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  const listenForAssignedOrder = (driverId, callBack) => {
    console.log(`Listening for assigned orders for driver: ${driverId}`);
    const db = getDatabase();
    const orderRef = ref(db, `drivers/${driverId}/currentOrder`);

    const unsubscribe = onValue(orderRef, (snapshot) => {
      const orderId = snapshot.val();
      if (orderId) {
        callBack(orderId);
      }
    });

    // Store the unsubscribe callback
    setUnsubscribeCallbacks((prev) => [...prev, unsubscribe]);
  };

  const cleanupCompletedOrder = async (orderId, driverId) => {
    try {
      const db = getDatabase();

      // Remove order from driver's current order
      await remove(ref(db, `drivers/${driverId}/currentOrder`));

      // Remove driver assignment from order
      await remove(ref(db, `orders/${orderId}/driverId`));

      console.log(`Cleaned up completed order: ${orderId}`);
    } catch (error) {
      console.error("Error cleaning up completed order:", error);
    }
  };

  const handleMarkAsDelivered = () => {
    if (!orderData || !orderData.id) {
      toast.error("No order data available to mark as delivered.");
      return;
    }

    updateOrderStatus(
      {
        id: orderData.id,
        status: 5, // Completed status
      },
      {
        onSuccess: async () => {
          toast.success(`Order #${orderData.id} marked as completed`);

          // Clean up Firebase references
          if (driverId) {
            await cleanupCompletedOrder(orderData.id, driverId);
          }

          // Clean up local state
          setOrderId(null);

          // Unsubscribe from listeners
          unsubscribeCallbacks.forEach((unsubscribe) => unsubscribe());
          setUnsubscribeCallbacks([]);

          toast.success(
            "Order completed successfully. Ready for new assignments!"
          );
        },
        onError: (error) => {
          toast.error("Failed to update order status");
          console.error("Error updating order status:", error);
        },
      }
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple">Driver Dashboard</h1>

      {isOrderLoading && (
        <div className="w-full flex justify-center py-20">
          <div className="loading loading-spinner loading-lg text-purple"></div>
        </div>
      )}

      {orderError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          Error loading order: {orderError.message}
        </div>
      )}

      {!isOrderLoading && !orderData && !orderId && (
        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <Package size={48} className="mx-auto mb-4 text-blue-500" />
          <h2 className="text-2xl font-medium text-blue-800 mb-2">
            No Active Deliveries
          </h2>
          <p className="text-blue-600">
            You don't have any assigned orders right now. New orders will appear
            here automatically.
          </p>
        </div>
      )}

      {orderData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <OrderSummary
              orderData={orderData}
              onMarkDelivered={handleMarkAsDelivered}
              updatingStatus={isUpdating}
            />
            <CustomerDetails orderData={orderData} />
          </div>
          <div className="lg:col-span-2">
            <DeliveryMap orderData={orderData} mapboxToken={MAPBOX_TOKEN} />
            <OrderItems orderData={orderData} />
          </div>
        </div>
      )}
    </div>
  );
}
