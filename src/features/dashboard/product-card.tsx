import type { IProductCard } from "@/lib/types";
import { Bookmark, Gauge, Fuel, Settings, ArrowUpRight } from "lucide-react";

import { useCars } from "@/api/car";
import Loader from "@/components/loader";
import { useNavigate } from "react-router-dom";
import { routes } from "@/lib/routes";

const ProductCard = ({
  image,
  title,
  subtitle,
  mileage,
  fuelType,
  transmission,
  price,
  badge,
  onViewDetails,
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
          <button
            onClick={onViewDetails}
            className="flex items-center gap-1 text-blue-600 font-light text-sm hover:text-blue-700 transition-colors cursor-pointer"
          >
            View Details
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const SUVProductGrid = () => {
  const { data, isLoading } = useCars();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            The Most Searched SUV Cars
          </h1>
          <button
            onClick={() => navigate(routes.product.index)}
            className="flex items-center gap-2 text-gray-700 font-medium hover:text-gray-900 transition-colors cursor-pointer"
          >
            View All
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.slice(0, 8)?.map((product) => (
            <ProductCard
              image={product?.images[0]}
              title={product.name}
              subtitle={product.description}
              fuelType={product.fuel_type}
              onViewDetails={() => navigate(`/product/${product?.id}`)}
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SUVProductGrid;
