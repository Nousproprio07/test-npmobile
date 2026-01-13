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
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-glacier/10 rounded-full blur-3xl max-sm:w-40 max-sm:h-40 max-sm:top-10 max-sm:left-4" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-np-blue/5 rounded-full blur-3xl max-sm:w-48 max-sm:h-48 max-sm:bottom-10 max-sm:right-4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl max-sm:w-[300px] max-sm:h-[300px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:py-20 max-sm:py-6 max-sm:flex max-sm:flex-col max-sm:min-h-[100dvh]">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-up max-sm:mb-6">
          <img src={logoImage} alt="NousProprio" className="h-16 sm:h-20 mx-auto max-sm:h-12" />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 max-sm:mb-6">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight animate-fade-up max-sm:text-2xl max-sm:mb-3 max-sm:px-2">
            Ton projet immobilier mérite{" "}
            <span className="relative inline-block">
              une direction claire.
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-accent/60 rounded-full max-sm:h-0.5 max-sm:-bottom-0.5" />
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up-delay-1 max-sm:text-base max-sm:px-2">
            Primo-accédant ou investisseur, obtiens une feuille de route personnalisée 
            pour débloquer ton projet en toute confiance.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16 max-sm:gap-3 max-sm:mb-6">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="relative group animate-fade-up"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-glacier/10 to-np-blue/5 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-background/60 backdrop-blur-sm border border-border/50 rounded-xl p-5 sm:p-6 h-full hover:border-np-blue/30 transition-colors max-sm:p-4 max-sm:active:scale-[0.98] max-sm:touch-manipulation">
                <div className="flex items-start gap-4 max-sm:gap-3">
                  <div className="w-10 h-10 rounded-lg bg-np-blue/10 flex items-center justify-center flex-shrink-0 max-sm:w-9 max-sm:h-9">
                    <benefit.icon className="w-5 h-5 text-np-blue max-sm:w-4 max-sm:h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1 max-sm:text-sm max-sm:mb-0.5">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground max-sm:text-xs max-sm:leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Waitlist Card */}
        <div className="relative animate-fade-up-delay-2 max-w-xl mx-auto max-sm:mt-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-glacier/20 to-np-blue/10 rounded-2xl blur-xl" />
          <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 shadow-card max-sm:p-5 max-sm:rounded-xl">
            {!isSubmitted ? (
              <>
                <div className="flex items-center justify-center gap-3 mb-4 max-sm:gap-2 max-sm:mb-3">
                  <div className="w-10 h-10 rounded-full bg-np-blue/10 flex items-center justify-center max-sm:w-8 max-sm:h-8">
                    <ArrowRight className="w-5 h-5 text-np-blue max-sm:w-4 max-sm:h-4" />
                  </div>
                  <p className="font-display font-bold text-xl sm:text-2xl text-np-blue max-sm:text-lg">
                    Disponible en Février
                  </p>
                </div>
                <p className="text-muted-foreground text-center mb-6 max-sm:text-sm max-sm:mb-4">
                  Inscris-toi pour être informé dès que notre offre sera disponible.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="ton@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 bg-background/50 max-sm:h-12 max-sm:text-base max-sm:touch-manipulation"
                    autoComplete="email"
                    inputMode="email"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="h-12 px-6 bg-np-blue hover:bg-np-blue/90 text-white font-semibold max-sm:h-12 max-sm:touch-manipulation max-sm:active:bg-np-blue/80"
                  >
                    {isLoading ? "..." : "Je m'inscris"}
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground/60 text-center mt-4 max-sm:text-[10px] max-sm:mt-3">
                  Pas de spam. Tu recevras uniquement les infos de lancement.
                </p>
              </>
            ) : (
              <div className="text-center py-4 max-sm:py-2">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 max-sm:w-14 max-sm:h-14 max-sm:mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600 max-sm:w-7 max-sm:h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2 max-sm:text-lg">
                  Tu es sur la liste ! 🎉
                </h3>
                <p className="text-muted-foreground max-sm:text-sm">
                  On te contacte dès que c'est prêt. À très vite !
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-12 text-center text-xs text-muted-foreground/60 max-sm:mt-6 max-sm:text-[10px] max-sm:pb-4">
          © {new Date().getFullYear()} NousProprio. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
