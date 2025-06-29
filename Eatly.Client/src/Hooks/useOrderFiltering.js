import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useOrderFiltering = () => {
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


    return {
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
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
    };
}

export default useOrderFiltering;