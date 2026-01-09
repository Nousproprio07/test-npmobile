import { Compass, ClipboardCheck, BarChart3, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "Un questionnaire simple",
    description: "Quelques minutes pour poser les bases de ton projet.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Une analyse de ta situation réelle",
    description: "On décortique tes finances, tes objectifs et tes contraintes.",
  },
  {
    icon: Navigation,
    number: "03",
    title: "Une restitution personnalisée",
    description: "Ta direction patrimoniale claire, adaptée à toi.",
  },
];

const OffreSection = () => {
  return (
    <section className="relative py-14 md:py-20 bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-glacier/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            La boussole{" "}
            <span className="text-primary">NousProprio</span>
          </h2>
          
          <p className="text-lg md:text-xl text-primary font-medium max-w-2xl mx-auto">
            On définit ton cap avant de te parler d'investissement.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid gap-4 md:gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-[39px] top-20 w-0.5 h-8 bg-gradient-to-b from-glacier/50 to-glacier/10" />
                )}
                
                <div className="flex gap-5 md:gap-8 p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-glacier/30 hover:bg-card/80 transition-all duration-500 group-hover:shadow-[0_8px_30px_-10px_hsl(var(--glacier)/0.3)]">
                  {/* Number & Icon */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary via-primary to-glacier flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <step.icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center shadow-md">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-glacier transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/questionnaire">
            <Button 
              variant="glacier" 
              size="xl"
              className="group"
            >
              <Compass className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform duration-300" />
              Définir mon cap
            </Button>
          </Link>
          <p className="mt-4 text-muted-foreground text-sm">
            Gratuit • 3 minutes • Sans engagement
          </p>
        </div>
      </div>
    </section>
  );
};

export default OffreSection;
