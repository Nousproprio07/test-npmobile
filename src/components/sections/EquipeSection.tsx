import { Users, ArrowRight, Building2, HardHat, Wallet, Landmark, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const teamMembers: { role: string; icon: LucideIcon }[] = [
  { role: "Une directrice d'agence immobilière", icon: Building2 },
  { role: "Un ancien développeur immobilier", icon: HardHat },
  { role: "Une experte en financement bancaire", icon: Wallet },
  { role: "Une ancienne banquière", icon: Landmark },
];

const expertises = [
  "Comprendre ton projet",
  "Parler ton langage",
  "Te guider avec des conseils concrets",
];

const EquipeSection = () => {
  return (
    <section className="relative py-14 md:py-20 bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-glacier/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">L'équipe</span>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Une équipe qui a déjà{" "}
            <span className="text-primary">fait le chemin</span>
          </h2>
        </div>

        {/* Main card */}
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-glacier/30 transition-all duration-500 hover:shadow-[0_8px_30px_-10px_hsl(var(--glacier)/0.3)]">
            
            {/* Team members */}
            <p className="text-lg md:text-xl font-medium text-foreground mb-6">
              Notre équipe est composée de :
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
              {teamMembers.map((member, index) => {
                const IconComponent = member.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-gradient-to-br from-primary via-primary to-glacier text-primary-foreground group hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <p className="font-medium text-base md:text-lg">{member.role}</p>
                  </div>
                );
              })}
            </div>

            {/* Highlight message */}
            <div className="relative p-6 md:p-8 rounded-2xl bg-glacier/10 border border-glacier/20 mb-8">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-glacier text-glacier-foreground text-xs font-bold rounded-full">
                Le plus important
              </div>
              <p className="text-xl md:text-2xl font-bold text-foreground text-center pt-2">
                Chacun de nous a déjà investi dans l'immobilier.
              </p>
            </div>

            {/* Double expertise */}
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl text-foreground mb-2">
                Nous t'accompagnons avec une double expertise :
              </p>
              <p className="text-xl md:text-2xl font-bold">
                <span className="text-primary">celle du terrain</span>
                <span className="text-muted-foreground mx-2">et</span>
                <span className="text-glacier">celle de la banque</span>
              </p>
            </div>

            {/* Expertise points */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6">
              {expertises.map((expertise, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-foreground font-medium text-sm md:text-base">{expertise}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/equipe">
            <Button 
              variant="glacier" 
              size="xl"
              className="group"
            >
              Découvrir l'équipe
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EquipeSection;
