import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (foodId) => {
            const { data } = await api.delete(`/cart/items/${foodId}`);
            return data;
        },
        onMutate: async (foodId) => {
            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);
            
            return { previousCart };
        },
        onError: (error, variables, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart);
            }
            
            toast.error("Failed to remove item from cart", {
                description: error?.response?.data?.message || "An error occurred while removing the item from your cart.",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries(["cart"]);
        },
    });
};