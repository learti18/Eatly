import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useAllFoods = (restaurantId) => {

    return useQuery({
        queryKey: ["foods"],
        queryFn: async () => {
            const { data } = await api.get(`restaurants/${restaurantId}/foods`)
            return data
        }
    })
}