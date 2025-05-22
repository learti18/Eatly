import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useRestaurantById = (id) => {

    return useQuery({
        queryKey: ["restaurant",id],
        queryFn: async () => {
            const { data } = await api.get(`/restaurants/${id}`)
            return data
        },
    })
}