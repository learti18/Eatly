import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useAllFoodsById = (id) => {

    return useQuery({
        queryKey: ["foods"],
        queryFn: async () => {
            const { data } = await api.get(`restaurants/${id}/foods`)
            return data
        },
        staleTime: 10000,
        refetchOnWindowFocus: false,
    })
}