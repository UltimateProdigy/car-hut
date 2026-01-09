import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useCar } from "@/api/car";
import Loader from "@/components/loader";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "@/features/footer";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: car, isLoading } = useCar(id as string);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [bidAmount, setBidAmount] = useState<string>("");

  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 34,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePlaceBid = () => {
    if (bidAmount) {
      alert(`Bid placed: $${parseInt(bidAmount).toLocaleString()}`);
      setBidAmount("");
    }
  };

  if (isLoading) return <Loader />;
  if (!car) return <div>No car found.</div>;

  const images = car.images || [];
  const hasImages = images.length > 0;

  return (
    <>
      <div className="min-h-screen bg-gray-50 mt-25">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Auctions
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {car.name} {car.model} {car.year}
            </h1>
            <p className="text-gray-600 mt-1">
              {car.engine_size} | {car.transmission} | {car.color}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="relative h-96 bg-gray-200 rounded-xl mb-4">
                  {hasImages ? (
                    <img
                      src={images[currentImage]}
                      alt={car.name}
                      className="object-cover w-full h-full rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Images Available
                    </div>
                  )}
                  <button
                    onClick={() =>
                      setCurrentImage((prev) =>
                        prev > 0 ? prev - 1 : images.length - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
                    disabled={!hasImages}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImage((prev) =>
                        prev < images.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
                    disabled={!hasImages}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {images?.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`h-24 bg-gray-200 rounded-lg cursor-pointer flex items-center justify-center text-xs text-gray-400 ${
                        currentImage === idx ? "ring-2 ring-blue-600" : ""
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx}`}
                        className="object-cover h-full w-full rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">NAME</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.name}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">LOGO</span>
                    <img width={70} src={car?.brand?.logo} />
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">YEAR</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.year}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">MILEAGE</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.mileage}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">LOCATION</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.location}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">MODEL</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.model}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">BRAND</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.brand?.name}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">FUEL TYPE</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.fuel_type}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">TRANSMISSION</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.transmission}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">ENGINE SIZE</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.engine_size}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">HORSE POWER</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.horsepower}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">BUY NOW PRICE</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      ${car?.buy_now_price}
                    </p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <span className="text-sm text-gray-600">FEATURES</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {car?.features?.map((feature) => feature.name).join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {car?.description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Auction Ending In</span>
                </div>
                <div className="flex justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </div>
                    <div className="text-xs opacity-90">Hours</div>
                  </div>
                  <div className="text-4xl font-bold">:</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </div>
                    <div className="text-xs opacity-90">Minutes</div>
                  </div>
                  <div className="text-4xl font-bold">:</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </div>
                    <div className="text-xs opacity-90">Seconds</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="mb-6">
                  <span className="text-sm text-gray-600">Current Bid</span>
                  <div className="text-4xl font-bold text-gray-900 mt-1">
                    $
                    {car?.current_bid
                      ? car?.current_bid.toLocaleString()
                      : "N/A"}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">23 bids placed</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Bid Amount (Minimum: $
                    {car?.current_bid ? car?.current_bid + 500 : "N/A"})
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                      $
                    </span>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder={`${
                        car?.current_bid ? car?.current_bid + 500 : "N/A"
                      }`}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePlaceBid}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors mb-3"
                >
                  Place Bid
                </button>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Auction ends:{" "}
                    {new Date(car?.auction_end_date).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">
                  Seller Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Dealer Name</span>
                    <p className="font-semibold text-gray-900">
                      {car?.user?.username}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Rating</span>
                    <p className="font-semibold text-gray-900">
                      4.8 ⭐ (234 reviews)
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <span className="text-sm text-gray-600">Location</span>
                      <p className="font-semibold text-gray-900">
                        {car?.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Bid History</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {car?.bids?.map((bid, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {bid.user}
                        </p>
                        <p className="text-xs text-gray-500">{bid.time}</p>
                      </div>
                      <span className="font-bold text-gray-900">
                        ${bid.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
