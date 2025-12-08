import { Briefcase, TrendingUp, GraduationCap, Building, LineChart, BookOpen, Home } from "lucide-react";

const parcours = [
  { icon: Building, label: "Recouvrement immobilier" },
  { icon: Briefcase, label: "Conseiller bancaire" },
  { icon: TrendingUp, label: "Gestion de patrimoine" },
  { icon: LineChart, label: "Finance de marché" },
  { icon: GraduationCap, label: "Enseignant en école de commerce" },
  { icon: Home, label: "Investisseur immobilier" },
];

const FondateurSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              Le fondateur
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Un parcours au cœur<br />
              <span className="text-accent">de la finance.</span>
            </h2>
          </div>

          {/* Timeline parcours - Mobile: 2 columns with connecting lines */}
          <div className="relative mb-12">
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="grid grid-cols-2 gap-x-4 gap-y-6 relative">
                {parcours.map((item, index) => {
                  // Lignes horizontales : 0→1, 2→3, 4→5
                  const showHorizontalLine = index % 2 === 0 && index < parcours.length - 1;
                  // Lignes verticales : 1→2 (index 1) et 2→4 via 3 (index 2 seulement, pas index 3)
                  const showVerticalLine = index === 1;
                  
                  return (
                    <div key={index} className="relative flex flex-col items-center text-center group">
                      {/* Horizontal line (left to right) */}
                      {showHorizontalLine && (
                        <div className="absolute top-6 left-1/2 w-[calc(100%+1rem)] h-0.5 bg-border z-0" />
                      )}
                      {/* Vertical line (right going down to next row) */}
                      {showVerticalLine && (
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-0.5 h-[calc(100%+1.5rem)] bg-border z-0" />
                      )}
                      <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-2 group-hover:bg-primary group-hover:border-primary transition-all duration-300 z-10 relative bg-background">
                        <item.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <span className="text-xs font-medium text-foreground leading-tight px-1">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute top-7 left-[8%] right-[8%] h-0.5 bg-border" />
                
                <div className="grid grid-cols-6 gap-4">
                  {parcours.map((item, index) => (
                    <div key={index} className="relative flex flex-col items-center text-center group">
                      <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:border-primary transition-all duration-300 z-10 bg-background">
                        <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-foreground leading-tight">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pourquoi */}
          <div className="bg-hero rounded-2xl p-6 md:p-10 text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="w-10 h-10 text-accent" />
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-4">
              Mon pourquoi
            </h3>
            <blockquote className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed italic mb-4">
              "Que plus personne ne dise :<br />
              <span className="font-bold text-np-red-bright not-italic text-2xl md:text-3xl">Personne ne nous a jamais appris à investir.</span>"
            </blockquote>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              Les banques prêtent à ceux qui ont du capital. Je veux aider nos clients à créer le leur. 
              Partager les connaissances est la meilleure arme pour s'élever ensemble.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FondateurSection;