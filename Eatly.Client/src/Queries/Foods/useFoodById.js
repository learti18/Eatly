import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api";
import { toast } from "sonner";

export const useFoodById = (id) => {
    return useQuery({
        queryKey: ["food", id],
        queryFn: async () => {
            const { data } = await api.get(`/restaurants/foods/${id}`);
            return data;
        },
        enabled: !!id,
        onError: (error) => {
            toast.error("Error fetching food details");
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    })
}