import { useQuery } from "@tanstack/react-query";
import api from "../../Services/Api";
import { useAuth } from "../../Hooks/useAuth";

export const useFavorites = () => {
    const { isAuthenticated } = useAuth();
    
    return useQuery({
        queryKey: ["favorites"],
        queryFn: async () => {
            const { data } = await api.get("/favorites");
            return data;
        },
        enabled: isAuthenticated,
        staleTime: 1000 * 60 * 5, 
        cacheTime: 1000 * 60 * 30, 
        refetchOnWindowFocus: false,
        refetchOnMount: false
    });
};
