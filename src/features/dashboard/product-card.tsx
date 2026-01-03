import type { IProductCard } from "@/lib/types";
import { Bookmark, Gauge, Fuel, Settings, ArrowUpRight } from "lucide-react";
import toyotaImg from "@/assets/images/toyotta.svg"
import tcrossImg from "@/assets/images/t-cross.svg"
import cclassImg from "@/assets/images/c-class.svg"
import fordImg from "@/assets/images/ford.svg"
import glcImg from "@/assets/images/glc.svg"
import audiImg from "@/assets/images/audi.svg"
import corollaImg from "@/assets/images/corolla.svg"
import explorerImg from "@/assets/images/explorer.svg"

const ProductCard = ({
  image,
  title,
  subtitle,
  mileage,
  fuelType,
  transmission,
  price,
  badge,
  badgeColor = "green",
}: IProductCard) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-gray-200">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">Image Placeholder</span>
          </div>
        )}

        {badge && (
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${
              badgeColor === "green" ? "bg-green-500" : "bg-blue-500"
            }`}
          >
            {badge}
          </div>
        )}

        <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Bookmark className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-4 truncate">{subtitle}</p>

        <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
          <div className="flex flex-col items-center">
            <Gauge className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-600">{mileage}</span>
          </div>
          <div className="flex flex-col items-center">
            <Fuel className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-600">{fuelType}</span>
          </div>
          <div className="flex flex-col items-center">
            <Settings className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-600">{transmission}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            ${price.toLocaleString()}
          </div>
          <button className="flex items-center gap-1 text-blue-600 font-light text-sm hover:text-blue-700 transition-colors">
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SUVProductGrid = () => {
  const products = [
    {
      title: "Toyota Camry New",
      subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
      mileage: "20 Miles",
      fuelType: "Petrol",
      transmission: "Automatic",
      price: 40000,
      image: toyotaImg,
    },
    {
      title: "T-Cross – 2023",
      subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
      mileage: "15 Miles",
      fuelType: "Petrol",
      transmission: "CVT",
      price: 15000,
      image: tcrossImg,
    },
    {
      title: "C-Class – 2023",
      subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
      mileage: "50 Miles",
      fuelType: "Petrol",
      transmission: "Automatic",
      price: 150000,
      image: cclassImg,
    },
    {
      title: "Ford Transit – 2021",
      subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
      mileage: "2500 Miles",
      fuelType: "Diesel",
      transmission: "Manual",
      price: 22000,
      badge: "Great Price",
      badgeColor: "green",
      image: fordImg,
    },
    {
      title: "New GLC – 2023",
      subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
      mileage: "50 Miles",
      fuelType: "Petrol",
      transmission: "Automatic",
      price: 95000,
      badge: "Low Mileage",
      badgeColor: "blue",
      image: glcImg,
    },
    {
      title: "Audi A6 3.5 – New",
      subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
      mileage: "100 Miles",
      fuelType: "Petrol",
      transmission: "Automatic",
      price: 58000,
      image: audiImg,
    },
    {
      title: "Corolla Altis – 2023",
      subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
      mileage: "15000 Miles",
      fuelType: "Petrol",
      transmission: "CVT",
      price: 45000,
      image: corollaImg,
    },
    {
      title: "Ford Explorer 2023",
      subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
      mileage: "10 Miles",
      fuelType: "Diesel",
      transmission: "CVT",
      price: 35000,
      badge: "Great Price",
      badgeColor: "green",
      image: explorerImg,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            The Most Searched SUV Cars
          </h1>
          <button className="flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors">
            View All
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SUVProductGrid;
