import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useFoodTypes = () => {
    return useQuery({
         queryKey: ["foodTypes"],
        queryFn: async () => {
            const { data } = await api.get("/restaurants/foods/types")
            return data
        },
        select: (data) => {
            return data.map((type) => ({
                label: type.name,
                value: type.id,
            }))
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
    })
}