import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../Services/Api";

export const useAddOrder = (options = {}) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (order) => {
            const { data } = await api.post("/orders", order);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(["orders"]);
            queryClient.invalidateQueries(["cart"]);
            
            if (options.onSuccess) {
                options.onSuccess(data);
            }
        },
        onError: (error) => {
            if (options.onError) {
                options.onError(error);
            }
        }
    })
}