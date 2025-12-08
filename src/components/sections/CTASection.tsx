import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-foreground rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Prêt à définir<br />
            <span className="text-accent">ton accompagnement ?</span>
          </h2>
          
          <p className="text-lg text-primary-foreground/80 mb-8">
            Réponds à notre questionnaire interactif et découvre l'accompagnement adapté à ton projet.
          </p>

          <Button variant="hero" size="xl" className="group mb-4 animate-pulse-glow">
            Commencer le questionnaire
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Button>

          <div className="flex items-center justify-center gap-2 text-primary-foreground/70">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Moins de 2 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
