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
      title: "Sessions FAQ en live",
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
            
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              On crée ta
              <span className="block mt-2 text-glacier-300">
                feuille de route
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Tu accèdes à tout ce qu'il faut pour{" "}
              <span className="text-white font-semibold">passer à l'action</span>, étape par étape
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mb-12 md:mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-3xl p-4 md:p-8 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 ${feature.bgGlow} rounded-xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Mobile: Icon + Title inline | Desktop: Stacked */}
                  <div className="flex items-center gap-3 md:flex-col md:items-start">
                    <div className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      <feature.icon className="w-5 h-5 md:w-8 md:h-8 text-white" />
                    </div>
                    
                    <div className="flex-1 md:mt-6">
                      <h3 className="text-lg md:text-2xl font-display font-bold text-white md:mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/70 leading-relaxed hidden md:block">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Description on mobile - below title */}
                  <p className="text-sm text-white/70 leading-relaxed mt-2 md:hidden">
                    {feature.description}
                  </p>
                  
                  {/* Arrow indicator */}
                  <button 
                    onClick={() => {
                      document.getElementById('boussole')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-3 md:mt-6 flex flex-col items-center gap-1 text-glacier-300 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-sm font-medium">Découvrir</span>
                    <ArrowRight className="w-4 h-4 rotate-90 hover:translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;
