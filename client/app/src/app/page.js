import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedRecipesSection from "@/components/home/FeaturedRecipesSection";
import CallToActionSection from "@/components/home/CallToActionSection";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSection />
      <CategoriesSection />
      <FeaturedRecipesSection />
      <CallToActionSection />
    </div>
  );
}