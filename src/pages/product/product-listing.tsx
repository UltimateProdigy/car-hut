import { AuctionProductCard } from "@/features/product/auction-product-card";
import { useState } from "react";
import camryImg from "@/assets/images/toyotta.svg";
import x5 from "@/assets/images/x5.svg";
import cclassImg from "@/assets/images/c-class.svg"
import audiImg from "@/assets/images/audi.svg"

const ProductsListingPage = ({ onViewDetails }: any) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("ending-soon");

  const products = [
    {
      id: 1,
      title: "Toyota Camry New",
      subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
      mileage: "20 Miles",
      fuelType: "Petrol",
      transmission: "Automatic",
      currentBid: 40000,
      totalBids: 23,
      timeLeft: "2h 34m",
      badge: "Ending Soon",
      badgeColor: "red",
      image: camryImg,
    },
    {
      id: 2,
      title: "BMW X5 2023",
      subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
      mileage: "50 Miles",
      fuelType: "Petrol",
      transmission: "Automatic",
      currentBid: 85000,
      totalBids: 45,
      timeLeft: "1d 5h",
      badge: "Hot Bid",
      badgeColor: "green",
      image: x5,
    },
    {
      id: 3,
      title: "Mercedes C-Class",
      subtitle: "4.0 D5 PowerPulse Momentum 5dr AW...",
      mileage: "15 Miles",
      fuelType: "Diesel",
      transmission: "Manual",
      currentBid: 65000,
      totalBids: 12,
      timeLeft: "3d 12h",
      image: cclassImg
    },
    {
      id: 4,
      title: "Audi A6 Premium",
      subtitle: "3.5 D5 PowerPulse Momentum 5dr AW...",
      mileage: "100 Miles",
      fuelType: "Petrol",
      transmission: "Automatic",
      currentBid: 58000,
      totalBids: 34,
      timeLeft: "5h 20m",
      badge: "Ending Soon",
      badgeColor: "red",
      image: audiImg
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Live Auctions
          </h1>
          <p className="text-gray-600">
            Bid on premium vehicles from verified dealers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Auctions
              </button>
              <button
                onClick={() => setFilter("ending-soon")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "ending-soon"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Ending Soon
              </button>
              <button
                onClick={() => setFilter("new")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === "new"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                New Listings
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ending-soon">Ending Soon</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="most-bids">Most Bids</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <AuctionProductCard
              key={product.id}
              {...product}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsListingPage;
