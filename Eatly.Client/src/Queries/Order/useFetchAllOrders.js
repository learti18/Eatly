import { useQuery } from "@tanstack/react-query";
import api from "../../Services/Api";

export const useFetchAllOrders = (options = { pageNumber: 1, pageSize: 10 }) => {
  return useQuery({
    queryKey: ["orders", options.pageNumber, options.pageSize, options.orderStatus, options.paymentStatus],
    queryFn: async () => {
      const { pageNumber, pageSize, orderStatus, paymentStatus } = options;
      
      let queryParams = `pageNumber=${pageNumber}&pageSize=${pageSize}`;
      if (orderStatus) queryParams += `&orderStatus=${orderStatus}`;
      if (paymentStatus) queryParams += `&paymentStatus=${paymentStatus}`;
      
      const response = await api.get(`/orders?${queryParams}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, 
    cacheTime: 1000 * 60 * 10,
  });
};