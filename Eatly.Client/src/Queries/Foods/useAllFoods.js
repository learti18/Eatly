import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useAllFoods = () => {

    return useQuery({
        queryKey: ["foods"],
        queryFn: async () => {
            const { data } = await api.get(`restaurants/foods`)
            return data
        },
        staleTime: 10000,
        refetchOnWindowFocus: false,
    })
}