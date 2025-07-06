import React, { useState } from "react";
import { formatCurrency } from "../../../utils/currencyFormatter";
import { formatDate } from "../../../utils/dateFormatter";
import { XCircle, Package } from "lucide-react";
import OrderStatusManager from "./OrderStatusManager";
import DriverAssignment from "./DriverAssignment";
import CustomerInformation from "./CustomerInformation";
import OrderItemsTable from "../../Table/OrderItemsTable";
import CancelConfirmDialog from "./CancelConfirmDialog";

export default function OrderDetailsModal({
  order,
  onClose,
  statusColors,
  paymentStatusColors,
  availableDrivers = [],
  onAssignDriver,
  isOrderConfirmed = false,
}) {
  const isPaid = order.paymentStatus === "Paid";
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Check if order is in a state where driver assignment is relevant
  const canAssignDriver =
    isPaid &&
    isOrderConfirmed &&
    order.orderStatus !== "Delivered" &&
    order.orderStatus !== "Completed" &&
    order.orderStatus !== "Cancelled";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Modal header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-purple/10 p-3 rounded-lg">
              <Package size={24} className="text-purple" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Order #{order.id}
              </h2>
              <p className="text-sm text-gray-500">
                Placed on {formatDate(order.orderDate)}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full hover:bg-gray-100 p-1 transition-colors"
          >
            <XCircle size={24} className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Order Status Management Section */}
        <OrderStatusManager
          order={order}
          statusColors={statusColors}
          paymentStatusColors={paymentStatusColors}
          isPaid={isPaid}
          onShowCancelConfirm={() => setShowCancelConfirm(true)}
        />

        {/* Driver Assignment Section */}
        <DriverAssignment
          order={order}
          canAssignDriver={canAssignDriver}
          isPaid={isPaid}
          isOrderConfirmed={isOrderConfirmed}
          availableDrivers={availableDrivers}
          onAssignDriver={onAssignDriver}
        />

        {/* Customer Information Section */}
        <CustomerInformation order={order} />

        {/* Order Items Table */}
        <OrderItemsTable order={order} />

        {/* Cancel Confirmation Dialog */}
        {showCancelConfirm && (
          <CancelConfirmDialog
            order={order}
            onClose={() => setShowCancelConfirm(false)}
          />
        )}
      </div>
    </div>
  );
}
