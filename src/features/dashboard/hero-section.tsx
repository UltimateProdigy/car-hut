import { Fuel, Gauge, Calendar, Settings } from 'lucide-react';
import bgIcon from "@/assets/images/car_bg.svg"
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <div className="relative h-[100vh] w-full">
      <div className="absolute inset-0 bg-gray-900">
        <img src={bgIcon} alt="" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>
      <div className="relative h-full  mx-auto px-4 sm:px-6 lg:px-38">
        <div className="h-full flex items-center justify-between">
          <div className="text-white max-w-xl">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Ranger Black –
            </h2>
            <h3 className="text-5xl md:text-6xl font-bold mb-6">2021</h3>
            <p className="text-4xl md:text-5xl font-bold">$165,000</p>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white min-w-[280px]">
              <div className="space-y-6">
                <div className="flex flex-col items-center">
                  <Fuel className="w-8 h-8 mb-2" />
                  <p className="text-sm text-gray-300">Fuel Type</p>
                  <p className="text-lg font-semibold">Petrol</p>
                </div>
                <div className="flex flex-col items-center">
                  <Gauge className="w-8 h-8 mb-2" />
                  <p className="text-sm text-gray-300">Mileage</p>
                  <p className="text-lg font-semibold">250 Miles</p>
                </div>
                <div className="flex flex-col items-center">
                  <Settings className="w-8 h-8 mb-2" />
                  <p className="text-sm text-gray-300">Transmission</p>
                  <p className="text-lg font-semibold">Manual</p>
                </div>
                <div className="flex flex-col items-center">
                  <Calendar className="w-8 h-8 mb-2" />
                  <p className="text-sm text-gray-300">Year</p>
                  <p className="text-lg font-semibold">2021</p>
                </div>
                <Button 
                  className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full py-6 font-semibold"
                >
                  Learn More
                  <svg 
                    className="w-5 h-5 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden absolute bottom-8 left-4 right-4">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <Fuel className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs text-gray-300">Fuel Type</p>
              <p className="text-sm font-semibold">Petrol</p>
            </div>
            <div className="text-center">
              <Gauge className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs text-gray-300">Mileage</p>
              <p className="text-sm font-semibold">250 Miles</p>
            </div>
            <div className="text-center">
              <Settings className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs text-gray-300">Transmission</p>
              <p className="text-sm font-semibold">Manual</p>
            </div>
            <div className="text-center">
              <Calendar className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs text-gray-300">Year</p>
              <p className="text-sm font-semibold">2021</p>
            </div>
          </div>
          <Button 
            className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-full py-5 font-semibold"
          >
            Learn More
            <svg 
              className="w-4 h-4 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}