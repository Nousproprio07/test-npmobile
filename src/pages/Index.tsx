import HeroSection from "@/components/sections/HeroSection";
import PourQuiSection from "@/components/sections/PourQuiSection";
import DirectionsSection from "@/components/sections/DirectionsSection";
import CTASection from "@/components/sections/CTASection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PourQuiSection />
      <DirectionsSection />
      <CTASection />
      <FooterSection />
    </main>
  );
};

export default Index;
