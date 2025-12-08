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
    answer: "Dès ton achat, tu accèdes immédiatement à l'ensemble des modules et replays. C'est un accès instantané et illimité à vie."
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
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Retour</span>
            </button>
            <Logo variant="light" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-6 px-4">
        <div className={`max-w-lg mx-auto transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          
          {/* Accompaniment summary card */}
          <div className="bg-card rounded-2xl p-5 shadow-elegant border border-border mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wide">Ton accompagnement</span>
                <h1 className="font-display text-lg font-bold text-foreground">{accompaniment.type}</h1>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{accompaniment.description}</p>
            
            {/* Price */}
            <div className="bg-primary/5 rounded-xl p-3 text-center">
              <p className="text-2xl font-display font-bold text-primary">{accompaniment.price}</p>
              <p className="text-xs text-muted-foreground">{accompaniment.priceDetail}</p>
            </div>
          </div>

          {/* Modules section */}
          <div className={`mb-6 transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2 mb-4">
              <Play className="w-5 h-5 text-accent" />
              <h2 className="font-display text-lg font-bold text-foreground">Ce qui t'attend</h2>
              <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {moduleCategories.reduce((acc, cat) => acc + cat.modules.length, 0)} modules
              </span>
            </div>

            <div className="space-y-3">
              {moduleCategories.map((category, index) => {
                const Icon = category.icon;
                const isExpanded = expandedCategories.includes(category.id);
                
                return (
                  <div 
                    key={category.id}
                    className={`bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 delay-${index * 50}`}
                  >
                    {/* Category header - always visible */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-4 flex items-center gap-3 text-left hover:bg-muted/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm">{category.title}</h3>
                        <p className="text-xs text-muted-foreground">{category.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-accent font-medium">{category.modules.length} modules</span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </button>

                    {/* Expanded modules */}
                    <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                      <div className="px-4 pb-4 space-y-2">
                        {category.modules.map((module, moduleIndex) => (
                          <div 
                            key={moduleIndex}
                            className="flex items-center gap-2 pl-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{module}</span>
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
          <div className={`mb-6 transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-accent" />
              <h2 className="font-display text-lg font-bold text-foreground">Questions fréquentes</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-card rounded-xl border border-border px-4 overflow-hidden"
                >
                  <AccordionTrigger className="text-sm font-medium text-foreground text-left py-4 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Sticky bottom CTAs */}
          <div className={`sticky bottom-0 bg-background pt-4 pb-6 -mx-4 px-4 border-t border-border transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex flex-col gap-3">
              <Button variant="cta" size="lg" className="w-full group">
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
      </div>
    </div>
  );
};

export default AchatAccompagnement;
