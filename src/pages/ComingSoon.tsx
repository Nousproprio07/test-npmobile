import { Compass, ArrowRight } from "lucide-react";
import logoImage from "@/assets/Logo_Nousproprio.png";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-glacier/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-np-blue/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-up">
          <img src={logoImage} alt="NousProprio" className="h-12 mx-auto" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-np-blue/10 border border-np-blue/20 text-np-blue text-sm font-medium mb-8 animate-fade-up">
          <Compass className="w-4 h-4" />
          Nouveau site en préparation
        </div>

        {/* Main heading */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-up-delay-1">
          On refait tout.{" "}
          <span className="relative inline-block">
            En mieux.
            <span className="absolute -bottom-1 left-0 right-0 h-1 bg-accent/60 rounded-full" />
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-up-delay-2">
          NousProprio revient avec une nouvelle version, pensée pour t'aider à{" "}
          <span className="font-semibold text-foreground">
            trouver ta direction immobilière en 3 minutes.
          </span>
        </p>

        {/* Feature card */}
        <div className="relative animate-fade-up-delay-2 mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-glacier/20 to-np-blue/10 rounded-2xl blur-xl" />
          <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 shadow-card">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-np-blue/10 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-np-blue" />
              </div>
              <p className="font-display font-bold text-xl sm:text-2xl text-np-blue">
                Bientôt disponible
              </p>
            </div>
            <p className="text-muted-foreground">
              Une feuille de route personnalisée pour débloquer ton projet immobilier, 
              que tu sois primo-accédant ou investisseur.
            </p>
          </div>
        </div>


        {/* Footer */}
        <p className="mt-12 text-xs text-muted-foreground/60 animate-fade-up-delay-3">
          © {new Date().getFullYear()} NousProprio. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
