import { useQuery } from "@tanstack/react-query";
import api from ".";

interface User {
  id: string;
}

export const useCar = (userId: string) => {
  return useQuery<User | undefined>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data } = await api.get<{
        success: boolean;
        data: User;
      }>(`/users/${userId}`);
      return data.data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};
