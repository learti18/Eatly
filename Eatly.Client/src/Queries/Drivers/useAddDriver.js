import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useAddDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/drivers", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      toast.success("Driver added successfully");
      window.history.back();
    },
    onError: (error) => {
      console.error("Error adding driver:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to add driver. Please try again."
      );
    },
  });
};
