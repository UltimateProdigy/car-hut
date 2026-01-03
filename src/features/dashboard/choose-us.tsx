import { DollarSign, Award, Tag, Wrench } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }: any) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 mb-4 flex items-center justify-center">
        <Icon className="w-12 h-12 text-gray-800" strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
        {description}
      </p>
    </div>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Special Financing Offers",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: Award,
      title: "Trusted Car Dealership",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: Tag,
      title: "Transparent Pricing",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
    {
      icon: Wrench,
      title: "Expert Car Service",
      description:
        "Our stress-free finance department that can find financial solutions to save you money.",
    },
  ];

  return (
    <div className="bg-gray-50 mb-30">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 pb-4 border-b-4 border-blue-500 inline-block">
            Why Choose Us?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
