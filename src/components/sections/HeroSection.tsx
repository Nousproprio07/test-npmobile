import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import { ArrowRight, Users, LogIn, Eye, ShieldCheck, Map } from "lucide-react";

const HeroSection = () => {

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

          {/* Mobile Navigation - Icons */}
          <nav className="md:hidden flex items-center gap-3">
            <Link 
              to="/equipe"
              className="p-2.5 rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
              aria-label="Équipe"
            >
              <Users className="w-5 h-5" />
            </Link>
            <Link 
              to="/connexion"
              className="p-2.5 rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
              aria-label="Connexion"
            >
              <LogIn className="w-5 h-5" />
            </Link>
          </nav>
        </header>

        {/* Hero content - centered vertically */}
        <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto text-center px-2 pb-20 md:pb-24">
          {/* Main headline */}
          <h1 className="font-display text-[1.75rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-8 md:mb-12 animate-fade-up">
            Trouve la bonne direction pour ton projet immobilier{" "}
            <span className="relative inline-block whitespace-nowrap">
              en 3 minutes.
              <span className="absolute -bottom-0.5 md:-bottom-1 left-0 right-0 h-0.5 md:h-1 bg-red-500 rounded-full" />
            </span>
          </h1>

          {/* 3 bénéfices clés - Mobile: vertical / Desktop: horizontal cards */}
          {/* Mobile layout */}
          <div className="flex flex-col items-center gap-4 mb-10 md:hidden animate-fade-up-delay-1">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-glacier/60" />
              <div className="w-9 h-9 rounded-full bg-glacier/10 flex items-center justify-center">
                <Eye className="w-4 h-4 text-glacier" />
              </div>
              <span className="text-base text-primary-foreground font-light tracking-wide">Comprend ta situation</span>
              <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-glacier/60" />
            </div>
            
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-glacier/60" />
              <div className="w-9 h-9 rounded-full bg-glacier/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-glacier" />
              </div>
              <span className="text-base text-primary-foreground font-light tracking-wide">Évite les erreurs</span>
              <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-glacier/60" />
            </div>
            
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-glacier/60" />
              <div className="w-9 h-9 rounded-full bg-glacier/10 flex items-center justify-center">
                <Map className="w-4 h-4 text-glacier" />
              </div>
              <span className="text-base text-primary-foreground font-light tracking-wide">Avance avec un plan</span>
              <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-glacier/60" />
            </div>
          </div>

          {/* Desktop layout - Horizontal cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-14 animate-fade-up-delay-1 px-4">
            <div className="group relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-glacier/10">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-glacier/20 flex items-center justify-center group-hover:bg-glacier/30 transition-colors">
                  <Eye className="w-7 h-7 text-glacier" />
                </div>
                <span className="text-lg text-primary-foreground font-medium tracking-wide">Comprend ta situation</span>
                <p className="text-sm text-primary-foreground/60 leading-relaxed">
                  Une feuille de route adaptée à ton profil et tes objectifs
                </p>
              </div>
            </div>
            
            <div className="group relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-glacier/10">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-glacier/20 flex items-center justify-center group-hover:bg-glacier/30 transition-colors">
                  <ShieldCheck className="w-7 h-7 text-glacier" />
                </div>
                <span className="text-lg text-primary-foreground font-medium tracking-wide">Évite les erreurs</span>
                <p className="text-sm text-primary-foreground/60 leading-relaxed">
                  Les pièges à éviter selon ta situation
                </p>
              </div>
            </div>
            
            <div className="group relative bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-glacier/10">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-glacier/20 flex items-center justify-center group-hover:bg-glacier/30 transition-colors">
                  <Map className="w-7 h-7 text-glacier" />
                </div>
                <span className="text-lg text-primary-foreground font-medium tracking-wide">Avance avec un plan</span>
                <p className="text-sm text-primary-foreground/60 leading-relaxed">
                  Des étapes claires pour concrétiser ton projet
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button - same style for all screens */}
          <div className="flex justify-center animate-fade-up-delay-3 px-4 max-w-md mx-auto">
            <Link to="/questionnaire" className="w-full">
              <Button 
                variant="glacier" 
                size="lg" 
                className="group w-full text-base py-6 rounded-2xl"
              >
                Découvrir ma direction
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 shrink-0 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 sm:h-16 md:h-auto" preserveAspectRatio="none">
          <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
