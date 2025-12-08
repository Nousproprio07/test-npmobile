import HeroSection from "@/components/sections/HeroSection";
import PourQuiSection from "@/components/sections/PourQuiSection";
import OffreSection from "@/components/sections/OffreSection";
import FondateurSection from "@/components/sections/FondateurSection";
import PartenariatSection from "@/components/sections/PartenariatSection";
import CTASection from "@/components/sections/CTASection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PourQuiSection />
      <OffreSection />
      <FondateurSection />
      <PartenariatSection />
      <CTASection />
      <FooterSection />
    </main>
  );
};

export default Index;
