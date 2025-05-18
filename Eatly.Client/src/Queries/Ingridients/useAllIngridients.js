import { useQuery } from "@tanstack/react-query";
import api from "../../Services/Api";

export const useAllIngridients = () => {
    return useQuery({
        queryKey: ["ingridients"],
        queryFn: async () => {
            const { data } = await api.get("/ingridients");
            return data;
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 1000 * 60 * 30,
        cacheTime: 1000 * 60 * 60, 
    });
}