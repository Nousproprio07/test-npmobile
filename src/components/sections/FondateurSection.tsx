import { Briefcase, TrendingUp, GraduationCap, Building, LineChart, BookOpen } from "lucide-react";

const parcours = [
  { icon: Building, label: "Recouvrement immobilier" },
  { icon: Briefcase, label: "Conseiller bancaire" },
  { icon: TrendingUp, label: "Gestion de patrimoine" },
  { icon: LineChart, label: "Finance de marché" },
  { icon: GraduationCap, label: "Enseignant en école de commerce" },
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

          {/* Timeline parcours */}
          <div className="relative mb-12">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-5 md:gap-4">
              {parcours.map((item, index) => (
                <div key={index} className="relative flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary group-hover:border-primary transition-all duration-300 z-10">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-foreground leading-tight">
                    {item.label}
                  </span>
                  {index < parcours.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-1/2 w-full h-px bg-border" />
                  )}
                </div>
              ))}
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
              <span className="font-bold text-np-red-bright not-italic text-2xl md:text-3xl">'Personne ne nous a jamais appris à investir.'</span>"
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
