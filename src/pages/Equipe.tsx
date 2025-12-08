import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, TrendingUp, GraduationCap, Building, LineChart, Shield, Home, Users, Code, Award, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  icon: React.ElementType;
  highlight?: string;
  isFounder?: boolean;
  parcours?: { icon: React.ElementType; label: string }[];
}

const teamMembers: TeamMember[] = [
  {
    name: "Alexandre",
    role: "Fondateur",
    description: "Un parcours complet au cœur de la finance pour vous accompagner avec expertise.",
    icon: Award,
    isFounder: true,
    parcours: [
      { icon: Building, label: "Recouvrement immobilier" },
      { icon: Briefcase, label: "Conseiller bancaire" },
      { icon: TrendingUp, label: "Gestion de patrimoine" },
      { icon: LineChart, label: "Finance de marché" },
      { icon: GraduationCap, label: "Enseignant en école de commerce" },
      { icon: Building2, label: "Investisseur immobilier" },
    ],
  },
  {
    name: "Valentine",
    role: "Compliance Officer",
    description: "Ancienne banquière, aujourd'hui spécialisée dans l'étude de la conformité bancaire.",
    icon: Shield,
    highlight: "Experte conformité",
  },
  {
    name: "Arold",
    role: "Conseiller en Gestion de Patrimoine",
    description: "Ancien développeur immobilier pendant 6 ans, aujourd'hui conseiller en gestion de patrimoine.",
    icon: Home,
    highlight: "6 ans en développement immobilier",
  },
  {
    name: "Sarah",
    role: "Directrice d'agence",
    description: "Une expertise terrain précieuse pour comprendre les réalités du marché immobilier.",
    icon: Users,
  },
  {
    name: "Johanna",
    role: "Conseillère Patrimoniale",
    description: "10 ans d'expérience, notamment dans le 16e arrondissement de Paris.",
    icon: TrendingUp,
    highlight: "10 ans d'expérience",
  },
  {
    name: "William",
    role: "Développeur",
    description: "Le créateur de cette plateforme, dédié à vous offrir la meilleure expérience digitale.",
    icon: Code,
  },
];

const Equipe = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-hero py-6 md:py-8">
        <div className="container">
          <header className="flex items-center justify-between mb-8 md:mb-12">
            <Logo variant="light" />
            <Link to="/">
              <Button variant="hero-outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Button>
            </Link>
          </header>

          <div className="max-w-2xl mx-auto text-center pb-8 md:pb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-semibold mb-4 animate-fade-up">
              Notre équipe
            </span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-4 animate-fade-up-delay-1">
              Des experts qui ont{" "}
              <span className="text-accent">vraiment investi.</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg animate-fade-up-delay-2">
              Une équipe pluridisciplinaire au service de votre réussite immobilière.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="grid gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`
                  bg-card rounded-2xl border border-border shadow-card overflow-hidden
                  animate-fade-up
                  ${member.isFounder ? 'md:col-span-2' : ''}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 md:p-8">
                  {/* Member Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
                      <member.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-accent font-semibold text-sm md:text-base">
                        {member.role}
                      </p>
                      {member.highlight && (
                        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                          {member.highlight}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {member.description}
                  </p>

                  {/* Founder Parcours */}
                  {member.isFounder && member.parcours && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
                        Parcours
                      </h4>
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {member.parcours.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border"
                          >
                            <item.icon className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-foreground">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-hero">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Prêt à être accompagné ?
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              Découvre l'accompagnement personnalisé qui correspond à ton projet.
            </p>
            <Link to="/questionnaire">
              <Button variant="hero" size="lg">
                Découvrir mon accompagnement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-foreground">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo variant="light" />
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              © 2024 NousProprio. Conseils indépendants pour investisseurs ambitieux.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Equipe;
