import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { ArrowRight, Menu, X } from "lucide-react";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen bg-hero overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container relative z-10 pt-6 pb-16 md:pt-8 md:pb-24">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 md:mb-20">
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
            className="md:hidden p-2 text-primary-foreground"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-20 left-4 right-4 bg-card rounded-xl shadow-card border border-border p-4 z-50 animate-fade-up">
            <nav className="flex flex-col gap-3">
              <Link 
                to="/equipe" 
                className="text-primary font-medium py-2 px-4 rounded-lg bg-background border-2 border-primary text-center transition-colors hover:bg-primary/5"
                onClick={() => setMenuOpen(false)}
              >
                Équipe
              </Link>
              <Link 
                to="/connexion" 
                className="text-primary-foreground font-medium py-2 px-4 rounded-lg bg-primary text-center transition-colors hover:bg-primary/90"
                onClick={() => setMenuOpen(false)}
              >
                Connexion
              </Link>
            </nav>
          </div>
        )}

        {/* Hero content */}
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up">
            Trouve la bonne direction pour ton projet immobilier{" "}
            <span className="relative inline-block">
              en 3 minutes.
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-accent rounded-full" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-up-delay-1 leading-relaxed">
            Un diagnostic intelligent pour comprendre où tu en es et savoir quoi faire maintenant.
          </p>

          {/* 3 bénéfices clés */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center mb-10 animate-fade-up-delay-2">
            <div className="flex items-center gap-2 text-primary-foreground">
              <span className="text-glacier text-xl">✔️</span>
              <span className="text-sm md:text-base">Comprend ta situation réelle</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground">
              <span className="text-glacier text-xl">✔️</span>
              <span className="text-sm md:text-base">Évite les erreurs coûteuses</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground">
              <span className="text-glacier text-xl">✔️</span>
              <span className="text-sm md:text-base">Avance avec un plan clair</span>
            </div>
          </div>

          <div className="flex justify-center animate-fade-up-delay-3 px-4">
            <Link to="/questionnaire" className="w-full sm:w-auto">
              <Button variant="glacier" size="lg" className="group w-full">
                Démarrer mon diagnostic
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0 hidden sm:block" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
