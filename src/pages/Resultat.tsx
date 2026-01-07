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
  const prenom = answers.prenom || "Ami(e)";

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
        price: "297€",
        priceDetail: "Paiement unique"
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
        price: "497€",
        priceDetail: "Paiement unique"
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
      price: "297€",
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
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ton projet de vie</td>
                      <td className="py-4">
                        {Array.isArray(answers.benefice) ? answers.benefice.join(", ") : (answers.benefice || "Non renseigné")}
                      </td>
                    </tr>
                    <tr className="border-b border-primary-foreground/10">
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ta situation familiale</td>
                      <td className="py-4">
                        {answers.situation_familiale || "Non renseigné"} — <strong>{getFamilleReading()}</strong>
                      </td>
                    </tr>
                    <tr className="border-b border-primary-foreground/10">
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ton logement actuel</td>
                      <td className="py-4">
                        {answers.logement_actuel || "Non renseigné"} — <strong>{getLogementReading()}</strong>
                      </td>
                    </tr>
                    <tr className="border-b border-primary-foreground/10">
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ta capacité financière</td>
                      <td className="py-4">
                        {answers.revenus || "Non renseigné"} — <strong>{getRevenusReading()}</strong>
                      </td>
                    </tr>
                    <tr className="border-b border-primary-foreground/10">
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ton rapport au risque</td>
                      <td className="py-4">
                        Tu ressens surtout {Array.isArray(answers.ressenti) ? answers.ressenti.map(r => r.toLowerCase()).join(" et ") : (answers.ressenti?.toLowerCase() || "des doutes")}
                        {Array.isArray(answers.frein) && answers.frein.length > 0 && (
                          <span> — Freins identifiés : {answers.frein.join(", ").toLowerCase()}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4 font-bold text-[#99c5ff]">Ton horizon de temps</td>
                      <td className="py-4">
                        {answers.horizon || "Non renseigné"}
                      </td>
                    </tr>
                  </tbody>
                </table>
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

      {/* Bloc 2 — Ta direction patrimoniale (fond blanc) */}
      <div className="container py-8 md:py-12">
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elegant border border-border text-left">
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4">
              Bloc 2 — Ta direction patrimoniale
            </h2>
            
            <p className="text-muted-foreground mb-4">
              Ta priorité est de <strong className="text-foreground">
                {accompaniment.type === "Résidence Essentiel" ? "sécuriser ton premier projet de vie" : "bâtir un patrimoine aligné avec tes objectifs"}
              </strong>.
            </p>

            <p className="text-muted-foreground mb-6">
              <strong className="text-foreground">Tu cherches à :</strong>
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong className="text-primary">
                    {accompaniment.type === "Résidence Essentiel" ? "Clarifier ce que tu veux vraiment construire" : "Comprendre comment créer des revenus immobiliers"}
                  </strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong className="text-primary">
                    {accompaniment.type === "Résidence Essentiel" ? "Structurer ton projet avant d'acheter" : "Choisir une stratégie adaptée à ton profil"}
                  </strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">
                  <strong className="text-primary">
                    {accompaniment.type === "Résidence Essentiel" ? "Faire des choix qui ont du sens pour ton avenir" : "Sécuriser tes premières décisions d'investisseur"}
                  </strong>
                </span>
              </li>
            </ul>

            {/* Warning pour les personnes qui veulent aller trop vite */}
            {answers.horizon === "Moins de 3 mois" && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800 text-sm leading-relaxed">
                  <strong className="text-amber-900">Prends le temps qu'il faut.</strong> Un projet immobilier solide se construit avec méthode, pas dans l'urgence. Mieux vaut un bon projet dans 6 mois qu'une erreur dans 3. On est là pour t'accompagner à ton rythme.
                </p>
              </div>
            )}

            {/* Warning revenus faibles + investissement locatif */}
            {answers.revenus === "Moins de 2 000 €" && accompaniment.type === "Patrimoine Actif" && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-3 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-amber-800 text-sm">
                  <p className="mb-2">
                    <strong className="text-amber-900">⚠️ Attention :</strong> Avec tes revenus actuels, l'investissement locatif nécessite une préparation minutieuse.
                  </p>
                  <p>
                    <strong className="text-amber-900">Notre approche :</strong> On va d'abord optimiser ta situation avant de te lancer.
                  </p>
                </div>
              </div>
            )}

            {/* Warning hébergé gratuitement + achat RP */}
            {answers.logement_actuel === "Hébergé(e) gratuitement" && accompaniment.type === "Résidence Essentiel" && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-800 text-sm">
                  <strong className="text-emerald-900">Avantage détecté :</strong> Sans loyer actuel, tu peux maximiser ton épargne avant l'achat. Timing idéal !
                </p>
              </div>
            )}

            {/* Diagnostic des erreurs potentielles */}
            {/* Erreur 1: Se lancer sans apport de sécurité */}
            {(answers.capacite === "Non" || answers.capacite === "Un peu") && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-3 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-amber-800 text-sm">
                  <p className="mb-2">
                    <strong className="text-amber-900">⚠️ Point de vigilance :</strong> Tu as indiqué {answers.capacite === "Non" ? "ne pas mettre" : "mettre peu"} d'argent de côté.
                  </p>
                  <p>
                    <strong className="text-amber-900">Conseil :</strong> Constitue 3 à 6 mois d'épargne de sécurité pour faire face aux imprévus (travaux, vacance locative, perte d'emploi).
                  </p>
                </div>
              </div>
            )}

            {/* Warning situation familiale avec enfants - adapté selon la direction */}
            {(answers.situation_familiale === "Célibataire avec enfant(s)" || answers.situation_familiale === "En couple avec enfant(s)") && accompaniment.type === "Résidence Essentiel" && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-blue-800 text-sm">
                  <strong className="text-blue-900">Pris en compte :</strong> Avec des enfants, on priorise stabilité, espace et proximité des écoles dans tes critères.
                </p>
              </div>
            )}

            {(answers.situation_familiale === "Célibataire avec enfant(s)" || answers.situation_familiale === "En couple avec enfant(s)") && accompaniment.type === "Patrimoine Actif" && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-3 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-blue-800 text-sm">
                  <strong className="text-blue-900">Pris en compte :</strong> Avec des enfants, on priorise l'accessibilité des biens pour éviter de longs déplacements.
                </p>
              </div>
            )}

            {/* Warnings évités - Messages courts et positifs */}
            {/* Erreur 2: Sous-estimer sa capacité réelle d'emprunt */}
            {(answers.frein && (
              (Array.isArray(answers.frein) && answers.frein.includes("Je ne comprends pas les chiffres")) ||
              answers.frein === "Je ne comprends pas les chiffres"
            )) && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-800 text-sm">
                  <strong className="text-emerald-900">Warning évité :</strong> Sous-estimer ta capacité d'emprunt → On t'aide à calculer ton vrai budget.
                </p>
              </div>
            )}

            {/* Erreur 3: Copier une stratégie qui ne correspond pas à sa situation */}
            {(answers.situation_actuelle === "J'ai déjà repéré quelques annonces" && 
              answers.situation_pro === "Étudiant(e)") && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-800 text-sm">
                  <strong className="text-emerald-900">Warning évité :</strong> Copier une stratégie inadaptée → On construit TA stratégie selon ton profil.
                </p>
              </div>
            )}

            {/* Erreur 4: Ignorer l'impact des charges et du temps */}
            {(answers.benefice && (
              (Array.isArray(answers.benefice) && answers.benefice.includes("Investir pour générer un patrimoine et des revenus")) ||
              answers.benefice === "Investir pour générer un patrimoine et des revenus"
            )) && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-3 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p className="text-emerald-800 text-sm">
                  <strong className="text-emerald-900">Warning évité :</strong> Ignorer les charges et le temps → Notre outil calcule automatiquement tes charges et ton rendement.
                </p>
              </div>
            )}

            <p className="text-foreground font-semibold italic border-l-4 border-primary pl-4">
              Voici comment nous allons t'accompagner pour y arriver.
            </p>
          </div>
        </div>
      </div>

      {/* Wave transition to Bloc 3 */}
      <div className="relative -mb-1">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--primary))" />
        </svg>
      </div>

      {/* Bloc 3 — Ta route patrimoniale (LA RÉVÉLATION) */}
      <div className="bg-hero relative overflow-hidden py-12 md:py-16">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute top-10 right-10 w-32 h-32 bg-[#99c5ff]/30 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="container relative z-10">
          <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Sparkle icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#99c5ff]/20 mb-6 animate-scale-in">
              <Sparkles className="w-8 h-8 text-[#99c5ff]" />
            </div>

            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Bloc 3 - Ta feuille de route
            </h2>
            
            <p className="text-lg md:text-xl text-[#99c5ff] font-semibold mb-8">
              Direction : {accompaniment.type === "Résidence Essentiel" 
                ? "devenir propriétaire intelligemment avant de penser investissement" 
                : "Comprendre comment créer son patrimoine et ses revenus immobiliers"}
            </p>

            {/* Recommendation card - THE BIG REVEAL */}
            <div className="bg-primary-foreground rounded-3xl p-8 md:p-10 shadow-2xl text-left relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                <span className="inline-block text-xs font-bold text-primary-foreground bg-primary px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                  Ton accompagnement recommandé
                </span>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-hero flex items-center justify-center shadow-lg">
                    {accompaniment.type === "Résidence Essentiel" 
                      ? <Home className="w-7 h-7 text-primary-foreground" />
                      : <TrendingUp className="w-7 h-7 text-primary-foreground" />
                    }
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {accompaniment.type} - {answers.prenom || "Prénom"} - {answers.situation_pro || "Salarié(e)"}
                  </h3>
                </div>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {accompaniment.type === "Résidence Essentiel" 
                    ? "Acheter ta résidence principale sans te tromper de projet."
                    : "Construire ton premier investissement locatif rentable."}
                </p>

                <h4 className="font-semibold text-foreground mb-4">Pourquoi c'est fait pour toi :</h4>
                
                <ul className="space-y-4 mb-8">
                  {accompaniment.type === "Résidence Essentiel" ? (
                    <>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-lg">Tu poses les fondations de ton patrimoine</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-lg">Tu apprends à lire un projet immobilier sans jargon</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-lg">Tu évites les erreurs irréversibles du premier achat</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-lg">Tu apprends à choisir entre courte et longue durée</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-lg">Tu structures un projet qui génère du cash-flow</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-[#99c5ff] flex-shrink-0 mt-0.5" />
                        <span className="text-foreground text-lg">Tu transformes ta réflexion en stratégie concrète</span>
                      </li>
                    </>
                  )}
                </ul>

                {/* Price reveal */}
                <div className="rounded-2xl p-6 mb-6 text-center">
                  <p className="text-4xl md:text-5xl font-display font-bold text-primary mb-1">{accompaniment.price}</p>
                  <p className="text-muted-foreground">Paiement en plusieurs fois possible</p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 group text-lg py-6 bg-[#99c5ff] text-primary hover:bg-[#7ab3ff] transition-colors"
                    onClick={() => navigate("/achat", { state: { accompaniment, prenom, situationPro: answers.situation_pro } })}
                  >
                    En savoir plus
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1 group border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg py-6"
                    onClick={() => navigate("/reserver-appel", { state: { accompaniment, prenom, situationPro: answers.situation_pro } })}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Réserver un appel
                  </Button>
                </div>
              </div>
            </div>
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
