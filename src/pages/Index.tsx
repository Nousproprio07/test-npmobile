import HeroSection from "@/components/sections/HeroSection";
import PourQuiSection from "@/components/sections/PourQuiSection";
import OffreSection from "@/components/sections/OffreSection";
import DirectionsSection from "@/components/sections/DirectionsSection";
import EquipeSection from "@/components/sections/EquipeSection";
import ActionSection from "@/components/sections/ActionSection";
import CTASection from "@/components/sections/CTASection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PourQuiSection />
      <OffreSection />
      <DirectionsSection />
      <EquipeSection />
      <ActionSection />
      <CTASection />
      <FooterSection />
    </main>
  );
};

export default Index;
