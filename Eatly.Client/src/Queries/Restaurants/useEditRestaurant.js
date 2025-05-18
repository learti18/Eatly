import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../Services/Api"
import { toast } from "sonner"

export const useEditRestaurant = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.put("/restaurants", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["restaurant"])
            queryClient.invalidateQueries(["restaurantByUserId"])
            toast.success("Restaurant updated successfully")
        },
        onError: (error) => {
            toast.error("Error updating restaurant")
            console.error("Error updating restaurant:", error)
        },
    })
}