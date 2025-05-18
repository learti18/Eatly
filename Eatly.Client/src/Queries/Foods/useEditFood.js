import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../Services/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useEditFood = (foodId) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.put(`/restaurants/foods/${foodId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["foods"] });
 
            toast.success("Food updated successfully")
            navigate(-1);
        },
        onError: (error) => {
            toast.error("Failed to update food");
        },
    })
}