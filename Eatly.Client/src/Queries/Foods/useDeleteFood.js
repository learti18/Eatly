import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../Services/Api"
import { toast } from "sonner"

export const useDeleteFood = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id) => {
            const { data } = await api.delete('restaurants/foods/'+id );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['foods'])
            toast.success("Food deleted successfully");
        },
    })
}