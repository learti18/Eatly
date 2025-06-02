import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../Services/Api';
import { queryClient } from './../../QueryConfig';
import { toast } from 'sonner';

export const useAddBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            const { data } = await api.post("/blogs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["blogs"]);
            toast.success("Blog added successfully");
        },
        onError: (error) => {
            console.error("Error adding blog:", error);
        },
    })
}
