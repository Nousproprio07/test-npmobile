import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp,
  Phone, 
  ShoppingCart,
  Sparkles,
  Target,
  TrendingUp,
  Award,
  Play,
  AlertTriangle,
  Trophy
} from "lucide-react";
import Logo from "@/components/Logo";
import FooterSection from "@/components/sections/FooterSection";

// Modules data for each accompaniment type

const residenceEssentielModules = [
  {
    id: "preparation",
    icon: Target,
    title: "Préparation & Fondations",
    subtitle: "Avant le financement",
    modules: [
      "Les fondamentaux de la recherche immobilière",
      "Choisir le bon bien",
      "Visiter un appartement / maison",
      "Acheter dans le neuf",
      "Faire une offre pour l'achat d'un bien",
      "Apprendre à décrypter le marché immobilier",
      "Introduction à la fiscalité"
    ]
  },
  {
    id: "financement",
    icon: TrendingUp,
    title: "Maîtrise du Financement & Concrétisation",
    subtitle: "Obtenir et sécuriser ton prêt",
    modules: [
      "Financement de mon bien immobilier",
      "Financement : comprendre les frais",
      "Financement en étant actif (reconversion ou arrêt d'activité)",
      "Aide pour gérer ton compte bancaire",
      "Comment bien préparer son rendez-vous bancaire",
      "Être certain de comprendre la fiscalité",
      "Préparation de la signature chez le notaire"
    ]
  },
  {
    id: "apres",
    icon: Sparkles,
    title: "Après l'Achat & Optimisation",
    subtitle: "Gérer et valoriser ton bien",
    modules: [
      "La TO DO list propriétaire occupant",
      "Préconisation sur la rénovation de ma résidence principale",
      "Maximiser la rentabilité de ma résidence principale",
      "La revente de mon bien",
      "La succession en immobilier",
      "Les projets immobilier de demain"
    ]
  }
];

// Placeholder for other accompaniment types - to be filled with real data
const patrimoineActifModules = [
  {
    id: "preparation",
    icon: Target,
    title: "Préparation & Fondations",
    subtitle: "Construire ta stratégie locative",
    modules: [
      "Les fondamentaux de l'investissement locatif",
      "Choisir le bon bien rentable",
      "Analyser un bien en location",
      "Les différents types de location",
      "Calculer la rentabilité réelle",
      "Étudier le marché locatif",
      "Introduction à la fiscalité locative"
    ]
  },
  {
    id: "financement",
    icon: TrendingUp,
    title: "Maîtrise du Financement & Concrétisation",
    subtitle: "Financer ton investissement",
    modules: [
      "Financement d'un bien locatif",
      "Optimiser son taux d'endettement",
      "Les frais à anticiper",
      "Monter un dossier investisseur",
      "Négocier avec les banques",
      "Comprendre les garanties",
      "La signature et les étapes clés"
    ]
  },
  {
    id: "apres",
    icon: Sparkles,
    title: "Après l'Achat & Optimisation",
    subtitle: "Rentabiliser et développer",
    modules: [
      "Trouver et sélectionner ses locataires",
      "Gérer la location au quotidien",
      "Optimisation fiscale avancée",
      "Travaux et valorisation",
      "Préparer le prochain investissement",
      "Stratégies de sortie"
    ]
  }
];

const strategieGlobaleModules = [
  {
    id: "preparation",
    icon: Target,
    title: "Préparation & Fondations",
    subtitle: "Vision patrimoniale globale",
    modules: [
      "Définir ta stratégie patrimoniale",
      "Audit de ta situation financière",
      "Les différents véhicules d'investissement",
      "Immobilier vs autres placements",
      "Préparer ta retraite avec l'immobilier",
      "Transmission et succession",
      "Fiscalité patrimoniale"
    ]
  },
  {
    id: "financement",
    icon: TrendingUp,
    title: "Maîtrise du Financement & Concrétisation",
    subtitle: "Structurer ton patrimoine",
    modules: [
      "Les montages financiers avancés",
      "SCI et structures juridiques",
      "Optimiser l'effet de levier",
      "Multi-projets et arbitrage",
      "Négociation bancaire experte",
      "Protection et garanties",
      "Accompagnement notarial"
    ]
  },
  {
    id: "apres",
    icon: Sparkles,
    title: "Après l'Achat & Optimisation",
    subtitle: "Pérenniser ton patrimoine",
    modules: [
      "Gestion multi-biens",
      "Optimisation fiscale globale",
      "Préparation de la retraite",
      "Transmission aux proches",
      "Diversification patrimoniale",
      "Vision long terme"
    ]
  }
];

