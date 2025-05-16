import { useMutation } from "@tanstack/react-query"
import api from "../../Services/Api"
import { useNavigate } from "react-router-dom";

export const useAddRestaurant = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["addRestaurant"],
        mutationFn: async (formData) => {
            const { restaurantData } = await api.post("/restaurants", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            return restaurantData;
        },
        onSuccess: () => {
            navigate("/restaurant-verification")
        }
    })
}