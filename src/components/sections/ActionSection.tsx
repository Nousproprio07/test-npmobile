import { Video, MessageCircle, User, ChevronRight } from "lucide-react";

const ActionSection = () => {
  const features = [
    {
      icon: Video,
      title: "Des vidéos guidées pour avancer dans le bon ordre",
    },
    {
      icon: MessageCircle,
      title: "Une session questions-réponses en live chaque semaine pour débloquer vos points de friction et rester sur la bonne trajectoire",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-np-blue/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Une fois ta direction trouvée
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Tu accèdes à tout ce qu'il faut pour passer à l'action, étape par étape :
            </p>
          </div>

          {/* Main Feature - Personal Space */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                  Ton espace personnel
                </h3>
                <p className="text-muted-foreground">
                  Centralise ton parcours et tes prochaines étapes
                </p>
              </div>
            </div>
          </div>

          {/* Other Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-np-blue/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-np-blue" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium leading-relaxed">
                    {feature.title}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>

          {/* Objective */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-primary/5 border border-primary/20 rounded-full px-6 py-3">
              <p className="text-foreground font-medium">
                <span className="text-muted-foreground">Objectif :</span>{" "}
                <span className="text-primary font-bold">ne pas rester avec "une direction"</span>, mais un{" "}
                <span className="text-np-blue font-bold">chemin clair</span> pour la concrétiser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;
