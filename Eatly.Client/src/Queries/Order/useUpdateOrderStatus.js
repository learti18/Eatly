import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await api.put(`/restaurant/orders/${id}/status`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (error) => {
      console.error("Error in update order status:", error);
    }
  });
};
