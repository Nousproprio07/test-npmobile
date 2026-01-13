import { useState, useEffect } from "react";
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isSubmitted && !showSuccess) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setShowSuccess(true);
        setIsTransitioning(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, showSuccess]);

  const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxN4NJCQKDs_tzJPUoO32gMeD_8L1lpZlWd2zOeaslIidoQzxycHZWndGa5iw6WnSm9/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsLoading(true);
    
    try {
      if (GOOGLE_SHEET_WEBHOOK_URL) {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            email: email.trim(),
            date: new Date().toISOString(),
            source: "coming-soon"
          }),
        });
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      // On affiche quand même le succès car no-cors ne retourne pas de réponse
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-glacier/10 rounded-full blur-3xl sm:block hidden" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-np-blue/5 rounded-full blur-3xl sm:block hidden" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* Mobile: flex column to distribute space / Desktop: normal flow */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 
                      flex flex-col min-h-screen min-h-[100dvh] sm:block">
        
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-10 animate-fade-up shrink-0">
          <img src={logoImage} alt="NousProprio" className="h-14 sm:h-28 mx-auto" />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-12 shrink-0">
          <h1 className="font-display text-[1.4rem] leading-tight sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 animate-fade-up">
            Trouve ta direction immobilière{" "}
            <span className="relative inline-block whitespace-nowrap">
              en 3 minutes
              <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-0.5 sm:h-1 bg-accent/60 rounded-full" />
            </span>
          </h1>
          <p className="text-sm sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up-delay-1 leading-relaxed">
            Primo-accédant ou investisseur, obtiens ta feuille de route personnalisée 
            pour débloquer ton projet en toute confiance.
          </p>
        </div>

        {/* Steps - Responsive grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 mb-6 sm:mb-14 shrink-0">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative text-center animate-fade-up group"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="relative inline-block mb-2 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary via-primary to-glacier flex items-center justify-center shadow-lg mx-auto">
                  <step.icon className="w-5 h-5 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
                <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-np-red text-white text-[10px] sm:text-sm font-bold flex items-center justify-center shadow-md">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display font-bold text-foreground text-xs sm:text-lg mb-0.5 sm:mb-1 leading-tight px-1">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-[10px] sm:text-sm leading-tight px-1">
                {step.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Spacer for mobile to push card to bottom */}
        <div className="flex-1 sm:hidden" />

        {/* Waitlist Card */}
        <div className="relative animate-fade-up-delay-2 max-w-xl mx-auto w-full shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-glacier/20 to-np-blue/10 rounded-2xl blur-xl" />
          <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-card">
            <div className={`transition-all duration-400 ease-out ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              {!showSuccess ? (
                <>
                  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-np-blue/10 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-np-blue" />
                    </div>
                    <p className="font-display font-bold text-lg sm:text-2xl text-np-blue">
                      Disponible en Février
                    </p>
                  </div>
                  <p className="text-muted-foreground text-center mb-4 sm:mb-6 text-sm sm:text-base">
                    Inscris-toi pour être informé dès que notre offre sera disponible.
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="ton@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                      className="flex-1 h-12 sm:h-12 bg-background/50 text-base touch-manipulation"
                      autoComplete="email"
                      inputMode="email"
                    />
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="h-12 px-6 bg-np-blue hover:bg-np-blue/90 active:bg-np-blue/80 text-white font-semibold touch-manipulation transition-all duration-200"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi...
                        </span>
                      ) : "Je m'inscris"}
                    </Button>
                  </form>
                  <p className="text-[10px] sm:text-xs text-muted-foreground/60 text-center mt-3 sm:mt-4">
                    Pas de spam. Tu recevras uniquement les infos de lancement.
                  </p>
                </>
              ) : (
                <div className="text-center py-3 sm:py-4 animate-fade-up">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-bounce-subtle">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-foreground mb-2">
                    Bienvenue dans le cercle ! 🎉
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Tu fais partie des premiers à découvrir NousProprio. On t'envoie un accès prioritaire dès le lancement.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 sm:mt-12 text-center text-[10px] sm:text-xs text-muted-foreground/60 pb-4 sm:pb-0 shrink-0">
          © {new Date().getFullYear()} NousProprio. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
