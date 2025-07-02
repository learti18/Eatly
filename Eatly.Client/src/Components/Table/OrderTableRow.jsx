import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { formatCurrency } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";
import { Eye, ShoppingBag, CreditCard } from "lucide-react";
import { useDrivers } from "../../Queries/Drivers/useDrivers";
import { useAssignDriver } from "../../Queries/Order/useAssignDriver";
import { toast } from "sonner";
import OrderDetailsModal from "../Order/RestaurantDashboardUi/OrderDetailsModal";
import { getDatabase, ref, set } from "firebase/database";

export default function OrderTableRow({ order, statusTypes }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: drivers = [], isLoading: isLoadingDrivers } = useDrivers();
  const { mutate: assignDriver } = useAssignDriver();

  const orderStatusColors = {
    Pending: "bg-gray-100 text-gray-800",
    InPreparation: "bg-yellow-100 text-yellow-800",
    ReadyForPickup: "bg-blue-100 text-blue-800",
    OutForDelivery: "bg-purple-100 text-purple-800",
    Delivered: "bg-indigo-100 text-indigo-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  const paymentStatusColors = {
    Unpaid: "bg-red-100 text-red-800",
    AwaitingPayment: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Paid: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
    Cancelled: "bg-gray-100 text-gray-800",
    Refunded: "bg-orange-100 text-orange-800",
  };

  const handleAssignDriver = (driverId) => {
    assignDriver(
      { orderId: order.id, driverId },
      {
        onSuccess: () => {
          toast.success(`Driver assigned to order #${order.id}`);
        },
        onError: (error) => {
          toast.error("Failed to assign driver");
          console.error("Error assigning driver:", error);
        },
      }
    );
    assignDriverOnRealTime(order.id, driverId);
  };
  const assignDriverOnRealTime = (orderId, driverId) => {
    const db = getDatabase();
    set(ref(db, `orders/${orderId}/driverId`), driverId);

    set(ref(db, `drivers/${driverId}/currentOrder`), orderId);
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">#{order.id}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {formatDate(order.orderDate)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div
            className="text-xs text-gray-500 truncate max-w-[150px]"
            title={order.userId}
          >
            ID: {order.userId.substring(0, 8)}...
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="bg-purple/10 text-purple rounded-full w-7 h-7 flex items-center justify-center font-medium">
            {order.items.length}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            ${formatCurrency(order.totalPrice)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <ShoppingBag size={12} className="text-gray-400" />
              <span>Order:</span>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  orderStatusColors[order.orderStatus]
                }`}
              >
                {order.orderStatus}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <CreditCard size={12} className="text-gray-400" />
              <span>Payment:</span>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  paymentStatusColors[order.paymentStatus]
                }`}
              >
                {order.paymentStatus}
              </span>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-1 px-3 py-1.5 bg-purple-50 text-purple hover:bg-purple-light rounded-md text-sm font-medium transition-colors mx-auto"
          >
            <Eye size={14} />
            <span>Details</span>
          </button>
        </td>
      </tr>

      {isModalOpen &&
        ReactDOM.createPortal(
          <OrderDetailsModal
            order={order}
            onClose={() => setIsModalOpen(false)}
            statusColors={orderStatusColors}
            paymentStatusColors={paymentStatusColors}
            availableDrivers={drivers.filter((d) => d.isAvailable)}
            onAssignDriver={handleAssignDriver}
            isOrderConfirmed={
              order.orderStatus !== "Pending" &&
              order.orderStatus !== "Cancelled"
            }
            statusTypes={statusTypes}
          />,
          document.body
        )}
    </>
  );
}
