import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api";

export const useFetchCart = () => {
    return useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const { data } = await api.get("/cart");
            return data;
        },
        refetchOnWindowFocus: false, // Changed to reduce API calls
        retry: 1,
        staleTime: 60000,  // Increased to 60 seconds
        cacheTime: 300000,
    })
}