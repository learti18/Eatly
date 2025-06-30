import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../Services/Api';
import { toast } from 'sonner';

export const useAddIngredient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.post("/ingridients", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["ingridients"]);
            toast.success("Ingredient added successfully");
        },
        onError: (error) => {
            console.error("Error adding ingredient:", error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to add ingredient"
            );
        },
    });
};
