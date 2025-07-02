import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restaurantId) => {
      if (!restaurantId) {
        throw new Error("Restaurant ID is required for deletion");
      }
      const { data } = await api.delete(`/restaurants/${restaurantId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      toast.success("Restaurant deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting restaurant:", error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to delete restaurant"
      );
    }
  });
};
