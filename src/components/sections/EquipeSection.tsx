const teamMembers = [
  "Une directrice d'agence immobilière",
  "Un ancien développeur immobilier",
  "Une experte en financement bancaire",
  "Une ancienne banquière",
];

const EquipeSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Section 5
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Une équipe qui a déjà fait le chemin
          </h2>
        </div>

        {/* Team composition */}
        <div className="mb-8 md:mb-12">
          <p className="text-lg md:text-xl font-medium text-foreground mb-8 text-center">
            Notre équipe est composée de :
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-[hsl(var(--np-blue))] rounded-2xl p-6 text-white shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                <p className="text-lg md:text-xl font-semibold">{member}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight message */}
        <div className="bg-card rounded-2xl p-6 md:p-10 shadow-card mb-8 md:mb-12 border-l-4 border-primary">
          <p className="text-xl md:text-2xl font-bold text-foreground italic text-center">
            Mais surtout, chacun de nous a déjà investi dans l'immobilier.
          </p>
        </div>

        {/* Double expertise */}
        <div className="bg-gradient-to-br from-[hsl(var(--np-blue)/0.1)] to-[hsl(var(--glacier)/0.1)] rounded-2xl p-6 md:p-10">
          <p className="text-lg md:text-xl font-medium text-foreground mb-6 text-center">
            Nous vous accompagnons avec une double expertise :
            <br />
            <span className="text-[hsl(var(--np-blue))] font-bold">celle du terrain</span> et{" "}
            <span className="text-[hsl(var(--glacier))] font-bold">celle de la banque</span>
          </p>
          
          <ul className="space-y-3 max-w-md mx-auto">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[hsl(var(--np-blue))] mt-2.5" />
              <span className="text-muted-foreground text-base md:text-lg">
                pour comprendre votre projet
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[hsl(var(--np-blue))] mt-2.5" />
              <span className="text-muted-foreground text-base md:text-lg">
                parler votre langage
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[hsl(var(--np-blue))] mt-2.5" />
              <span className="text-muted-foreground text-base md:text-lg">
                et vous guider avec des conseils concrets
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EquipeSection;
