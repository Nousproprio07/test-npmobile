import { Compass, ArrowDown } from "lucide-react";

const PourQuiSection = () => {
  return (
    <section className="relative py-14 md:py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-glacier/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-np-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge animé */}
          <div className="flex justify-center mb-8 animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-np-blue/10 border border-np-blue/20 text-np-blue text-sm font-medium">
              <Compass className="w-4 h-4" />
              Le vrai problème
            </span>
          </div>

          {/* Titre principal avec accent */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-12 leading-tight animate-fade-up-delay-1">
            Pourquoi es-tu{" "}
            <span className="text-red-500">bloqué</span>
            <span className="text-accent"> ?</span>
          </h2>

          {/* Card centrale glassmorphism */}
          <div className="relative animate-fade-up-delay-2">
            <div className="absolute inset-0 bg-gradient-to-br from-glacier/20 to-np-blue/10 rounded-3xl blur-xl" />
            <div className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 md:p-12 shadow-card">

              {/* Texte explicatif */}
              <div className="space-y-6 text-center">
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Aujourd'hui, la plupart des futurs investisseurs abandonnent non pas par manque d'argent,{" "}
                  <span className="font-semibold text-foreground">
                    mais par manque de direction.
                  </span>
                </p>

                <p className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-foreground leading-relaxed">
                  Tu as un projet.{" "}
                  <span className="text-glacier-foreground bg-glacier/30 px-2 py-1 rounded-lg">
                    Mais pas le cap
                  </span>{" "}
                  pour y arriver.
                </p>

                {/* Bloc NousProprio */}
                <div className="pt-4 md:pt-6">
                  <div className="inline-flex flex-col items-center gap-3 p-4 sm:p-6 rounded-2xl bg-np-blue/5 border border-np-blue/10">
                    <p className="font-display font-bold text-lg sm:text-xl md:text-2xl text-np-blue">
                      NousProprio t'apporte la solution
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicateur scroll */}
          <div className="flex justify-center mt-8 md:mt-10 animate-fade-up-delay-3">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
              <span className="text-xs uppercase tracking-widest">Découvrir</span>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PourQuiSection;
