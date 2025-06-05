import React from "react";
import { ShoppingBag, CreditCard, AlertCircle } from "lucide-react";
import { useUpdateOrderStatus } from "../../../Queries/Order/useUpdateOrderStatus";
import { toast } from "sonner";

// Order status workflow definition
const orderStatusWorkflow = [
  {
    id: 0,
    value: "Pending",
    label: "Pending",
    color: "bg-gray-100 text-gray-800",
    icon: "⏳",
  },
  {
    id: 1,
    value: "InPreparation",
    label: "In Preparation",
    color: "bg-yellow-100 text-yellow-800",
    icon: "🍳",
  },
  {
    id: 2,
    value: "ReadyForPickup",
    label: "Ready for Pickup",
    color: "bg-blue-100 text-blue-800",
    icon: "📦",
  },
  {
    id: 3,
    value: "OutForDelivery",
    label: "Out for Delivery",
    color: "bg-purple-100 text-purple-800",
    icon: "🚚",
  },
  {
    id: 4,
    value: "Delivered",
    label: "Delivered",
    color: "bg-indigo-100 text-indigo-800",
    icon: "🏠",
  },
  {
    id: 5,
    value: "Completed",
    label: "Completed",
    color: "bg-green-100 text-green-800",
    icon: "✅",
  },
];

// Cancelled status (separate as it can happen at any time)
const cancelledStatus = {
  id: 6,
  value: "Cancelled",
  label: "Cancelled",
  color: "bg-red-100 text-red-800",
  icon: "❌",
};

export default function OrderStatusManager({ 
  order, 
  statusColors, 
  paymentStatusColors, 
  isPaid, 
  onShowCancelConfirm 
}) {
  const { mutate: updateStatus, isLoading: isUpdating } = useUpdateOrderStatus();
  
  // Find current status index in workflow
  const currentStatusIndex = orderStatusWorkflow.findIndex(
    (s) => s.value === order.orderStatus
  );

  // Determine next possible status
  const nextStatus =
    order.orderStatus !== "Cancelled" &&
    currentStatusIndex < orderStatusWorkflow.length - 1
      ? orderStatusWorkflow[currentStatusIndex + 1]
      : null;

  const handleStatusUpdate = (newStatusId) => {
    if (!isPaid) return;

    updateStatus(
      {
        id: order.id,
        status: newStatusId,
      },
      {
        onSuccess: () => {
          const newStatus =
            orderStatusWorkflow.find((s) => s.id === newStatusId) ||
            cancelledStatus;
          toast.success(
            `Order #${order.id} status updated to ${newStatus.label}`
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
    <div className="p-6 border-b bg-gray-50">
      <div className="flex flex-wrap gap-6 justify-between">
        {/* Payment Status Badge */}
        <div className="flex items-center">
          <CreditCard size={16} className="text-gray-500 mr-2" />
          <div className="text-sm font-medium text-gray-700 mr-3">
            Payment Status:
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              paymentStatusColors[order.paymentStatus]
            }`}
          >
            {order.paymentStatus}
          </span>
        </div>

        {/* Order Status with progress indicators */}
        <div className="w-full mt-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag size={16} className="text-gray-500" />
            <div className="text-sm font-medium text-gray-700">
              Order Status:
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                order.orderStatus === "Cancelled"
                  ? cancelledStatus.color
                  : statusColors[order.orderStatus]
              }`}
            >
              {order.orderStatus}
            </span>
          </div>

          {/* Status progression visualization */}
          <div className="flex flex-wrap gap-2 mt-3 items-center">
            {orderStatusWorkflow.map((status, index) => (
              <React.Fragment key={status.id}>
                {/* Status step */}
                <div
                  className={`flex items-center ${
                    currentStatusIndex === index
                      ? "border-2 border-purple"
                      : currentStatusIndex > index
                      ? "opacity-70"
                      : "opacity-40"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded ${status.color} flex items-center gap-2 ${
                      currentStatusIndex < index && !isPaid
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                    title={status.label}
                  >
                    <span>{status.icon}</span>
                    <span>{status.label}</span>
                  </div>
                </div>

                {/* Connector between steps */}
                {index < orderStatusWorkflow.length - 1 && (
                  <div className="h-[2px] w-4 bg-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next status action button */}
          {nextStatus &&
            isPaid &&
            order.orderStatus !== "Cancelled" &&
            order.orderStatus !== "Completed" && (
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleStatusUpdate(nextStatus.id)}
                  disabled={isUpdating || !isPaid}
                  className={`px-4 py-2 bg-purple text-white rounded-lg font-medium flex items-center gap-2 ${
                    isUpdating
                      ? "opacity-70 cursor-wait"
                      : "hover:bg-purple-dark"
                  }`}
                >
                  {isUpdating ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <>
                      <span>Update to {nextStatus.label}</span>
                      <span>{nextStatus.icon}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onShowCancelConfirm}
                  disabled={isUpdating || !isPaid}
                  className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium"
                >
                  Cancel Order ❌
                </button>
              </div>
            )}

          {/* Payment warning message */}
          {!isPaid && (
            <div className="mt-3 flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded-md text-xs">
              <AlertCircle size={14} />
              <span>
                Order status can only be updated after payment is confirmed
              </span>
            </div>
          )}

          {/* Final state message */}
          {(order.orderStatus === "Completed" || order.orderStatus === "Cancelled") && (
            <div
              className={`mt-3 flex items-center gap-2 p-2 rounded-md text-xs ${
                order.orderStatus === "Completed"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              <span>
                This order is in a final state and cannot be modified.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
