import { useQuery } from "@tanstack/react-query";
import api from "../../Services/Api";

export const useFetchUserOrders = (options = { pageNumber: 1, pageSize: 5 }) => {
  return useQuery({
    queryKey: ["userOrders", options.pageNumber, options.pageSize, options.orderStatus, options.paymentStatus],
    queryFn: async () => {
      const { pageNumber, pageSize, orderStatus, paymentStatus } = options;
      
      let queryParams = `pageNumber=${pageNumber}&pageSize=${pageSize}`;
      if (orderStatus) queryParams += `&orderStatus=${orderStatus}`;
      if (paymentStatus) queryParams += `&paymentStatus=${paymentStatus}`;
      
      const response = await api.get(`/orders?${queryParams}`);
      return response.data;
    },
  });
};