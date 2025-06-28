import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api";

export const useFetchUserOrderById = (orderId) => {

    return useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => {
            if (!orderId) {
                throw new Error("Order ID is required");
            }
            const response = await api.get(`/orders/user/${orderId}`);
           
            return response.data;
        },
        enabled: !!orderId, 
        refetchOnWindowFocus: false,
    })
}