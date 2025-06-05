import { useQuery } from "@tanstack/react-query";
import api from "../../Services/Api";
import { useRestaurant } from "../../Contexts/RestaurantContext";

export const useDrivers = () => {
  const { restaurant } = useRestaurant();

  return useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const { data } = await api.get("/drivers");
      return data;
    },
    enabled: !!restaurant?.id,
  });
};
