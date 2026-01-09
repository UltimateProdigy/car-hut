export interface IProductCard {
  image: string;
  title: string;
  subtitle: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  price: number;
  onViewDetails: () => void
  badge?: string;
  badgeColor?: string;
}

export interface IBlogCard {
  image?: string
  category: string
  author: string
  date: string
  title: string
}
