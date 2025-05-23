import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useUpdateCartItem = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async ({ foodId, quantity }) => {
            const { data } = await api.put(`/cart/items/${foodId}`, {
                quantity,
            });
            return data;
        },
        onMutate: async ({ foodId, quantity }) => {
            await queryClient.cancelQueries(["cart"]);
            const previousCart = queryClient.getQueryData(["cart"]);
            
            // Optimistically update the cart
            if (previousCart) {
                queryClient.setQueryData(["cart"], oldData => {
                    const updatedCartItems = oldData.cartItems.map(item => {
                        if (item.foodId === foodId) {
                            const unitPrice = item.price / item.quantity;
                            return {
                                ...item,
                                quantity,
                                price: (unitPrice * quantity).toFixed(2)
                            };
                        }
                        return item;
                    });
                    
                    // Recalculate total price
                    const newTotalPrice = updatedCartItems.reduce(
                        (sum, item) => sum + Number(item.price),
                        0
                    ).toFixed(2);
                    
                    return {
                        ...oldData,
                        cartItems: updatedCartItems,
                        totalPrice: newTotalPrice
                    };
                });
            }
            
            return { previousCart };
        },
        onError: (error, variables, context) => {
            if (context?.previousCart) {
                queryClient.setQueryData(["cart"], context.previousCart);
            }
            
            toast.error("Failed to update item in cart", {
                description:
                error?.response?.data?.message ||
                "An error occurred while updating the item in your cart.",
            });
        },
        onSettled: (data, error, variables) => {
            // Only invalidate if there was an error or the server response is significantly different
            if (error) {
                queryClient.invalidateQueries(["cart"]);
            }
        }
    });
}