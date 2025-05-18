import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useAllRestaurants = () => {

    return useQuery({
        queryKey: ["restaurants"],
        queryFn: async () => {
            const { data } = await api.get("/restaurants")
            return data
        },
    })
}