import React, { useState } from "react";
import OrderTableRow from "../../../components/Table/OrderTableRow";
import { useFetchAllOrders } from "../../../Queries/Order/useFetchAllOrders";
import { useFetchStatusTypes } from "../../../Queries/Order/useFetchStatusTypes";

export default function RestaurantsOrders() {
  const { data: orders, isLoading, isError } = useFetchAllOrders();
  const { data: statusTypes, isLoading: isStatusTypesLoading } =
    useFetchStatusTypes();
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleToggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Filter orders based on selected status
  const filteredOrders =
    statusFilter === "All"
      ? orders
      : orders?.filter((order) => order.status === statusFilter);

  return (
    <div className="py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Customer Orders
        </h1>
        <div className="flex gap-2">
          <select
            className="select select-bordered w-full max-w-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Orders</option>
            {!isStatusTypesLoading &&
              statusTypes?.map((type) => (
                <option key={type.value} value={type.label}>
                  {type.label}
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
                  isExpanded={order.id === expandedOrderId}
                  onToggleExpand={handleToggleExpand}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-10 text-center shadow-md">
          <p className="text-gray-500 text-lg">
            {statusFilter !== "All"
              ? `No orders with status "${statusFilter}" found.`
              : "No orders found."}
          </p>
        </div>
      )}
    </div>
  );
}
