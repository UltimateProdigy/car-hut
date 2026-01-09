import { AuctionProductCard } from "@/features/product/auction-product-card";
import { useState } from "react";
import { useCars } from "@/api/car";
import Loader from "@/components/loader";
import { useNavigate } from "react-router-dom";

const ProductsListingPage = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("ending-soon");
  const navigate = useNavigate();

  const { data: products = [], isLoading, isError } = useCars({});

  if (isLoading) return <Loader />;
  if (isError)
    return <div className="text-center text-red-500">Error fetching cars.</div>;

  return (
    <>
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
                image_url={product?.images[0]}
                name={product.name}
                description={product.description}
                mileage={product.mileage}
                fuel_type={product.fuel_type}
                transmission={product.transmission}
                current_bid={product.current_bid || 0}
                _count={{
                  bids: product._count.bids,
                }}
                auction_end_date={product.auction_end_date}
                badge={
                  product.is_featured
                    ? "Featured"
                    : product.status === "active"
                    ? "Active"
                    : undefined
                }
                badgeColor={product.is_featured ? "green" : "red"}
                onViewDetails={() => navigate(`/product/${product.id}`)}
                id={product.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsListingPage;
