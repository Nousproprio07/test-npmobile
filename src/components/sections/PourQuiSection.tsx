import { Target, ShieldCheck, Heart } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Perdu dans l'investissement ?",
    description: "Tu veux investir mais tu ne sais pas par où commencer. Les infos contradictoires te paralysent.",
  },
  {
    icon: ShieldCheck,
    title: "Tu cherches un repère fiable",
    description: "Pas un vendeur de formation. Un vrai accompagnement avec des experts qui ont eux-mêmes investi.",
  },
  {
    icon: Heart,
    title: "Tu veux de l'authentique",
    description: "Nos conseils ne dépendent pas de commissions. On te guide vers TON projet, pas vers nos partenaires.",
  },
];

const PourQuiSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Pour qui ?
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Si tu te reconnais ici,<br />
            <span className="text-accent">on est fait pour s'entendre.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-2xl bg-card-gradient border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-card"
            >
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PourQuiSection;
