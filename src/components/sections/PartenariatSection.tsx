import { Shield, Handshake } from "lucide-react";

const PartenariatSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Partenariats 2026
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Des partenariats qui ne<br />
            <span className="text-primary">perturbent pas nos conseils.</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border">
              <Handshake className="w-6 h-6 text-primary" />
              <span className="font-medium text-foreground">Partenariats libres</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border">
              <Shield className="w-6 h-6 text-accent" />
              <span className="font-medium text-foreground">Zéro commission</span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            On développe pour 2026 des partenariats qui respectent notre philosophie. 
            Notre conseil reste authentique puisqu'il ne dépend pas de commissions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartenariatSection;