// Mapping by accompaniment type
const moduleCategoriesByType: Record<string, typeof residenceEssentielModules> = {
  "Résidence Essentielle": residenceEssentielModules,
  "Patrimoine Actif": patrimoineActifModules,
  "Stratégie Globale": strategieGlobaleModules
};


const AchatAccompagnement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  const accompaniment = location.state?.accompaniment;
  const prenom = location.state?.prenom || "Ami(e)";
  const situationPro = location.state?.situationPro || "Salarié(e)";
  const answers = location.state?.answers || {};
  
  // Get modules based on accompaniment type
  const moduleCategories = moduleCategoriesByType[accompaniment?.type] || residenceEssentielModules;

  // Generate vigilance points based on answers
  const getVigilanceMessages = () => {
    const messages: { type: 'warning' | 'success'; title: string; text: string; priority: number }[] = [];

    // Warnings prioritaires
    if (answers.horizon === "Moins de 3 mois") {
      messages.push({
        type: 'warning',
        title: 'Prends le temps qu\'il faut.',
        text: 'Un projet immobilier solide se construit avec méthode, pas dans l\'urgence. Mieux vaut un bon projet dans 6 mois qu\'une erreur dans 3.',
        priority: 1
      });
    }

    if (answers.revenus === "Moins de 2 000 €" && accompaniment?.type === "Patrimoine Actif") {
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
        title: '⚠️ Point d\'attention :',
        text: `Tu as indiqué ${answers.capacite === "Non" ? "ne pas mettre" : "mettre peu"} d'argent de côté. Avant de te lancer, constitue une épargne de précaution équivalente à 3 mois de salaire. Nous avons un module dédié à l'épargne.`,
        priority: 3
      });
    }

    // Messages positifs (verts)
    if ((answers.situation_familiale === "Célibataire avec enfant(s)" || answers.situation_familiale === "En couple avec enfant(s)") && accompaniment?.type === "Résidence Essentielle") {
      messages.push({
        type: 'success',
        title: 'Pris en compte :',
        text: 'Avec des enfants, on priorise stabilité, espace et proximité des écoles dans tes critères.',
        priority: 4
      });
    }

    if ((answers.situation_familiale === "Célibataire avec enfant(s)" || answers.situation_familiale === "En couple avec enfant(s)") && accompaniment?.type === "Patrimoine Actif") {
      messages.push({
        type: 'success',
        title: 'Pris en compte :',
        text: 'Avec des enfants, on priorise l\'accessibilité des biens pour éviter de longs déplacements.',
        priority: 4
      });
    }

    if (answers.logement_actuel === "Locataire" && accompaniment?.type === "Patrimoine Actif") {
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

    if (answers.logement_actuel === "Hébergé(e) gratuitement" && accompaniment?.type === "Résidence Essentielle") {
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
    
    return [...limitedSuccesses, ...limitedWarnings];
  };

  const vigilanceMessages = getVigilanceMessages();

  useEffect(() => {
    // Always scroll to top when arriving on this page
    window.scrollTo(0, 0);
    
    if (!accompaniment) {
      navigate("/");
      return;
    }
    
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, [accompaniment, navigate]);

  // Handle scroll to top when returning from FAQ
  useEffect(() => {
    const shouldScrollToTop = sessionStorage.getItem('scrollToTop');
    if (shouldScrollToTop === 'true') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      sessionStorage.removeItem('scrollToTop');
    }
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (!accompaniment) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-hero sticky top-0 z-50">
        <div className="container py-4 md:py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm md:text-base font-medium">Retour</span>
            </button>
            <Logo variant="light" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-6 md:py-12 px-4">
        <div className={`max-w-lg md:max-w-5xl mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          {/* Desktop: Two column layout */}
          <div className="md:grid md:grid-cols-5 md:gap-10 md:items-start">
            
            {/* Left column - Main content */}
            <div className="md:col-span-3">
              {/* Section title - hidden on desktop to align cards */}
              <div className="mb-6 md:hidden">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                    <Trophy className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">Résultat personnalisé</span>
                </div>
              </div>
              
              {/* Accompaniment summary card */}
              <div className="bg-card rounded-2xl p-5 md:p-8 shadow-elegant border border-border mb-6 md:mb-8">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-5">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-red-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-red-600" />
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wide">Ton accompagnement</span>
                    <h1 className="font-display text-lg md:text-2xl font-bold text-foreground">{accompaniment.type}</h1>
                  </div>
                </div>
                
                {/* User badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#99c5ff]/20 mb-4 md:mb-5">
                  <span className="text-sm md:text-base font-medium text-primary">{prenom} • {situationPro}</span>
                </div>
                
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">{accompaniment.description}</p>
                
                {/* Tes points de vigilance */}
                {vigilanceMessages.length > 0 && (
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-base md:text-lg font-display font-bold text-foreground mb-3">
                      Analyse de ton profil
                    </h3>
                    <div className="space-y-2">
                      {vigilanceMessages.map((msg, index) => {
                        if (msg.type === 'warning') {
                          return (
                            <div key={index} className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
                              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                              <p className="text-amber-800 text-sm leading-relaxed">
                                <strong className="text-amber-900">{msg.title}</strong> {msg.text}
                              </p>
                            </div>
                          );
                        }
                        return (
                          <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <p className="text-emerald-800 text-sm">
                              <strong className="text-emerald-900">{msg.title}</strong> {msg.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
              </div>

              {/* Modules section */}
              <div className={`mb-6 md:mb-8 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  <h2 className="font-display text-lg md:text-2xl font-bold text-foreground">Ce qui s'offre à toi</h2>
                  <span className="ml-auto text-xs md:text-sm text-muted-foreground bg-muted px-2 py-1 md:px-3 md:py-1.5 rounded-full">
                    {moduleCategories.reduce((acc, cat) => acc + cat.modules.length, 0)} modules
                  </span>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {moduleCategories.map((category, index) => {
                    const Icon = category.icon;
                    const isExpanded = expandedCategories.includes(category.id);
                    
                    return (
                      <div 
                        key={category.id}
                        className={`bg-card rounded-xl md:rounded-2xl border border-border overflow-hidden transition-all duration-300 delay-${index * 50}`}
                      >
                        {/* Category header - always visible */}
                        <button
                          onClick={() => toggleCategory(category.id)}
                          className="w-full p-4 md:p-5 flex items-center gap-3 md:gap-4 text-left hover:bg-muted/30 transition-colors"
                        >
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#99c5ff]/20 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground text-sm md:text-base">{category.title}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground">{category.subtitle}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs md:text-sm text-primary font-medium">{category.modules.length} modules</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                            )}
                          </div>
                        </button>

                        {/* Expanded modules */}
                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                          <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-2 md:space-y-3">
                            {category.modules.map((module, moduleIndex) => (
                              <div 
                                key={moduleIndex}
                                className="flex items-center gap-2 md:gap-3 pl-2"
                              >
                                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-glacier flex-shrink-0" />
                                <span className="text-sm md:text-base text-muted-foreground">{module}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>


              {/* Mobile Trust badges */}
              <div className="md:hidden space-y-3 mb-6">
                <div className="bg-glacier/5 rounded-xl p-4 border border-glacier/20">
                  <div className="flex items-center gap-3">
                    <Award className="w-7 h-7 text-glacier" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Satisfaction garantie</p>
                      <p className="text-xs text-muted-foreground">Des centaines de propriétaires accompagnés</p>
                    </div>
                  </div>
                </div>
                <div className="bg-glacier/5 rounded-xl p-4 border border-glacier/20">
                  <div className="flex items-center gap-3">
                    <Phone className="w-7 h-7 text-glacier" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Des experts à tes côtés</p>
                      <p className="text-xs text-muted-foreground">Sessions FAQ live chaque semaine</p>
                    </div>
                  </div>
                </div>
                <div className="bg-glacier/5 rounded-xl p-4 border border-glacier/20">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-7 h-7 text-glacier" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Des modules garantis à vie</p>
                      <p className="text-xs text-muted-foreground">Accès permanent et mises à jour incluses</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile CTAs */}
              <div className={`md:hidden sticky bottom-0 bg-background pt-4 pb-6 -mx-4 px-4 border-t border-border transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex flex-col gap-3">
                  <Button 
                    variant="glacier" 
                    size="lg" 
                    className="w-full group"
                    onClick={() => navigate("/connexion")}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Acheter maintenant • {accompaniment.price}
                  </Button>
                  <button 
                    onClick={() => navigate("/reserver-appel", { state: { accompaniment, prenom } })}
                    className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors text-sm font-medium"
                  >
                    Réserver un appel gratuit
                  </button>
                  <p className="text-xs text-center text-muted-foreground">
                    🔒 Paiement sécurisé • Accès immédiat et illimité
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - Desktop sidebar with price & CTAs */}
            <div className="hidden md:block md:col-span-2">
              <div className="sticky top-24">
                <div className={`bg-card rounded-2xl p-6 shadow-elegant border border-border transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {/* Price */}
                  <div className="text-center mb-6">
                    <p className="text-4xl font-display font-bold text-primary mb-1">{accompaniment.price}</p>
                    <p className="text-sm text-muted-foreground">{accompaniment.priceDetail}</p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-glacier flex-shrink-0" />
                      <span className="text-sm text-foreground">Accès illimité à vie</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-glacier flex-shrink-0" />
                      <span className="text-sm text-foreground">Lives hebdomadaires inclus</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-glacier flex-shrink-0" />
                      <span className="text-sm text-foreground">Support personnalisé</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-glacier flex-shrink-0" />
                      <span className="text-sm text-foreground">Mises à jour gratuites</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col gap-3">
                    <Button 
                      variant="glacier" 
                      size="lg" 
                      className="w-full group text-base py-6"
                      onClick={() => navigate("/connexion")}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Acheter maintenant
                    </Button>
                    <button 
                      onClick={() => navigate("/reserver-appel", { state: { accompaniment, prenom } })}
                      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      Réserver un appel gratuit
                    </button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    🔒 Paiement sécurisé • Accès immédiat et illimité
                  </p>
                </div>

                {/* Trust badges */}
                <div className="mt-4 space-y-3">
                  <div className="bg-glacier/5 rounded-xl p-4 border border-glacier/20">
                    <div className="flex items-center gap-3">
                      <Award className="w-8 h-8 text-glacier" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">Satisfaction garantie</p>
                        <p className="text-xs text-muted-foreground">Des centaines de propriétaires accompagnés</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-glacier/5 rounded-xl p-4 border border-glacier/20">
                    <div className="flex items-center gap-3">
                      <Phone className="w-8 h-8 text-glacier" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">Des experts à tes côtés</p>
                        <p className="text-xs text-muted-foreground">Sessions FAQ live chaque semaine</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-glacier/5 rounded-xl p-4 border border-glacier/20">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-8 h-8 text-glacier" />
                      <div>
                        <p className="font-semibold text-foreground text-sm">Des modules garantis à vie</p>
                        <p className="text-xs text-muted-foreground">Accès permanent et mises à jour incluses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default AchatAccompagnement;
