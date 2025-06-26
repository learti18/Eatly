import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ foodId }) => {
      const { data } = await api.delete(`/favorite-foods/${foodId}`);
      return data;
    },
    onSuccess: (data, variables) => {
      toast.success("Removed from favorites!");
      
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove from favorites");
    },
  });
};
