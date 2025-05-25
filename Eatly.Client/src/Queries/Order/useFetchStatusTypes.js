import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useFetchStatusTypes = () => {
    return useQuery({
        queryKey: ["statusTypes"],
        queryFn: async () => {
            const { data } = await api.get("/restaurant/orders/status-types")
            return data
        },
        select: (data) => {
            return data.map((category) => ({
                label: category.name,
                value: category.id,
            }))
        },
        staleTime: 1000 * 60 * 60 * 24, 
        cacheTime: 1000 * 60 * 60 * 24 * 7, 
        refetchOnWindowFocus: false, 
        refetchOnMount: false, 
        refetchOnReconnect: false  
    })
}