import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Calendar, Users, BookOpen, MessageSquare, Phone, ShoppingCart, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";

const Resultat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const answers = location.state?.answers || {};
  const prenom = answers.prenom || "Ami(e)";

  useEffect(() => {
    if (!location.state?.answers) {
      navigate("/");
      return;
    }
    
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  // Determine accompaniment based on answers
  const getAccompaniment = () => {
    const objectif = answers.objectif;
    
    // Pack Résidentiel - Résidence principale
    if (objectif === "Avoir une résidence principale") {
      return {
        type: "Résidence Essentiel",
        tagline: "Ton premier chez-toi, en toute confiance",
        description: "Un accompagnement dédié pour concrétiser l'achat de ta résidence principale, de la recherche au financement.",
        features: [
          "Simulation personnalisée de ta capacité d'emprunt",
          "Accompagnement dans les démarches bancaires",
          "Guide complet pour négocier ton premier achat",
          "Accès aux lives privés hebdomadaires"
        ],
        price: "297€",
        priceDetail: "Paiement unique"
      };
    }
    
    // Pack Investir - Constitution de patrimoine ou revenus complémentaires
    if (objectif === "Me constituer un patrimoine" || objectif === "Générer des revenus complémentaires") {
      return {
        type: "Patrimoine Actif",
        tagline: "Investis pour générer des revenus",
        description: "Construis un patrimoine qui travaille pour toi grâce à l'investissement locatif intelligent.",
        features: [
          "Stratégie locative personnalisée",
          "Analyse de rentabilité sur-mesure",
          "Coaching individuel mensuel",
          "Accès prioritaire à nos experts bancaires"
        ],
        price: "497€",
        priceDetail: "Paiement unique"
      };
    }
    
    // Pack Global - Retraite, transmission, ou autres
    return {
      type: "Stratégie Globale",
      tagline: "Une vision 360° de ton patrimoine",
      description: "Un accompagnement complet pour structurer et optimiser ta stratégie patrimoniale sur le long terme.",
      features: [
        "Bilan patrimonial personnalisé",
        "Stratégie multi-objectifs (patrimoine, retraite, transmission)",
        "Coaching hebdomadaire individuel",
        "Accès illimité à notre réseau de professionnels"
      ],
      price: "797€",
      priceDetail: "Paiement unique"
    };
  };

  const accompaniment = getAccompaniment();

  // Helper function to get reading based on answers
  const getSituationReading = () => {
    const situation = answers.situation_actuelle;
    if (situation?.includes("idée vague")) return "Tu as déjà un intérêt réel pour l'immobilier mais sans cadre précis";
    if (situation?.includes("repéré quelques annonces")) return "Tu explores activement le marché mais manques de méthodologie";
    if (situation?.includes("projet précis mais je suis bloqué")) return "Tu as une vision claire mais des freins t'empêchent d'avancer";
    return "Tu démarres de zéro et cherches une direction claire";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header section with gradient */}
      <div className="bg-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10 py-6">
          <header className="flex items-center justify-between mb-12">
            <Logo variant="light" />
          </header>

          <div className={`max-w-3xl mx-auto text-center pb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Ta direction immobilière
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-10">
              <span className="text-[#99c5ff] font-bold">{prenom}</span>, voici la direction la plus cohérente pour toi aujourd'hui
            </p>

            {/* Bloc 1 — Ce que ta situation révèle */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-left mb-8">
              <h2 className="text-xl md:text-2xl font-display font-bold text-primary-foreground mb-4">
                Bloc 1 — Ce que ta situation révèle
              </h2>
              
              <p className="text-primary-foreground/80 mb-6">
                D'après tes réponses, tu n'es pas en train de "chercher un investissement".<br />
                <strong className="text-primary-foreground">Tu cherches une trajectoire claire.</strong>
              </p>

              <h3 className="text-lg font-semibold text-[#99c5ff] mb-4">Ton point de départ</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-primary-foreground/20">
                      <th className="py-3 pr-4 text-primary-foreground/70 font-medium text-sm">Élément</th>
                      <th className="py-3 text-primary-foreground/70 font-medium text-sm">Lecture NousProprio</th>
                    </tr>
                  </thead>
                  <tbody className="text-primary-foreground">
                    <tr className="border-b border-primary-foreground/10">
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ta situation actuelle</td>
                      <td className="py-4">
                        {answers.situation_actuelle || "Non renseigné"} — {getSituationReading()}
                      </td>
                    </tr>
                    <tr className="border-b border-primary-foreground/10">
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ton intention profonde</td>
                      <td className="py-4">
                        {answers.benefice || "Non renseigné"}
                      </td>
                    </tr>
                    <tr className="border-b border-primary-foreground/10">
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ton rapport à l'investissement</td>
                      <td className="py-4">
                        Tu ressens surtout {answers.ressenti?.toLowerCase() || "des doutes"}
                      </td>
                    </tr>
                    <tr className="border-b border-primary-foreground/10">
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ton principal blocage</td>
                      <td className="py-4">
                        {answers.frein || "Non renseigné"}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ton horizon de passage à l'action</td>
                      <td className="py-4">
                        {answers.horizon || "Non renseigné"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bloc 2 — Ta direction patrimoniale */}
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-left">
              <h2 className="text-xl md:text-2xl font-display font-bold text-primary-foreground mb-4">
                Bloc 2 — Ta direction patrimoniale
              </h2>
              
              <p className="text-primary-foreground/80 mb-4">
                Aujourd'hui, ta priorité n'est pas <strong className="text-primary-foreground">
                  {accompaniment.type === "Résidence Essentiel" ? "chercher la rentabilité" : "acheter un bien au hasard"}
                </strong>.<br />
                Ta priorité est de <strong className="text-primary-foreground">
                  {accompaniment.type === "Résidence Essentiel" ? "sécuriser ton premier projet de vie" : "bâtir un patrimoine aligné avec tes objectifs"}
                </strong>.
              </p>

              <p className="text-primary-foreground/80 mb-6">
                D'après tes réponses, tu ne cherches pas simplement un projet immobilier.<br />
                <strong className="text-primary-foreground">Tu cherches à :</strong>
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground">
                    <strong className="text-[#99c5ff]">
                      {accompaniment.type === "Résidence Essentiel" ? "Clarifier ce que tu veux vraiment construire" : "Comprendre comment créer des revenus immobiliers"}
                    </strong>
                    <span className="text-primary-foreground/70 text-sm ml-2">(Niveau de clarté)</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground">
                    <strong className="text-[#99c5ff]">
                      {accompaniment.type === "Résidence Essentiel" ? "Structurer ton projet avant d'acheter" : "Choisir une stratégie adaptée à ton profil"}
                    </strong>
                    <span className="text-primary-foreground/70 text-sm ml-2">(Frein principal)</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground">
                    <strong className="text-[#99c5ff]">
                      {accompaniment.type === "Résidence Essentiel" ? "Faire des choix qui ont du sens pour ton avenir" : "Sécuriser tes premières décisions d'investisseur"}
                    </strong>
                    <span className="text-primary-foreground/70 text-sm ml-2">(Capacité + Horizon)</span>
                  </span>
                </li>
              </ul>

              <p className="text-primary-foreground/90 italic border-l-4 border-[#99c5ff] pl-4">
                C'est exactement ce travail qui te permettra de passer<br />
                de la réflexion à un projet cohérent et assumé.
              </p>
            </div>
          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </div>

      {/* Accompaniment card */}
      <div className="container py-8 md:py-12">
        <div className={`max-w-2xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elegant border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wide">Recommandé pour toi</span>
                <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">{accompaniment.type}</h2>
              </div>
            </div>
            
            <p className="text-sm text-accent font-medium mb-4">{accompaniment.tagline}</p>
            
            <p className="text-muted-foreground mb-6">
              {accompaniment.description}
            </p>

            <div className="space-y-3 mb-6">
              {accompaniment.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Price display */}
            <div className="bg-primary/5 rounded-xl p-4 mb-6 text-center">
              <p className="text-3xl font-display font-bold text-primary">{accompaniment.price}</p>
              <p className="text-sm text-muted-foreground">{accompaniment.priceDetail}</p>
            </div>

            {/* Two CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="cta" 
                size="lg" 
                className="flex-1 group"
                onClick={() => navigate("/achat", { state: { accompaniment, prenom } })}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Acheter maintenant
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 group border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => navigate("/reserver-appel", { state: { accompaniment, prenom } })}
              >
                <Phone className="w-5 h-5 mr-2" />
                Réserver un appel
              </Button>
            </div>
          </div>

          {/* Additional benefits */}
          <div className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground text-sm">Lives privés</h3>
              <p className="text-xs text-muted-foreground">Chaque semaine</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <BookOpen className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground text-sm">Formation</h3>
              <p className="text-xs text-muted-foreground">Accès illimité</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <MessageSquare className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground text-sm">Support</h3>
              <p className="text-xs text-muted-foreground">Experts disponibles</p>
            </div>
          </div>

          {/* Trust badge */}
          <div className={`mt-8 text-center transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-sm text-muted-foreground">
              💡 100% indépendant • Aucune commission • Conseils authentiques
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resultat;
