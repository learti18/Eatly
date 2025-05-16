import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useRestaurantCategories = () => {
    return useQuery({
        queryKey: ["restaurantCategories"],
        queryFn: async () => {
            const { data } = await api.get("/restaurants/categories")
            return data
        },
        select: (data) => {
            return data.map((category) => ({
                label: category.name,
                value: category.id,
            }))
        },
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    })
}