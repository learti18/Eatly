import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"
import { useAuth } from "../../Hooks/useAuth"
import { STATUS } from "../../Utils/AuthStatus"

export const useRestaurantByUserId = ({ enabled = true } = {}) => {
    const { isAuthenticated, status, user } = useAuth();

    return useQuery({
        queryKey: ["restaurantByUserId"],
        queryFn: async () => {
            const { data } = await api.get("/restaurants/me");
            return data;
        },
        enabled: enabled && isAuthenticated && status === STATUS.SUCCEEDED && user?.roles?.includes("Restaurant"),
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        staleTime: 1000,
        cacheTime: 5 * 60 * 1000,
    })
}