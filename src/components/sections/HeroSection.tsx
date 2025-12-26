import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { ArrowRight, Menu, X, Check } from "lucide-react";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const benefits = [
    "Comprend ta situation réelle",
    "Évite les erreurs coûteuses",
    "Avance avec un plan clair"
  ];

  return (
    <section className="relative min-h-[100svh] bg-hero overflow-hidden flex flex-col">
      {/* Background pattern - optimized for mobile */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-0 w-48 md:w-72 h-48 md:h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-32 -left-10 w-64 md:w-96 h-64 md:h-96 bg-primary-foreground rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container relative z-10 pt-4 md:pt-8 flex-1 flex flex-col">
        {/* Header - compact on mobile */}
        <header className="flex items-center justify-between mb-8 md:mb-16">
          <Logo variant="light" />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/equipe" 
              className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors"
            >
              Équipe
            </Link>
            <Link to="/connexion">
              <Button variant="hero-outline" size="sm">
                Connexion
              </Button>
            </Link>
          </nav>

          {/* Mobile Burger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-primary-foreground active:scale-95 transition-transform"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-16 left-4 right-4 bg-card rounded-xl shadow-card border border-border p-4 z-50 animate-fade-up">
            <nav className="flex flex-col gap-3">
              <Link 
                to="/equipe" 
                className="text-primary font-medium py-3 px-4 rounded-lg bg-background border-2 border-primary text-center transition-colors active:bg-primary/10"
                onClick={() => setMenuOpen(false)}
              >
                Équipe
              </Link>
              <Link 
                to="/connexion" 
                className="text-primary-foreground font-medium py-3 px-4 rounded-lg bg-primary text-center transition-colors active:bg-primary/90"
                onClick={() => setMenuOpen(false)}
              >
                Connexion
              </Link>
            </nav>
          </div>
        )}

        {/* Hero content - centered vertically */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto text-center px-2 pb-20 md:pb-24">
          {/* Main headline */}
          <h1 className="font-display text-[1.75rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 animate-fade-up">
            Trouve la bonne direction pour ton projet immobilier{" "}
            <span className="relative inline-block whitespace-nowrap">
              en 3 minutes.
              <span className="absolute -bottom-0.5 md:-bottom-1 left-0 right-0 h-0.5 md:h-1 bg-glacier rounded-full" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/85 mb-6 md:mb-8 animate-fade-up-delay-1 leading-relaxed px-2">
            Un diagnostic intelligent pour comprendre où tu en es et savoir quoi faire maintenant.
          </p>

          {/* 3 bénéfices clés - stacked on mobile with nice cards */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-6 justify-center mb-8 md:mb-10 animate-fade-up-delay-2 px-4 sm:px-0">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 text-primary-foreground bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-3 sm:bg-transparent sm:backdrop-blur-none sm:p-0 sm:rounded-none"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-glacier flex items-center justify-center">
                  <Check className="w-3 h-3 text-glacier-foreground" strokeWidth={3} />
                </span>
                <span className="text-sm md:text-base font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Button - prominent on mobile */}
          <div className="flex justify-center animate-fade-up-delay-3 px-4">
            <Link to="/questionnaire" className="w-full sm:w-auto">
              <Button 
                variant="glacier" 
                size="lg" 
                className="group w-full text-base sm:text-lg py-6 sm:py-4 rounded-2xl sm:rounded-xl"
              >
                Démarrer mon diagnostic
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-16 md:h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
