import React, { useState } from "react";
import { Filter, Package } from "lucide-react";
import { useFetchAllOrders } from "../../Queries/Order/useFetchAllOrders";
import useOrderFiltering from "../../Hooks/useOrderFiltering";
import Pagination from "../../components/Shared/Pagination";
import OrdersTable from "../../components/Table/OrdersTable";
import OrderFilters from "../../components/Orders/OrderFilters";
import OrderDetailsModal from "../../components/Modals/OrderDetailsModal";

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const orders = orderData?.items || [];
  const totalOrders = orderData?.totalCount || 0;
  const totalPages = orderData?.totalPages || 1;

  const hasActiveFilters =
    orderStatusFilter !== "All" || paymentStatusFilter !== "All";

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>
            <p className="text-gray-600 mt-1">
              Monitor all platform orders across restaurants
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200">
              <span className="text-sm text-gray-600">Total Orders: </span>
              <span className="font-semibold text-gray-900">{totalOrders}</span>
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
        </div>

        {/* Filters Section */}
        <OrderFilters
          showFilters={showFilters}
          orderStatusFilter={orderStatusFilter}
          paymentStatusFilter={paymentStatusFilter}
          hasActiveFilters={hasActiveFilters}
          onOrderStatusChange={handleOrderStatusChange}
          onPaymentStatusChange={handlePaymentStatusChange}
          onResetFilters={resetFilters}
          onRemoveOrderStatusFilter={removeOrderStatusFilter}
          onRemovePaymentStatusFilter={removePaymentStatusFilter}
        />

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
            <OrdersTable orders={orders} onViewOrder={handleViewOrder} />

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
                  : "No orders found in the system yet."}
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

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
