import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useAddToCart = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ foodId, quantity }) => {
            const { data } = await api.post("/cart/items", {
                foodId,
                quantity
            });

            return data;
        },
        onSuccess: (data) => {
            // Only invalidate cart queries, not restaurant or food queries
            queryClient.invalidateQueries({
                queryKey: ["cart"],
                refetchType: 'active' // Only refetch active queries
            });
            
            toast.success("Item added to cart", {
                description: "Item has been successfully added to your cart.",
            });
        },
        onError: (error) => {
            toast.error("Failed to add item to cart", {
                description: error?.response?.data?.error || "An error occurred while adding the item to your cart.",
            });
        },
    })
}