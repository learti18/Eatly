import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../Services/Api';
import { toast } from 'sonner';


export const useDeleteBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            if (!id) {
                throw new Error("Blog ID is required for deletion");
            }
            const { data } = await api.delete(`blogs/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['blogs']);
            toast.success("Blog deleted successfully");
        },
        onError: (error) => {
            toast.error(`Error deleting blog: ${error.message}`);
        }
    });
}