import { useQuery } from "@tanstack/react-query";
import api from "../../Services/Api";

export const useRestaurantById = (id) => {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const { data } = await api.get(`/restaurants/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
};