import { Home, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const directions = [
  {
    icon: Home,
    title: "Résidence Essentiel",
    tagline: "Construire intelligemment votre premier projet de vie.",
    description: "Pour celles et ceux qui veulent sécuriser leur avenir avant de chercher la rentabilité.",
  },
  {
    icon: TrendingUp,
    title: "Patrimoine Actif",
    tagline: "Transformer votre situation actuelle en source de revenus immobiliers.",
    description: "Courte durée, longue durée, premier investissement ou structuration de projet : votre direction dépend de votre profil, pas d'un modèle unique.",
  },
];

const DirectionsSection = () => {
  return (
    <section className="relative py-14 md:py-20 bg-muted/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-glacier/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Deux directions{" "}
            <span className="text-primary">possibles</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          {directions.map((direction, index) => (
            <div
              key={index}
              className="group relative p-8 md:p-10 rounded-3xl bg-card border border-border/50 hover:border-glacier/40 hover:shadow-[0_12px_40px_-12px_hsl(var(--glacier)/0.25)] transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary via-primary to-glacier flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <direction.icon className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-glacier transition-colors duration-300">
                {direction.title}
              </h3>
              
              <p className="text-primary font-medium text-lg mb-4">
                {direction.tagline}
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                {direction.description}
              </p>

              {/* Hover arrow */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-6 h-6 text-glacier" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/questionnaire">
            <Button 
              variant="glacier" 
              size="xl"
              className="group"
            >
              Découvrir ma direction
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DirectionsSection;
