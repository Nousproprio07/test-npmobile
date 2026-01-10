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
  HelpCircle,
  Play
} from "lucide-react";
import Logo from "@/components/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  "Résidence Essentiel": residenceEssentielModules,
  "Patrimoine Actif": patrimoineActifModules,
  "Stratégie Globale": strategieGlobaleModules
};

const faqItems = [
  {
    question: "Combien de temps ai-je accès à l'accompagnement ?",
    answer: "Tu as un accès illimité à vie à tous les modules et mises à jour. Une fois inscrit, tu fais partie de la communauté NousProprio pour toujours."
  },
  {
    question: "Les lives sont-ils enregistrés ?",
    answer: "Oui, tous les lives hebdomadaires sont enregistrés et disponibles en replay dans ton espace membre. Tu ne rates jamais rien."
  },
  {
    question: "Puis-je poser mes questions personnelles ?",
    answer: "Absolument ! Les lives privés sont faits pour ça. Tu peux aussi nous contacter directement via ton espace membre pour des questions spécifiques."
  },
  {
    question: "Est-ce adapté à ma situation ?",
    answer: "Notre questionnaire a analysé ton profil. L'accompagnement recommandé est spécifiquement conçu pour ta situation actuelle et tes objectifs."
  },
  {
    question: "Comment fonctionne l'accès aux contenus ?",
    answer: "Le contenu est régulièrement mis à jour. Dès ton achat, tu accèdes immédiatement à l'ensemble des modules et replays. C'est un accès instantané et illimité à vie."
  },
  {
    question: "Recevez-vous des commissions des banques ?",
    answer: "Non, jamais. Notre indépendance totale est notre force. Nous ne recevons aucune commission, ce qui garantit des conseils 100% dans ton intérêt."
  }
];

const AchatAccompagnement = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  const accompaniment = location.state?.accompaniment;
  const prenom = location.state?.prenom || "Ami(e)";
  const situationPro = location.state?.situationPro || "Salarié(e)";
  
  // Get modules based on accompaniment type
  const moduleCategories = moduleCategoriesByType[accompaniment?.type] || residenceEssentielModules;

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!accompaniment) {
      navigate("/");
      return;
    }
    
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, [accompaniment, navigate]);

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
          <div className="md:grid md:grid-cols-5 md:gap-10">
            
            {/* Left column - Main content */}
            <div className="md:col-span-3">
              {/* Accompaniment summary card */}
              <div className="bg-card rounded-2xl p-5 md:p-8 shadow-elegant border border-border mb-6 md:mb-8">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-5">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-primary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wide">Ton accompagnement</span>
                    <h1 className="font-display text-lg md:text-2xl font-bold text-foreground">{accompaniment.type}</h1>
                  </div>
                </div>
                
                {/* User badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-glacier/10 mb-4 md:mb-5">
                  <span className="text-sm md:text-base font-medium text-glacier">{prenom} • {situationPro}</span>
                </div>
                
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">{accompaniment.description}</p>
                
                {/* Price - Mobile only */}
                <div className="md:hidden bg-primary/5 rounded-xl p-3 text-center">
                  <p className="text-2xl font-display font-bold text-primary">{accompaniment.price}</p>
                  <p className="text-xs text-muted-foreground">{accompaniment.priceDetail}</p>
                </div>
              </div>

              {/* Modules section */}
              <div className={`mb-6 md:mb-8 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <Play className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  <h2 className="font-display text-lg md:text-2xl font-bold text-foreground">Ce qui t'attend</h2>
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
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-glacier/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-glacier" />
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

              {/* FAQ section */}
              <div className={`mb-6 md:mb-8 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <HelpCircle className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  <h2 className="font-display text-lg md:text-2xl font-bold text-foreground">Questions fréquentes</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-2 md:space-y-3">
                  {faqItems.map((item, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`faq-${index}`}
                      className="bg-card rounded-xl md:rounded-2xl border border-border px-4 md:px-6 overflow-hidden"
                    >
                      <AccordionTrigger className="text-sm md:text-base font-medium text-foreground text-left py-4 md:py-5 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm md:text-base text-muted-foreground pb-4 md:pb-5 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full group border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    onClick={() => navigate("/reserver-appel", { state: { accompaniment, prenom } })}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Réserver un appel gratuit
                  </Button>
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
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full group border-primary text-primary hover:bg-primary hover:text-primary-foreground text-base py-6"
                      onClick={() => navigate("/reserver-appel", { state: { accompaniment, prenom } })}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Réserver un appel gratuit
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    🔒 Paiement sécurisé • Accès immédiat et illimité
                  </p>
                </div>

                {/* Trust badge */}
                <div className="mt-4 bg-glacier/5 rounded-xl p-4 border border-glacier/20">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-glacier" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Satisfaction garantie</p>
                      <p className="text-xs text-muted-foreground">Des centaines de propriétaires accompagnés</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AchatAccompagnement;
