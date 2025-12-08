import { Shield, Handshake } from "lucide-react";

const PartenariatSection = () => {
  return (
    <section className="py-16 md:py-24 bg-hero relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-foreground rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-semibold mb-4">
            Partenariats 2026
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Des partenariats qui ne<br />
            <span className="text-accent">perturbent pas nos conseils.</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm">
              <Handshake className="w-6 h-6 text-primary-foreground" />
              <span className="font-medium text-primary-foreground">Partenariats libres</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm">
              <Shield className="w-6 h-6 text-accent" />
              <span className="font-medium text-primary-foreground">Zéro commission</span>
            </div>
          </div>

          <p className="text-primary-foreground/70 leading-relaxed">
            On développe pour 2026 des partenariats qui respectent notre philosophie. 
            Notre conseil reste authentique puisqu'il ne dépend pas de commissions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartenariatSection;