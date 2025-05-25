import { useQuery } from "@tanstack/react-query";
import api from "../../Services/Api";

export const useAllFoodsById = (id) => {
  return useQuery({
    queryKey: ["foods", id],
    queryFn: async () => {
      const { data } = await api.get(`/restaurants/${id}/foods`);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
};