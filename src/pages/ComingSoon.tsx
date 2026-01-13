import { useState } from "react";
import { ArrowRight, CheckCircle2, Target, Clock, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "@/assets/Logo_Nousproprio.png";

const benefits = [
  {
    icon: Target,
    title: "Ta direction en 3 minutes",
    description: "Un bilan personnalisé pour savoir exactement par où commencer."
  },
  {
    icon: Clock,
    title: "Gagne des mois de recherche",
    description: "Plus besoin de chercher partout, on te donne une feuille de route claire."
  },
  {
    icon: TrendingUp,
    title: "Maximise ta capacité d'achat",
    description: "Découvre les stratégies pour optimiser ton budget et ton financement."
  },
  {
    icon: Users,
    title: "Ta feuille de route personnalisée",
    description: "Une équipe d'experts terrain et bancaire à tes côtés."
  }
];

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    setIsSubmitted(true);
    console.log("Email inscrit (mock):", email);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decorative elements - reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-4 sm:top-20 sm:left-10 w-40 sm:w-64 h-40 sm:h-64 bg-glacier/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-4 sm:bottom-20 sm:right-10 w-48 sm:w-80 h-48 sm:h-80 bg-np-blue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20 flex flex-col min-h-screen min-h-[100dvh]">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-10 animate-fade-up">
          <img src={logoImage} alt="NousProprio" className="h-12 sm:h-16 md:h-20 mx-auto" />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight animate-fade-up px-2">
            Ton projet immobilier mérite{" "}
            <span className="relative inline-block">
              une direction claire.
              <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-0.5 sm:h-1 bg-accent/60 rounded-full" />
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up-delay-1 px-2">
            Primo-accédant ou investisseur, obtiens une feuille de route personnalisée 
            pour débloquer ton projet en toute confiance.
          </p>
        </div>

        {/* Benefits Grid - Optimized for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16 flex-grow">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="relative group animate-fade-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-glacier/10 to-np-blue/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-5 md:p-6 h-full active:scale-[0.98] sm:hover:border-np-blue/30 transition-all touch-manipulation">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-np-blue/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-np-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground mb-0.5 sm:mb-1 text-sm sm:text-base">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Waitlist Card - Mobile optimized */}
        <div className="relative animate-fade-up-delay-2 max-w-xl mx-auto w-full mt-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-glacier/20 to-np-blue/10 rounded-2xl blur-xl" />
          <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-card">
            {!isSubmitted ? (
              <>
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-np-blue/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-np-blue" />
                  </div>
                  <p className="font-display font-bold text-lg sm:text-xl md:text-2xl text-np-blue">
                    Disponible en Février
                  </p>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground text-center mb-4 sm:mb-6">
                  Inscris-toi pour être informé dès que notre offre sera disponible.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <Input
                    type="email"
                    placeholder="ton@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 sm:h-14 bg-background/50 text-base touch-manipulation"
                    autoComplete="email"
                    inputMode="email"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="h-12 sm:h-14 px-6 bg-np-blue hover:bg-np-blue/90 active:bg-np-blue/80 text-white font-semibold text-base touch-manipulation"
                  >
                    {isLoading ? "..." : "Je m'inscris"}
                  </Button>
                </form>
                <p className="text-[10px] sm:text-xs text-muted-foreground/60 text-center mt-3 sm:mt-4">
                  Pas de spam. Tu recevras uniquement les infos de lancement.
                </p>
              </>
            ) : (
              <div className="text-center py-2 sm:py-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-2">
                  Tu es sur la liste ! 🎉
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  On te contacte dès que c'est prêt. À très vite !
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 sm:mt-8 md:mt-12 text-center text-[10px] sm:text-xs text-muted-foreground/60 pb-safe">
          © {new Date().getFullYear()} NousProprio. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
