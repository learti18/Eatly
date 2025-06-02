import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useAllBlogs = () => {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const { data } = await api.get(`blogs`)
            return data
        },
        staleTime: 10000,
        refetchOnWindowFocus: false,
    })
}