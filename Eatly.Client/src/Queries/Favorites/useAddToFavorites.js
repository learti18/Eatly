import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ foodId }) => {
      const { data } = await api.post("/favorite-foods", { foodId });
      return data;
    },
    onSuccess: (data, variables) => {
      toast.success("Added to favorites!");
      
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add to favorites");
    },
  });
};
