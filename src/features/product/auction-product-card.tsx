import {
  ArrowUpRight,
  Bookmark,
  Gauge,
  Fuel,
  Settings,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";

interface AuctionProductCardProps {
  id: string;
  image_url: string | null;
  name: string;
  description: string;
  mileage: number;
  fuel_type: string;
  transmission: string;
  current_bid: number;
  _count: {
    bids: number;
  };
  auction_end_date: string;
  badge?: string;
  badgeColor?: "green" | "red" | "blue";
  onViewDetails: (id: string) => void;
}

export const AuctionProductCard: React.FC<AuctionProductCardProps> = ({
  id,
  image_url,
  name,
  description,
  mileage,
  fuel_type,
  transmission,
  current_bid,
  _count,
  auction_end_date,
  badge,
  badgeColor = "green",
  onViewDetails,
}) => {
  const timeLeft = () => {
    const endDate = new Date(auction_end_date);
    const now = new Date();
    const difference = endDate.getTime() - now.getTime();
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div
        className="relative h-48 bg-gray-200 cursor-pointer"
        onClick={() => onViewDetails(id)}
      >
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">Image Placeholder</span>
          </div>
        )}

        {badge && (
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${
              badgeColor === "green"
                ? "bg-green-500"
                : badgeColor === "red"
                ? "bg-red-500"
                : "bg-blue-500"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-4 truncate">{description}</p>

        <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100">
          <div className="flex flex-col items-center">
            <Gauge className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-600">{mileage} Miles</span>
          </div>
          <div className="flex flex-col items-center">
            <Fuel className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-600">{fuel_type}</span>
          </div>
          <div className="flex flex-col items-center">
            <Settings className="w-5 h-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-600">{transmission}</span>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              Current Bid
            </span>
            <span className="font-bold text-lg text-gray-900">
              ${current_bid.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <Users className="w-4 h-4" />
              Total Bids
            </span>
            <span className="font-semibold text-gray-900">{_count.bids}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Time Left
            </span>
            <span className="font-semibold text-red-600">{timeLeft()}</span>
          </div>
        </div>

        <button
          onClick={() => onViewDetails(id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          Place Bid
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
