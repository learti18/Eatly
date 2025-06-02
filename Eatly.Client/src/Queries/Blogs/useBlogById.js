import { useQuery } from "@tanstack/react-query";
import api from "../../Services/Api";
import { toast } from "sonner";

export const useBlogById = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      try {
        const { data } = await api.get(`blogs/${id}`);
        return data;
      } catch (error) {
        toast.error("Failed to fetch blog details");
        throw error;
      }
    },
   
  });
};
