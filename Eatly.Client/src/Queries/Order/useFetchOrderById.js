import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api";

export const useFetchOrderById = (orderId) => {

    return useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => {
            if (!orderId) {
                throw new Error("Order ID is required");
            }
            const response = await api.get(`/orders/${orderId}`);
           
            return response.data;
        },
        enabled: !!orderId, 
        refetchOnWindowFocus: false,
    })
}