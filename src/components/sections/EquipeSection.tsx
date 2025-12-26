import { Building2, Landmark, CreditCard, Users } from "lucide-react";

const teamMembers = [
  { icon: Building2, role: "d'une directrice d'agence immobilière" },
  { icon: Users, role: "d'un ancien développeur immobilier" },
  { icon: CreditCard, role: "d'une experte en financement bancaire" },
  { icon: Landmark, role: "d'une ancienne banquière" },
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
        <div className="bg-card rounded-2xl p-6 md:p-10 shadow-card mb-8 md:mb-12">
          <p className="text-lg md:text-xl font-medium text-foreground mb-6">
            Notre équipe est composée :
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <member.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-foreground font-medium">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Highlight message */}
          <div className="border-l-4 border-primary pl-6 py-2">
            <p className="text-lg md:text-xl font-semibold text-foreground italic">
              Mais surtout, chacun de nous a déjà investi dans l'immobilier.
            </p>
          </div>
        </div>

        {/* Double expertise */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-10">
          <p className="text-lg md:text-xl font-medium text-foreground mb-6">
            Nous vous accompagnons avec une double expertise :
            <br />
            <span className="text-primary font-semibold">celle du terrain</span> et{" "}
            <span className="text-primary font-semibold">celle de la banque</span>
          </p>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
              <span className="text-muted-foreground text-base md:text-lg">
                pour comprendre votre projet
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
              <span className="text-muted-foreground text-base md:text-lg">
                parler votre langage
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2.5" />
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
