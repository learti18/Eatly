import React from "react";
import { AlertTriangle } from "lucide-react";
import { useUpdateOrderStatus } from "../../../Queries/Order/useUpdateOrderStatus";
import { toast } from "sonner";

export default function CancelConfirmDialog({ order, onClose }) {
  const { mutate: updateStatus, isLoading: isUpdating } =
    useUpdateOrderStatus();

  const handleCancel = () => {
    updateStatus(
      {
        id: order.id,
        status: 6, // Cancelled status ID
      },
      {
        onSuccess: () => {
          toast.success(`Order #${order.id} has been cancelled`);
          onClose();
        },
        onError: (error) => {
          toast.error("Failed to cancel order");
          console.error("Error cancelling order:", error);
        },
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-20"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center gap-3 mb-4 text-red-600">
          <AlertTriangle size={24} />
          <h3 className="text-lg font-bold">Confirm Cancellation</h3>
        </div>

        <p className="mb-6 text-gray-600">
          Are you sure you want to cancel this order? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
          >
            No, Keep Order
          </button>
          <button
            onClick={handleCancel}
            disabled={isUpdating}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center gap-2"
          >
            {isUpdating ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Yes, Cancel Order"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
