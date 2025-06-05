import React, { useState } from "react";
import OrderTableRow from "../../../components/Table/OrderTableRow";
import { useFetchAllOrders } from "../../../Queries/Order/useFetchAllOrders";
import { useFetchStatusTypes } from "../../../Queries/Order/useFetchStatusTypes";
import { toast } from "sonner";

export default function RestaurantsOrders() {
  const { data: orders, isLoading, isError } = useFetchAllOrders();
  const { data: statusTypes, isLoading: isStatusTypesLoading } =
    useFetchStatusTypes();
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("All");

  // Filter orders based on selected status
  const filteredOrders = orders?.filter((order) => {
    const matchesOrderStatus =
      orderStatusFilter === "All" || order.orderStatus === orderStatusFilter;
    const matchesPaymentStatus =
      paymentStatusFilter === "All" ||
      order.paymentStatus === paymentStatusFilter;
    return matchesOrderStatus && matchesPaymentStatus;
  });

  // Order status options
  const orderStatusOptions = [
    { value: "All", label: "All Order Statuses" },
    { value: "Pending", label: "Pending" },
    { value: "InPreparation", label: "In Preparation" },
    { value: "ReadyForPickup", label: "Ready for Pickup" },
    { value: "OutForDelivery", label: "Out for Delivery" },
    { value: "Delivered", label: "Delivered" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  // Payment status options
  const paymentStatusOptions = [
    { value: "All", label: "All Payment Statuses" },
    { value: "Unpaid", label: "Unpaid" },
    { value: "AwaitingPayment", label: "Awaiting Payment" },
    { value: "Processing", label: "Processing" },
    { value: "Paid", label: "Paid" },
    { value: "Failed", label: "Failed" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Refunded", label: "Refunded" },
  ];

  return (
    <div className="py-10 px-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Customer Orders
        </h1>
        <div className="flex gap-2">
          <select
            className="select select-bordered"
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
          >
            {orderStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered"
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
          >
            {paymentStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="input input-bordered"
            placeholder="Date filter"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : isError ? (
        <div className="alert alert-error">
          <span>Error loading orders. Please try again.</span>
        </div>
      ) : filteredOrders && filteredOrders.length > 0 ? (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <OrderTableRow
                  key={order.id}
                  order={order}
                  statusTypes={statusTypes}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-10 text-center shadow-md">
          <p className="text-gray-500 text-lg">
            {orderStatusFilter !== "All" || paymentStatusFilter !== "All"
              ? "No orders match the selected filters."
              : "No orders found."}
          </p>
        </div>
      )}
    </div>
  );
}
