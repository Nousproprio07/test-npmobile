import { Video, MessageCircle, User, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const ActionSection = () => {
  const features = [
    {
      icon: User,
      title: "Ton espace personnel",
      description: "Centralise ton parcours et tes prochaines étapes",
      gradient: "from-primary to-primary/70",
      bgGlow: "bg-primary/20",
    },
    {
      icon: Video,
      title: "Des vidéos guidées",
      description: "Pour avancer dans le bon ordre, à ton rythme",
      gradient: "from-np-blue to-glacier-400",
      bgGlow: "bg-np-blue/20",
    },
    {
      icon: MessageCircle,
      title: "Sessions Q&A en live",
      description: "Chaque semaine pour débloquer tes points de friction",
      gradient: "from-glacier-500 to-glacier-300",
      bgGlow: "bg-glacier-400/20",
    },
  ];

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-np-blue via-np-blue/95 to-primary/90" />
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%),
                              radial-gradient(circle at 60% 80%, rgba(255,255,255,0.08) 0%, transparent 45%)`
          }}
        />
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glacier-400/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-glacier-200" />
              <span className="text-white/90 text-sm font-medium">Passe à l'action</span>
            </div>
            
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Une fois ta direction
              <span className="block mt-2 text-glacier-300">
                trouvée
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Tu accèdes à tout ce qu'il faut pour{" "}
              <span className="text-white font-semibold">passer à l'action</span>, étape par étape
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 ${feature.bgGlow} rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg md:text-2xl font-display font-bold text-white mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="mt-4 md:mt-6 flex items-center gap-2 text-glacier-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm font-medium">Découvrir</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Objective Banner */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-glacier-300 to-white flex items-center justify-center shadow-2xl">
                    <CheckCircle2 className="w-10 h-10 text-np-blue" />
                  </div>
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <p className="text-lg md:text-xl text-white/60 mb-2">Notre objectif</p>
                <p className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white leading-relaxed">
                    Ne pas rester avec <span className="text-white/80">"une direction"</span>,
                    <br className="hidden md:block" />
                    mais un <span className="text-glacier-300">chemin clair</span> pour la concrétiser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;
