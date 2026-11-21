import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutValuesSection from "@/components/about/AboutValuesSection";
import AboutCtaSection from "@/components/about/AboutCtaSection";

export default function AboutPage() {
  return (
    <div className="w-full">
      <AboutHeroSection />
      <AboutValuesSection />
      <AboutCtaSection />
    </div>
  );
}