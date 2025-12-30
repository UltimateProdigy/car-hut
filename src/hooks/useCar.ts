import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { useAuth } from "./useAuth";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
}

export const useCars = (filters?: { make?: string; minPrice?: number }) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["cars", filters],
    queryFn: async () => {
      const { data } = await api.get<Car[]>("/cars", { params: filters });
      return data;
    },
    enabled: !!user,
  });
};

export const useCar = (carId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["car", carId],
    queryFn: async () => {
      const { data } = await api.get<Car>(`/cars/${carId}`);
      return data;
    },
    enabled: !!user && !!carId,
  });
};

export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newCar: Omit<Car, "id">) => {
      const { data } = await api.post<Car>("/cars", newCar);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};

export const useUpdateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...carData }: Partial<Car> & { id: string }) => {
      const { data } = await api.put<Car>(`/cars/${id}`, carData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["car", data.id] });
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};

export const useDeleteCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (carId: string) => {
      await api.delete(`/cars/${carId}`);
      return carId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
};
