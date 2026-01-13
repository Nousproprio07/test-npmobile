import { useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardCheck, BarChart3, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "@/assets/Logo_Nousproprio.png";

const steps = [
  { number: "01", icon: ClipboardCheck, title: "Questionnaire rapide", subtitle: "3 minutes chrono" },
  { number: "02", icon: BarChart3, title: "Analyse personnalisée", subtitle: "On décrypte ta situation" },
  { number: "03", icon: Navigation, title: "Ta feuille de route", subtitle: "Direction claire et actionnable" },
];


const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:py-16 max-sm:py-6 max-sm:flex max-sm:flex-col max-sm:min-h-[100dvh]">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-10 animate-fade-up max-sm:mb-5">
          <img src={logoImage} alt="NousProprio" className="h-16 sm:h-20 mx-auto max-sm:h-12" />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-12 max-sm:mb-6">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight animate-fade-up max-sm:text-xl max-sm:mb-3 max-sm:px-2">
            Trouve ta direction immobilière{" "}
            <span className="relative inline-block">
              en 3 minutes
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-accent/60 rounded-full max-sm:h-0.5 max-sm:-bottom-0.5" />
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up-delay-1 max-sm:text-sm max-sm:px-2">
            Primo-accédant ou investisseur, obtiens une feuille de route personnalisée 
            pour débloquer ton projet en toute confiance.
          </p>
        </div>

        {/* Steps - like OffreSection */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-10 sm:mb-14 max-sm:gap-2 max-sm:mb-6">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative text-center animate-fade-up group"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="relative inline-block mb-3 sm:mb-4 max-sm:mb-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary via-primary to-glacier flex items-center justify-center shadow-lg mx-auto max-sm:w-11 max-sm:h-11 max-sm:rounded-xl">
                  <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground max-sm:w-5 max-sm:h-5" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-np-red text-white text-xs sm:text-sm font-bold flex items-center justify-center shadow-md max-sm:w-5 max-sm:h-5 max-sm:text-[10px] max-sm:-top-1 max-sm:-right-1">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display font-bold text-foreground text-sm sm:text-lg mb-1 max-sm:text-[11px] max-sm:leading-tight max-sm:mb-0.5">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm max-sm:text-[10px] max-sm:leading-tight">
                {step.subtitle}
              </p>
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
