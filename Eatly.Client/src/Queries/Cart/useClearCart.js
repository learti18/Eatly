import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import api from '../../Services/Api';

export const useClearCart = () => {
    const queryClient = useQueryClient();
    
    
    return useMutation({
        mutationFn: async () => {
            const { data } = await api.delete('/cart')
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['cart']);
        },
    })
}
