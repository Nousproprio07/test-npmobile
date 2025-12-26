import { Compass } from "lucide-react";

const PourQuiSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6 md:mb-8">
            <Compass className="w-8 h-8 md:w-10 md:h-10 text-accent" />
          </div>

          {/* Titre principal */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 md:mb-8 leading-tight">
            Pourquoi tu es bloqué ?
          </h2>

          {/* Sous-titre accrocheur */}
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-foreground/90 mb-6 md:mb-8">
            Tu as un projet.{" "}
            <span className="text-accent">Mais pas le chemin pour y arriver.</span>
          </p>

          {/* Texte explicatif */}
          <div className="space-y-4 md:space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Aujourd'hui, la plupart des futurs investisseurs abandonnent non pas par manque d'argent,
              <br className="hidden sm:block" />
              <span className="font-semibold text-foreground"> mais par manque de direction.</span>
            </p>
            
            <div className="pt-2 md:pt-4">
              <p className="text-foreground font-medium text-lg sm:text-xl">
                NousProprio existe pour répondre à une seule question :
              </p>
              <p className="text-accent font-display font-bold text-xl sm:text-2xl mt-2">
                par quoi commencer quand on débute ?
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PourQuiSection;
