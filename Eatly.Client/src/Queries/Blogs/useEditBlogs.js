import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";


export const useEditBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            // Get the ID from the FormData
            const id = formData.get('id');
            // Use PUT request with the ID in the URL path
            const { data } = await api.put(`blogs/${id}`, formData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs']);
            toast.success("Blog updated successfully");
            // Redirect back to blogs listing
            window.history.back();
        },
        onError: (error) => {
            toast.error(`Error updating blog: ${error.message}`);
        },
    });
}