import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Calendar, Users, BookOpen, MessageSquare } from "lucide-react";
import Logo from "@/components/Logo";

const Resultat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const answers = location.state?.answers || {};
  const prenom = answers.prenom || "Ami(e)";

  useEffect(() => {
    if (!location.state?.answers) {
      navigate("/");
      return;
    }
    
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  // Determine accompaniment based on answers
  const getAccompaniment = () => {
    const connaissance = answers.connaissance;
    const horizon = answers.horizon;
    
    if (connaissance === "Débutant complet" || connaissance === "J'ai quelques notions") {
      return {
        type: "Accompagnement Découverte",
        description: "Un programme complet pour poser des bases solides et comprendre l'investissement immobilier de A à Z.",
        features: [
          "4 lives privés par mois pour maîtriser les fondamentaux",
          "Accès à notre communauté d'investisseurs débutants",
          "Guide complet : de l'idée au premier investissement",
          "Sessions Q&A avec nos experts bancaires"
        ]
      };
    } else if (horizon === "Dans les 3 prochains mois" || horizon === "D'ici 6 mois") {
      return {
        type: "Accompagnement Accéléré",
        description: "Tu es prêt à passer à l'action. On t'accompagne intensivement jusqu'à ton premier investissement.",
        features: [
          "Coaching personnalisé hebdomadaire",
          "Analyse de ton dossier bancaire",
          "Stratégie d'investissement sur-mesure",
          "Accès prioritaire à nos experts"
        ]
      };
    } else {
      return {
        type: "Accompagnement Premium",
        description: "Un accompagnement complet pour structurer et optimiser ta stratégie patrimoniale.",
        features: [
          "Lives privés illimités",
          "Coaching individuel mensuel",
          "Accès à notre réseau de professionnels",
          "Suivi personnalisé de ton projet"
        ]
      };
    }
  };

  const accompaniment = getAccompaniment();

  return (
    <div className="min-h-screen bg-background">
      {/* Header section with gradient */}
      <div className="bg-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10 py-6">
          <header className="flex items-center justify-between mb-12">
            <Logo variant="light" />
          </header>

          <div className={`max-w-2xl mx-auto text-center pb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-6">
              <CheckCircle2 className="w-4 h-4" />
              Analyse terminée
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              <span className="text-accent">{prenom}</span>, on te connaît sûrement plus que ton banquier !
            </h1>
            
            <p className="text-lg text-primary-foreground/80">
              Voici l'accompagnement qui te correspond
            </p>
          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </div>

      {/* Accompaniment card */}
      <div className="container py-8 md:py-12">
        <div className={`max-w-2xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elegant border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wide">Recommandé pour toi</span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">{accompaniment.type}</h2>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6">
              {accompaniment.description}
            </p>

            <div className="space-y-3 mb-8">
              {accompaniment.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <Button variant="cta" size="lg" className="w-full group">
              Réserver mon appel découverte
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Additional benefits */}
          <div className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground text-sm">Lives privés</h3>
              <p className="text-xs text-muted-foreground">Chaque semaine</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <BookOpen className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground text-sm">Formation</h3>
              <p className="text-xs text-muted-foreground">Accès illimité</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <MessageSquare className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground text-sm">Support</h3>
              <p className="text-xs text-muted-foreground">Experts disponibles</p>
            </div>
          </div>

          {/* Trust badge */}
          <div className={`mt-8 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-muted-foreground">
              💡 100% indépendant • Aucune commission • Conseils authentiques
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultat;
