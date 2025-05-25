import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useFetchAllOrders = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const { data } = await api.get("/restaurant/orders")
            return data
        },
        staleTime: 10000,
        refetchOnWindowFocus: false,
    })
}