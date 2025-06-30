import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../Services/Api';
import { toast } from 'sonner';

export const useEditIngredient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, formData }) => {
            const { data } = await api.put(`/ingridients/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["ingridients"]);
            toast.success("Ingredient updated successfully");
        },
        onError: (error) => {
            console.error("Error updating ingredient:", error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to update ingredient"
            );
        },
    });
};
