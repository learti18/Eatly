import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../../Services/Api";
import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

export const useAddFood = () => {
    const queryClient = useQueryClient();
    const navgiate = useNavigate()
    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.post("/restaurants/foods", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["foods"]);
            toast.success("Food added successfully");   
            navgiate(-1);
        },
        onError: (error) => {
            console.error("Error adding food:", error);
            toast.error(error?.response?.data &&
                        typeof error.response.data === "string" &&
                        error.response.data.includes("File size too large"))
        },
    })
}