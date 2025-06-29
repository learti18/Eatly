import React, { useState } from "react";
import { Filter, Package, X, ChevronDown } from "lucide-react";
import OrderTableRow from "../../../components/Table/OrderTableRow";
import { useFetchAllOrders } from "../../../Queries/Order/useFetchAllOrders";
import { useFetchStatusTypes } from "../../../Queries/Order/useFetchStatusTypes";
import useOrderFiltering from "../../../Hooks/useOrderFiltering";
import Pagination from "../../../components/Shared/Pagination";
import {
  orderStatusOptions,
  paymentStatusOptions,
} from "../../../constants/statuses";

export default function RestaurantsOrders() {
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    orderStatusFilter,
    setOrderStatusFilter: handleOrderStatusChange,
    paymentStatusFilter,
    setPaymentStatusFilter: handlePaymentStatusChange,
    showFilters,
    setShowFilters,
    resetFilters,
    removeOrderStatusFilter,
    removePaymentStatusFilter,
    handlePageSizeChange,
    searchParams,
    updateUrlParams,
  } = useOrderFiltering();

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      updateUrlParams({
        page,
        orderStatus: orderStatusFilter,
        paymentStatus: paymentStatusFilter,
        pageSize,
      });
    }
  };

  const {
    data: orderData,
    isLoading,
    isError,
  } = useFetchAllOrders({
    pageNumber: currentPage,
    pageSize,
    orderStatus: orderStatusFilter !== "All" ? orderStatusFilter : undefined,
    paymentStatus:
      paymentStatusFilter !== "All" ? paymentStatusFilter : undefined,
  });

  const { data: statusTypes, isLoading: isStatusTypesLoading } =
    useFetchStatusTypes();

  const orders = orderData?.items || [];
  const totalOrders = orderData?.totalCount || 0;
  const totalPages = orderData?.totalPages || 1;

  const hasActiveFilters =
    orderStatusFilter !== "All" || paymentStatusFilter !== "All";

  return (
    <div className="bg-background-main">
      <div className="py-8 px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Customer Orders
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and track all customer orders
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasActiveFilters
                ? "bg-purple text-white hover:bg-purple-dark"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {hasActiveFilters ? (
              <>
                <Filter size={16} className="animate-pulse" />
                <span>Filters Active</span>
              </>
            ) : (
              <>
                <Filter size={16} />
                <span>Filter</span>
              </>
            )}
          </button>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Status
                </label>
                <div className="relative">
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => handleOrderStatusChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                  >
                    {orderStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex-1 min-w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Status
                </label>
                <div className="relative">
                  <select
                    value={paymentStatusFilter}
                    onChange={(e) => handlePaymentStatusChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white"
                  >
                    {paymentStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Active filter indicators */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {orderStatusFilter !== "All" && (
              <div className="inline-flex items-center bg-purple-light text-purple-dark rounded-full px-3 py-1 text-sm">
                <span>Status: {orderStatusFilter}</span>
                <button
                  onClick={removeOrderStatusFilter}
                  className="ml-2 hover:text-purple-darker"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {paymentStatusFilter !== "All" && (
              <div className="inline-flex items-center bg-purple-light text-purple-dark rounded-full px-3 py-1 text-sm">
                <span>Payment: {paymentStatusFilter}</span>
                <button
                  onClick={removePaymentStatusFilter}
                  className="ml-2 hover:text-purple-darker"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Orders Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple"></div>
          </div>
        ) : isError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl text-center">
            <p className="font-medium">Error loading orders</p>
            <p className="text-sm mt-1">Please try again later.</p>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="px-10 py-4 text-left text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {orders.map((order) => (
                      <OrderTableRow
                        key={order.id}
                        order={order}
                        statusTypes={statusTypes}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalOrders}
              pageSize={pageSize}
              onPageChange={goToPage}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <Package size={48} className="text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                No Orders Found
              </h2>
              <p className="text-gray-600 max-w-md">
                {hasActiveFilters
                  ? "No orders match your current filters. Try adjusting your filters to see more results."
                  : "No customer orders found. Orders will appear here once customers start placing them."}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="mt-4 px-4 py-2 bg-purple text-white rounded-lg hover:bg-purple-dark transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
