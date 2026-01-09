import { useQuery } from "@tanstack/react-query";
import api from "../api";

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface Category {
  id: string;
  name: string;
}

interface User {
  id: string;
  username: string;
  profile_picture: string | null;
}
interface Feature {
  id: string;
  name: string;
  description: string | null;
}

interface Car {
  id: string;
  name: string;
  description: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image_url: string | null;
  images: string[];
  created_at: string;
  updated_at: string;
  location: string;
  fuel_type: string;
  transmission: string;
  engine_size: string;
  horsepower: number;
  color: string;
  body_type: string;
  is_active: boolean;
  is_featured: boolean;
  status: string;
  auction_start_date: string;
  auction_end_date: string;
  reserve_price: number;
  current_bid: number | null;
  buy_now_price: number;
  brand_id: string;
  category_id: string;
  user_id: string;
  vin: string;
  licensePlate: string;
  brand?: Brand;
  category?: Category;
  user?: User;
  features?: Feature[];
  bids?: any[];
  _count: {
    bids: number;
  };
}
export const useCars = (filters?: {
  status?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  activeAuctions?: boolean;
}) => {
  return useQuery<Car[]>({
    queryKey: ["cars", filters],
    queryFn: async () => {
      const { data } = await api.get<{
        success: boolean;
        count: number;
        data: Car[];
      }>("/cars", { params: filters });
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useCar = (carId: string) => {
  return useQuery<Car | undefined>({
    queryKey: ["car", carId],
    queryFn: async () => {
      const { data } = await api.get<{
        success: boolean;
        data: Car;
      }>(`/cars/${carId}`);
      return data.data;
    },
    enabled: !!carId,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

// export const useCreateCar = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (newCar: Omit<Car, "id">) => {
//       const { data } = await api.post<Car>("/cars", newCar);
//       return data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cars"] });
//     },
//   });
// };

// export const useUpdateCar = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, ...carData }: Partial<Car> & { id: string }) => {
//       const { data } = await api.put<Car>(`/cars/${id}`, carData);
//       return data;
//     },
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["car", data.id] });
//       queryClient.invalidateQueries({ queryKey: ["cars"] });
//     },
//   });
// };

// export const useDeleteCar = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (carId: string) => {
//       await api.delete(`/cars/${carId}`);
//       return carId;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cars"] });
//     },
//   });
// };
