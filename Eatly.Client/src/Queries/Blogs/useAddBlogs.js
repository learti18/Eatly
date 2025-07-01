import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../Services/Api';
import { queryClient } from './../../QueryConfig';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useAddBlogs = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

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
            navigate(-1);
        },
        onError: (error) => {
            console.error("Error adding blog:", error);
        },
    })
}
