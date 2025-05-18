import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"
import { useAuth } from "../../Hooks/useAuth"
import { STATUS } from "../../Utils/AuthStatus"

export const useRestaurantByUserId = ({ enabled = true } = {}) => {
    const { isAuthenticated, status, user } = useAuth();

    return useQuery({
        queryKey: ["restaurantByUserId"],
        queryFn: async () => {
            const { data } = await api.get("/restaurants/me")
            return data;
        },
        enabled: enabled && isAuthenticated && status !== STATUS.PENDING && user?.roles?.includes("Restaurant"),
        onSuccess: (data) => {
            console.log("Restaurant data fetched successfully:", data);
        },
        onError: (error) => {
            console.error("Error fetching restaurant data:", error);
        },
        enabled: enabled && isAuthenticated && status !== STATUS.PENDING && user?.roles?.includes("Restaurant"),
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    })
}