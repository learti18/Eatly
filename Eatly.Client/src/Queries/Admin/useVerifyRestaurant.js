import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";

export const useVerifyRestaurant = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({id,isVerified}) => {
            const { data } = await api.put(
                `/admin/restaurants/${id}/verify`,
                { isVerified }
            );
            return data;
        },
        onSuccess: ()=> {
            queryClient.invalidateQueries(["restaurants"])
            queryClient.invalidateQueries(["restaurantByUserId"])
        }
        
    });
}