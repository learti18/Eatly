import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useAddRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await api.post("/restaurants", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: async (data) => {
      // Invalidate and refetch both queries to ensure fresh data
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["restaurant", "me"] }),
        queryClient.invalidateQueries({ queryKey: ["restaurantByUserId"] })
      ]);
      
      // Update the cache with the new restaurant data
      queryClient.setQueryData(["restaurantByUserId"], data);
      
      toast.success("Restaurant created successfully!");
    },
    onError: (error) => {
      console.error("Error creating restaurant:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create restaurant. Please try again."
      );
    },
  });
};