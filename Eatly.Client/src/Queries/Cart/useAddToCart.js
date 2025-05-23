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
            queryClient.invalidateQueries(["cart"]);
            toast.success("Item added to cart", {
                description: "Item has been successfully added to your cart.",
            });
        },
        onError: (error) => {
            toast.error("Failed to add item to cart", {
                description: error?.response?.data?.message || "An error occurred while adding the item to your cart.",
            });
        },
    })
    
}