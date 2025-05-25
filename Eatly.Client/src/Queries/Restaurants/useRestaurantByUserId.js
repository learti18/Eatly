import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"
import { useAuth } from "../../Hooks/useAuth"
import { STATUS } from "../../Utils/AuthStatus"

export const useRestaurantByUserId = ({ enabled = true } = {}) => {
    const { isAuthenticated, status, user } = useAuth();

    console.log("useRestaurantByUserId Debug:", {
        isAuthenticated,
        status,
        userRoles: user?.roles,
        enabled
    });

    return useQuery({
        queryKey: ["restaurantByUserId"],
        queryFn: async () => {
            console.log("Fetching restaurant data...");
            const { data } = await api.get("/restaurants/me");
            console.log("Restaurant data received:", data);
            return data;
        },
        enabled: enabled && isAuthenticated && status === STATUS.SUCCEEDED && user?.roles?.includes("Restaurant"),
        onSuccess: (data) => {
            console.log("Restaurant data fetched successfully:", data);
        },
        onError: (error) => {
            console.error("Error fetching restaurant data:", error);
        },
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        staleTime: 1000,
        cacheTime: 5 * 60 * 1000,
    })
}