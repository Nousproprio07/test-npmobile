import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Calendar, Users, BookOpen, MessageSquare, Phone, ShoppingCart, ChevronDown, Sparkles, Home, TrendingUp, AlertTriangle } from "lucide-react";
import Logo from "@/components/Logo";

const Resultat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const answers = location.state?.answers || {};
  const rawPrenom = answers.prenom || "Ami(e)";
  const prenom = rawPrenom.charAt(0).toUpperCase() + rawPrenom.slice(1).toLowerCase();

  useEffect(() => {
    if (!location.state?.answers) {
      navigate("/");
      return;
    }
    
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  // Determine accompaniment based on benefice answers
  const getAccompaniment = () => {
    const benefice = answers.benefice;
    
    // benefice est maintenant un tableau de réponses
    const beneficeArray = Array.isArray(benefice) ? benefice : [benefice];
    
    // Pack Résidence Essentiel - Si "Me sentir enfin chez moi et en sécurité pour l'avenir" est sélectionné
    if (beneficeArray.includes("Me sentir enfin chez moi et en sécurité pour l'avenir")) {
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
        price: "895€",
        priceDetail: "Paiement en plusieurs fois possible"
      };
    }
    
    // Pack Patrimoine Actif - Si une des deux autres options est sélectionnée
    if (beneficeArray.includes("Développer un patrimoine sur le long terme") || 
        beneficeArray.includes("Investir pour générer un patrimoine et des revenus")) {
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
        price: "975€",
        priceDetail: "Paiement en plusieurs fois possible"
      };
    }
    
    // Fallback par défaut → Résidence Essentiel
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
      price: "895€",
      priceDetail: "Paiement en plusieurs fois possible"
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

  // Helper function for family situation reading
  const getFamilleReading = () => {
    const famille = answers.situation_familiale;
    if (famille === "Célibataire") return "Projet individuel, flexibilité maximale dans les choix";
    if (famille === "Célibataire avec enfant(s)") return "Priorité stabilité et espace, capacité à gérer seul(e)";
    if (famille === "En couple") return "Projet à deux, capacité d'emprunt renforcée";
    if (famille === "En couple avec enfant(s)") return "Priorité familiale, surface et localisation adaptées";
    return "Non renseigné";
  };

  // Helper function for housing status reading
  const getLogementReading = () => {
    const logement = answers.logement_actuel;
    if (logement === "Locataire") return "Charges locatives actuelles convertibles en mensualités";
    if (logement === "Hébergé(e) gratuitement") return "Capacité d'épargne optimale, bon timing pour préparer";
    if (logement === "Déjà propriétaire") return "Expérience acquise, potentiel de leverage";
    return "Non renseigné";
  };

  // Helper function for income reading
  const getRevenusReading = () => {
    const revenus = answers.revenus;
    if (revenus === "Moins de 2 000 €") return "Budget serré, projet à préparer avec méthode";
    if (revenus === "Entre 2 000 € et 3 500 €") return "Capacité d'emprunt moyenne, bon potentiel avec stratégie";
    if (revenus === "Entre 3 500 € et 5 000 €") return "Bonne capacité, plusieurs options possibles";
    if (revenus === "Plus de 5 000 €") return "Forte capacité, accès à des stratégies diversifiées";
    return "Non renseigné";
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

          <div className={`max-w-4xl mx-auto text-center pb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-10">
              <span className="text-[#99c5ff]">{prenom}</span>, voici ta feuille de route
            </h1>

            {/* Bloc - Feuille de route */}
            <div className="bg-primary-foreground rounded-2xl p-4 md:p-8 mb-8 relative overflow-hidden shadow-xl">
              {/* Sparkle icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/20 mb-4 animate-scale-in">
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>

              {/* Recommendation card */}
              <div className="bg-primary-foreground rounded-xl md:rounded-2xl p-5 md:p-10 shadow-xl text-left relative overflow-hidden -mx-2 md:-mx-6 lg:-mx-10 border-2 border-primary">
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <span className="inline-block text-[10px] md:text-xs font-bold text-primary-foreground bg-primary px-2 md:px-3 py-1 rounded-full uppercase tracking-wider mb-3 md:mb-4">
                    Ton accompagnement recommandé
                  </span>
                  
                  {/* Mobile: Stack icon and title | Desktop: Side by side */}
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-hero flex items-center justify-center shadow-lg flex-shrink-0">
                      {accompaniment.type === "Résidence Essentiel" 
                        ? <Home className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                        : <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                      }
                    </div>
                    <div>
                      <h3 className="font-display text-lg md:text-2xl font-bold text-foreground leading-tight">
                        {accompaniment.type}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {prenom} • {answers.situation_pro || "Salarié(e)"}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                    {accompaniment.type === "Résidence Essentiel" 
                      ? "Acheter ta résidence principale sans te tromper de projet."
                      : "Construire ton premier investissement locatif rentable."}
                  </p>

                  <h4 className="font-semibold text-foreground mb-2 md:mb-3 text-xs md:text-sm">Pourquoi c'est fait pour toi :</h4>
                  
                  <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    {accompaniment.type === "Résidence Essentiel" ? (
                      <>
                        <li className="flex items-start gap-2 md:gap-3">
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm md:text-base">Tu poses les fondations de ton patrimoine</span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm md:text-base">Tu apprends à lire un projet immobilier sans jargon</span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm md:text-base">Tu évites les erreurs irréversibles du premier achat</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start gap-2 md:gap-3">
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm md:text-base">Tu apprends à choisir entre courte et longue durée</span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm md:text-base">Tu structures un projet qui génère du cash-flow</span>
                        </li>
                        <li className="flex items-start gap-2 md:gap-3">
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm md:text-base">Tu transformes ta réflexion en stratégie concrète</span>
                        </li>
                      </>
                    )}
                  </ul>

                  {/* Price */}
                  <div className="rounded-lg md:rounded-xl p-3 md:p-4 mb-4 text-center bg-muted/50">
                    <p className="text-2xl md:text-3xl font-display font-bold text-primary mb-0.5 md:mb-1">{accompaniment.price}</p>
                    <p className="text-muted-foreground text-xs md:text-sm">Paiement en plusieurs fois possible</p>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-2 md:gap-3">
                    <Button 
                      size="lg" 
                      className="w-full group bg-[#99c5ff] text-primary hover:bg-[#7ab3ff] transition-colors text-sm md:text-base py-3 md:py-4"
                      onClick={() => navigate("/achat", { state: { accompaniment, prenom, situationPro: answers.situation_pro } })}
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full group border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm md:text-base py-3 md:py-4"
                      onClick={() => navigate("/reserver-appel", { state: { accompaniment, prenom, situationPro: answers.situation_pro } })}
                    >
                      <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      Réserver un appel
                    </Button>
                  </div>
                </div>
              </div>
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

      {/* Bloc 2 — Tes points de vigilance (fond blanc) */}
      <div className="container py-8 md:py-12">
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elegant border border-border text-left">
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              Tes points de vigilance
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Voici les points identifiés selon ta situation :
            </p>

            {/* Messages personnalisés - limités à 5 maximum */}
            {(() => {
              const messages: { type: 'warning' | 'success'; title: string; text: string; priority: number }[] = [];

              // Warnings prioritaires (affichés en premier)
              if (answers.horizon === "Moins de 3 mois") {
                messages.push({
                  type: 'warning',
                  title: 'Prends le temps qu\'il faut.',
                  text: 'Un projet immobilier solide se construit avec méthode, pas dans l\'urgence. Mieux vaut un bon projet dans 6 mois qu\'une erreur dans 3.',
                  priority: 1
                });
              }

              if (answers.revenus === "Moins de 2 000 €" && accompaniment.type === "Patrimoine Actif") {
                messages.push({
                  type: 'warning',
                  title: '⚠️ Attention :',
                  text: 'Avec tes revenus actuels, l\'investissement locatif nécessite une préparation minutieuse. On va d\'abord optimiser ta situation.',
                  priority: 2
                });
              }

              if (answers.capacite === "Non" || answers.capacite === "Un peu") {
                messages.push({
                  type: 'warning',
                  title: '⚠️ Point de vigilance :',
                  text: `Tu as indiqué ${answers.capacite === "Non" ? "ne pas mettre" : "mettre peu"} d'argent de côté. Constitue 3 à 6 mois d'épargne de sécurité.`,
                  priority: 3
                });
              }

              // Messages positifs (verts) - anciennement info
              if ((answers.situation_familiale === "Célibataire avec enfant(s)" || answers.situation_familiale === "En couple avec enfant(s)") && accompaniment.type === "Résidence Essentiel") {
                messages.push({
                  type: 'success',
                  title: 'Pris en compte :',
                  text: 'Avec des enfants, on priorise stabilité, espace et proximité des écoles dans tes critères.',
                  priority: 4
                });
              }

              if ((answers.situation_familiale === "Célibataire avec enfant(s)" || answers.situation_familiale === "En couple avec enfant(s)") && accompaniment.type === "Patrimoine Actif") {
                messages.push({
                  type: 'success',
                  title: 'Pris en compte :',
                  text: 'Avec des enfants, on priorise l\'accessibilité des biens pour éviter de longs déplacements.',
                  priority: 4
                });
              }

              if (answers.logement_actuel === "Locataire" && accompaniment.type === "Patrimoine Actif") {
                messages.push({
                  type: 'success',
                  title: 'Stratégie validée :',
                  text: 'Rester locataire tout en investissant peut être très rentable — on t\'explique comment.',
                  priority: 5
                });
              }

              if (answers.horizon === "Plus tard, quand je me sentirai prêt") {
                messages.push({
                  type: 'success',
                  title: 'Sage décision :',
                  text: 'Prendre le temps de bien se préparer, c\'est déjà avancer. On t\'accompagne à ton rythme.',
                  priority: 6
                });
              }

              // Messages positifs (verts)
              if (answers.logement_actuel === "Hébergé(e) gratuitement" && accompaniment.type === "Résidence Essentiel") {
                messages.push({
                  type: 'success',
                  title: 'Avantage détecté :',
                  text: 'Sans loyer actuel, tu peux maximiser ton épargne avant l\'achat. Timing idéal !',
                  priority: 7
                });
              }

              if (answers.revenus === "Plus de 5 000 €") {
                messages.push({
                  type: 'success',
                  title: 'Atout majeur :',
                  text: 'Avec ta capacité financière, tu peux viser des stratégies diversifiées et accélérer ta constitution de patrimoine.',
                  priority: 8
                });
              }

              if (answers.revenus === "Entre 3 500 € et 5 000 €") {
                messages.push({
                  type: 'success',
                  title: 'Bon potentiel :',
                  text: 'Ta capacité d\'emprunt te donne accès à plusieurs options intéressantes.',
                  priority: 9
                });
              }

              if (answers.logement_actuel === "Déjà propriétaire") {
                messages.push({
                  type: 'success',
                  title: 'Expérience valorisée :',
                  text: 'En tant que propriétaire, tu peux utiliser ton patrimoine existant comme levier pour tes prochains projets.',
                  priority: 10
                });
              }

              if (answers.situation_familiale === "En couple" || answers.situation_familiale === "En couple avec enfant(s)") {
                messages.push({
                  type: 'success',
                  title: 'Force du duo :',
                  text: 'À deux, ta capacité d\'emprunt est renforcée et les risques sont mieux répartis.',
                  priority: 11
                });
              }

              if (answers.capacite === "Oui, régulièrement") {
                messages.push({
                  type: 'success',
                  title: 'Discipline récompensée :',
                  text: 'Ta capacité à épargner régulièrement est un signal fort pour les banques.',
                  priority: 12
                });
              }

              if (answers.situation_pro === "Salarié(e)") {
                messages.push({
                  type: 'success',
                  title: 'Profil bancaire solide :',
                  text: 'Le statut salarié rassure les banques et facilite l\'accès au crédit.',
                  priority: 13
                });
              }

              if (answers.situation_pro === "Indépendant(e) / Freelance") {
                messages.push({
                  type: 'success',
                  title: 'Profil entrepreneur :',
                  text: 'En tant qu\'indépendant, les banques demandent généralement 2 à 3 bilans. On t\'aide à préparer un dossier solide.',
                  priority: 14
                });
              }

              if (answers.situation_pro === "Étudiant(e)") {
                messages.push({
                  type: 'success',
                  title: 'Profil en devenir :',
                  text: 'En tant qu\'étudiant, c\'est le moment idéal pour apprendre et préparer ton projet. L\'accès au crédit viendra avec ton premier emploi stable.',
                  priority: 15
                });
              }

              // Message positif par défaut
              messages.push({
                type: 'success',
                title: 'Premier pas franchi :',
                text: 'Tu as fait le premier pas en découvrant ta feuille de route. C\'est le début de ton projet.',
                priority: 20
              });

              // Séparer warnings et succès
              const warnings = messages.filter(m => m.type === 'warning').sort((a, b) => a.priority - b.priority);
              const successes = messages.filter(m => m.type === 'success').sort((a, b) => a.priority - b.priority);
              
              // Limiter à 2 warnings max, puis compléter avec des succès (total 5 max)
              const limitedWarnings = warnings.slice(0, 2);
              const remainingSlots = 5 - limitedWarnings.length;
              const limitedSuccesses = successes.slice(0, remainingSlots);
              
              // Afficher d'abord les verts, puis les warnings
              const sortedMessages = [...limitedSuccesses, ...limitedWarnings];

              return sortedMessages.map((msg, index) => {
                if (msg.type === 'warning') {
                  return (
                    <div key={index} className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-3 flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-800 text-sm leading-relaxed">
                        <strong className="text-amber-900">{msg.title}</strong> {msg.text}
                      </p>
                    </div>
                  );
                }
                return (
                  <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <p className="text-emerald-800 text-sm">
                      <strong className="text-emerald-900">{msg.title}</strong> {msg.text}
                    </p>
                  </div>
                );
              });
            })()}

            <p className="text-foreground font-semibold italic border-l-4 border-primary pl-4">
              Voici comment nous allons t'accompagner pour y arriver.
            </p>
          </div>
        </div>
      </div>



      {/* Trust badge */}
      <div className="container py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            💡 100% indépendant • Aucune commission • Conseils authentiques
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resultat;
