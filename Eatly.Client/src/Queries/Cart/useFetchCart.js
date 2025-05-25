import { useQuery } from "@tanstack/react-query";
import api from "../../Services/Api";
import { useAuth } from "../../Hooks/useAuth";

export const useFetchCart = () => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      try {
        const response = await api.get("/cart");
        return response.data;
      } catch (error) {
        console.error("Error fetching cart:", error);
        return { cartItems: [] }; 
      }
    },
    enabled: isAuthenticated ,
    refetchOnWindowFocus: isAuthenticated,
  });
};