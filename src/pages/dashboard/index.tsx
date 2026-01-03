import BlogSection from "@/features/dashboard/blog-card";
import WhyChooseUs from "@/features/dashboard/choose-us";
import HeroSection from "@/features/dashboard/hero-section";
import SUVProductGrid from "@/features/dashboard/product-card";
import { Footer } from "@/features/footer";

export default function Dashboard() {
  return (
    <div>
      <HeroSection />
      <SUVProductGrid />
      <BlogSection />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
