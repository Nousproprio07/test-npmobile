import { Video, Brain, Building2, Users } from "lucide-react";

const offerings = [
  {
    icon: Video,
    title: "Lives privés chaque semaine",
    description: "Accède à nos sessions exclusives où on répond à tes questions en direct.",
  },
  {
    icon: Brain,
    title: "Pense comme un investisseur",
    description: "Développe les réflexes et la mentalité qui font la différence.",
  },
  {
    icon: Building2,
    title: "Comprends la banque",
    description: "Sache enfin comment fonctionne le crédit et utilise-le à ton avantage.",
  },
  {
    icon: Users,
    title: "Experts à tes côtés",
    description: "Des pros de la banque et de l'immobilier qui ont eux-mêmes investi.",
  },
];

const OffreSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            L'accompagnement
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            À quoi t'attendre<br />
            <span className="text-primary">avec nous ?</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {offerings.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 p-5 md:p-6 rounded-xl bg-card border border-border hover:shadow-soft transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffreSection;
