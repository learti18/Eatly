import { ChevronDown, Filter, Package, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  orderStatusColors,
  orderStatusOptions,
  paymentStatusColors,
  paymentStatusOptions,
} from "../../constants/statuses";
import { useFetchUserOrders } from "../../Queries/Order/useFetchUserOrders";
import Pagination from "../../components/Shared/Pagination";
import { formatCurrency } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";

export default function UserOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    return parseInt(searchParams.get("page")) || 1;
  });
  const [pageSize, setPageSize] = useState(() => {
    return parseInt(searchParams.get("pageSize")) || 10;
  });
  const [orderStatusFilter, setOrderStatusFilter] = useState(() => {
    return searchParams.get("orderStatus") || "All";
  });
  const [paymentStatusFilter, setPaymentStatusFilter] = useState(() => {
    return searchParams.get("paymentStatus") || "All";
  });
  const [showFilters, setShowFilters] = useState(false);

  const updateUrlParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "All" && value !== 1 && value !== 10) {
        newParams.set(key, value.toString());
      } else if (key === "page" && value > 1) {
        newParams.set(key, value.toString());
      } else if (key === "pageSize" && value !== 10) {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  const handleOrderStatusChange = (status) => {
    setOrderStatusFilter(status);
    setCurrentPage(1);
    updateUrlParams({
      page: 1,
      orderStatus: status,
      paymentStatus: paymentStatusFilter,
      pageSize,
    });
  };

  const handlePaymentStatusChange = (status) => {
    setPaymentStatusFilter(status);
    setCurrentPage(1);
    updateUrlParams({
      page: 1,
      orderStatus: orderStatusFilter,
      paymentStatus: status,
      pageSize,
    });
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
    updateUrlParams({
      page: 1,
      orderStatus: orderStatusFilter,
      paymentStatus: paymentStatusFilter,
      pageSize: size,
    });
  };

  const resetFilters = () => {
    setOrderStatusFilter("All");
    setPaymentStatusFilter("All");
    setCurrentPage(1);
    setPageSize(10);
    setSearchParams({});
  };

  const removeOrderStatusFilter = () => {
    setOrderStatusFilter("All");
    setCurrentPage(1);
    updateUrlParams({
      page: 1,
      orderStatus: "All",
      paymentStatus: paymentStatusFilter,
      pageSize,
    });
  };

  const removePaymentStatusFilter = () => {
    setPaymentStatusFilter("All");
    setCurrentPage(1);
    updateUrlParams({
      page: 1,
      orderStatus: orderStatusFilter,
      paymentStatus: "All",
      pageSize,
    });
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const size = parseInt(searchParams.get("pageSize")) || 10;
    const orderStatus = searchParams.get("orderStatus") || "All";
    const paymentStatus = searchParams.get("paymentStatus") || "All";

    setCurrentPage(page);
    setPageSize(size);
    setOrderStatusFilter(orderStatus);
    setPaymentStatusFilter(paymentStatus);
  }, [searchParams]);

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

        {/* Filters */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden mb-6 ${
            showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg text-gray-800">
                Filter Orders
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Order Status
                </label>
                <div className="relative">
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple focus:ring focus:ring-purple focus:ring-opacity-50 h-10 pl-3 pr-10 text-gray-700 appearance-none"
                    value={orderStatusFilter}
                    onChange={(e) => handleOrderStatusChange(e.target.value)}
                  >
                    {orderStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Payment Status
                </label>
                <div className="relative">
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple focus:ring focus:ring-purple focus:ring-opacity-50 h-10 pl-3 pr-10 text-gray-700 appearance-none"
                    value={paymentStatusFilter}
                    onChange={(e) => handlePaymentStatusChange(e.target.value)}
                  >
                    {paymentStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={resetFilters}
                className={`px-4 py-2 rounded-lg ${
                  hasActiveFilters
                    ? "text-gray-700 bg-gray-100 hover:bg-gray-200"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                disabled={!hasActiveFilters}
              >
                Clear Filters
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="ml-3 px-4 py-2 bg-purple text-white rounded-lg hover:bg-purple-dark"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

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
              <div className="inline-flex items-center bg-purple-50 text-purple-800 rounded-full px-3 py-1 text-sm">
                <span>Payment: {paymentStatusFilter}</span>
                <button
                  onClick={removePaymentStatusFilter}
                  className="ml-1 hover:text-purple-900"
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
