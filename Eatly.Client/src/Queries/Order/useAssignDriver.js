import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";

export function useAssignDriver() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ orderId, driverId }) => {
      const {data } = await api.post("/drivers/assign-driver", {
        orderId,
        driverId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}
