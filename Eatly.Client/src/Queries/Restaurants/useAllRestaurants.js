import { useQuery } from "@tanstack/react-query"
import api from "../../Services/Api"

export const useAllRestaurants = (filters = {}) => {
    const { 
        category, 
        searchTerm, 
        sortBy = "name", 
        sortOrder = "asc", 
        pageNumber = 1, 
        pageSize = 10 
    } = filters;

    const params = new URLSearchParams();
    
    if (category) params.append('category', category);
    if (searchTerm) params.append('searchTerm', searchTerm);
    if (sortBy) params.append('sortBy', sortBy);
    if (sortOrder) params.append('sortOrder', sortOrder);
    if (pageNumber) params.append('pageNumber', pageNumber.toString());
    if (pageSize) params.append('pageSize', pageSize.toString());

    const queryString = params.toString();

    return useQuery({
        queryKey: ["restaurants", filters],
        queryFn: async () => {
            const url = queryString ? `/restaurants?${queryString}` : "/restaurants";
            const { data } = await api.get(url);
            return data;
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
    })
}