import { useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import PourQuiSection from "@/components/sections/PourQuiSection";
import OffreSection from "@/components/sections/OffreSection";
import DirectionsSection from "@/components/sections/DirectionsSection";
import EquipeSection from "@/components/sections/EquipeSection";
import ActionSection from "@/components/sections/ActionSection";
import CTASection from "@/components/sections/CTASection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  // Handle scroll to top when returning from FAQ
  useEffect(() => {
    const shouldScrollToTop = sessionStorage.getItem('scrollToTop');
    if (shouldScrollToTop === 'true') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      sessionStorage.removeItem('scrollToTop');
    }
  }, []);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <PourQuiSection />
      <OffreSection />
      <ActionSection />
      <DirectionsSection />
      <EquipeSection />
      <CTASection />
      <FooterSection />
    </main>
  );
};

export default Index;
