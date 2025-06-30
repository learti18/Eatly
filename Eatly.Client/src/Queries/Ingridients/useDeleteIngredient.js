import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ingredientId) => {
      if (!ingredientId) {
        throw new Error("Ingredient ID is required for deletion");
      }
      const { data } = await api.delete(`/ingridients/${ingredientId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingridients"] });
      toast.success("Ingredient deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting ingredient:", error);
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to delete ingredient"
      );
    }
  });
};
