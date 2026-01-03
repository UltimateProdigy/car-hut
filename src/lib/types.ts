export interface IProductCard {
  image: string;
  title: string;
  subtitle: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  price: number;
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
