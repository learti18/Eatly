import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../Services/Api";
import { toast } from "sonner"

export const useAddFood = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.post("/restaurants/foods", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["foods"]);
            toast.success("Food added successfully");   
        },
        onError: (error) => {
            console.error("Error adding food:", error);
        },
    })
}