import { ChevronDown, Filter, Package, ShoppingBag, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  orderStatusColors,
  orderStatusOptions,
  paymentStatusColors,
  paymentStatusOptions,
} from "../../constants/statuses";
import { useFetchUserOrders } from "../../Queries/Order/useFetchUserOrders";
import Pagination from "../../components/Shared/Pagination";
import { formatCurrency } from "../../Utils/currencyFormatter";
import { formatDate } from "../../Utils/dateFormatter";
import useOrderFiltering from "../../Hooks/useOrderFiltering";
import OrderFilters from "../../components/Order/ClientUi/OrderFilters";

export default function UserOrders() {
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
    isLoading: ordersLoading,
    isError: ordersError,
  } = useFetchUserOrders({
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

  return (
    <div className="bg-background-main min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
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
        <OrderFilters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          orderStatusFilter={orderStatusFilter}
          handleOrderStatusChange={handleOrderStatusChange}
          paymentStatusFilter={paymentStatusFilter}
          handlePaymentStatusChange={handlePaymentStatusChange}
          resetFilters={resetFilters}
          hasActiveFilters={hasActiveFilters}
          orderStatusOptions={orderStatusOptions}
          paymentStatusOptions={paymentStatusOptions}
          updateUrlParams={updateUrlParams}
        />

        {/* Active filter indicators */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {orderStatusFilter !== "All" && (
              <div className="inline-flex items-center bg-purple-light text-purple rounded-full px-3 py-1 text-sm">
                <span>Status: {orderStatusFilter}</span>
                <button
                  onClick={removeOrderStatusFilter}
                  className="ml-1 hover:text-purple-dark"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {paymentStatusFilter !== "All" && (
              <div className="inline-flex items-center bg-purple-light text-purple rounded-full px-3 py-1 text-sm">
                <span>Payment: {paymentStatusFilter}</span>
                <button
                  onClick={removePaymentStatusFilter}
                  className="ml-1 hover:text-purple-dark"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        {ordersLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : ordersError ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            Error loading orders. Please try again later.
          </div>
        ) : orders && orders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {orders.map((order) => (
                <Link
                  to={`/orders/${order.id}`}
                  key={order.id}
                  state={{
                    returnTo: `/orders?${searchParams.toString()}`,
                    filters: {
                      orderStatus: orderStatusFilter,
                      paymentStatus: paymentStatusFilter,
                      page: currentPage,
                      pageSize: pageSize,
                    },
                  }}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-50 rounded-full p-2 flex-shrink-0">
                          <ShoppingBag size={16} className="text-purple" />
                        </div>
                        <h3 className="font-medium">Order #{order.id}</h3>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(order.orderDate)}
                      </span>
                    </div>

                    {/* Order summary */}
                    <div className="mt-3 flex justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">
                          {order.items.length} items
                        </p>
                        <p className="font-semibold">
                          ${formatCurrency(order.totalPrice)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            orderStatusColors[order.orderStatus]
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            paymentStatusColors[order.paymentStatus]
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalOrders}
              pageSize={pageSize}
              onPageChange={goToPage}
              onPageSizeChange={handlePageSizeChange}
            />
          </>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center shadow-md flex flex-col items-center">
            <Package size={48} className="text-gray-400 mb-4" />
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              No Orders Found
            </h2>
            <p className="text-gray-500">
              {orderStatusFilter !== "All" || paymentStatusFilter !== "All"
                ? "No orders match your current filters. Try changing your filters or browse our menu to place an order."
                : "You haven't placed any orders yet. Start shopping to see your orders here."}
            </p>
            <Link
              to="/menu"
              className="mt-6 px-6 py-3 bg-purple text-white font-medium rounded-lg hover:bg-purple-dark"
            >
              Browse Menu
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
