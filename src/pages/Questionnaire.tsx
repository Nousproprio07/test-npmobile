import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";

interface Question {
  id: string;
  category?: string;
  question: string;
  type: "text" | "single" | "multiple";
  options?: string[];
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: "prenom",
    question: "Quel est ton prénom ?",
    type: "text",
    placeholder: "Ton prénom..."
  },
  {
    id: "situation",
    category: "SITUATION ACTUELLE",
    question: "Quelle est aujourd'hui ta situation professionnelle principale ?",
    type: "single",
    options: ["Salarié(e) CDI ou CDD", "Indépendant / Freelance", "Étudiant(e) / Alternant(e)"]
  },
  {
    id: "revenu",
    category: "SITUATION ACTUELLE",
    question: "Quel est ton revenu mensuel net approximatif ?",
    type: "single",
    options: ["Moins de 1 500€", "1 500€ - 2 500€", "2 500€ - 4 000€", "4 000€ - 6 000€", "Plus de 6 000€", "Je préfère ne pas répondre"]
  },
  {
    id: "apport",
    category: "SITUATION ACTUELLE",
    question: "As-tu un apport disponible ?",
    type: "single",
    options: ["Pas encore d'apport", "Moins de 10 000€", "10 000€ - 30 000€", "30 000€ - 50 000€", "50 000€ - 100 000€", "Plus de 100 000€"]
  },
  {
    id: "objectif",
    category: "OBJECTIFS",
    question: "Pourquoi veux-tu investir dans l'immobilier ?",
    type: "single",
    options: ["Me constituer un patrimoine", "Générer des revenus complémentaires", "Préparer ma retraite", "Avoir une résidence principale", "Transmettre à mes proches"]
  },
  {
    id: "horizon",
    category: "OBJECTIFS",
    question: "Quel est ton horizon de passage à l'action ?",
    type: "single",
    options: ["Dans les 3 prochains mois", "D'ici 6 mois", "D'ici 1 an", "Dans 1 à 2 ans", "Je ne sais pas encore"]
  },
  {
    id: "banque",
    category: "NIVEAU DE PRÉPARATION",
    question: "As-tu déjà discuté d'un projet immobilier avec ta banque ?",
    type: "single",
    options: ["Oui, j'ai déjà un accord de principe", "Oui, mais sans suite concrète", "Non, je n'ai pas encore osé", "Non, je ne sais pas comment m'y prendre"]
  },
  {
    id: "connaissance",
    category: "NIVEAU DE PRÉPARATION",
    question: "Ton niveau de connaissance en immobilier ?",
    type: "single",
    options: ["Débutant complet", "J'ai quelques notions", "Intermédiaire", "Avancé, je me forme régulièrement"]
  },
  {
    id: "credits",
    category: "NIVEAU DE PRÉPARATION",
    question: "As-tu des crédits en cours (conso, auto, etc.) ?",
    type: "single",
    options: ["Non, aucun crédit", "Oui, moins de 200€/mois", "Oui, entre 200€ et 500€/mois", "Oui, plus de 500€/mois"]
  },
  {
    id: "freins",
    category: "FREINS",
    question: "Ce qui te bloque le plus aujourd'hui ?",
    type: "single",
    options: ["Le manque de connaissances", "La peur de mal faire", "Le manque d'apport", "Je ne sais pas par où commencer", "La complexité administrative", "Le manque de temps", "Trouver le bon bien"]
  }
];

// Messages after specific questions (triggered after answering)
const encouragementTriggers: Record<string, string> = {
  "objectif": "Je commence à comprendre ton projet... 💡",
  "connaissance": "On avance bien ensemble, tu es entre de bonnes mains 🤝"
};

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [textInput, setTextInput] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [showEncouragement, setShowEncouragement] = useState<string | null>(null);

  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = questions[currentStep];

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Initial animation
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const triggerEncouragement = (questionId: string) => {
    const message = encouragementTriggers[questionId];
    if (message) {
      setShowEncouragement(message);
      setTimeout(() => setShowEncouragement(null), 2500);
    }
  };

  const handleAnswer = (answer: string) => {
    const questionId = currentQuestion.id;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Trigger encouragement message if applicable
    triggerEncouragement(questionId);
    
    if (currentStep < totalSteps - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setTextInput("");
        setIsAnimating(false);
      }, 300);
    } else {
      // Navigate to results with answers
      setTimeout(() => {
        navigate("/resultat", { state: { answers: { ...answers, [questionId]: answer } } });
      }, 2500); // Wait for last message to display
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      handleAnswer(textInput.trim());
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen h-full bg-hero relative overflow-hidden" style={{ minHeight: '100dvh' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container relative z-10 min-h-screen flex flex-col py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <Logo variant="light" />
          <span className="text-primary-foreground/70 text-sm">
            {currentStep + 1} / {totalSteps}
          </span>
        </header>

        {/* Progress bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-primary-foreground/20" />
        </div>

        {/* Notification style encouragement message - between progress and content */}
        <div className={`mb-6 transition-all duration-500 ${showEncouragement ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none h-0 mb-0'}`}>
          <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-4 max-w-md mx-auto flex items-center gap-4">
            {/* App icon style */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            {/* Notification content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-primary/60 uppercase tracking-wide mb-0.5">
                NousProprio
              </p>
              <p className="text-primary font-medium text-base leading-snug">
                {showEncouragement}
              </p>
            </div>
            {/* Time indicator */}
            <span className="text-xs text-primary/40 flex-shrink-0">
              maintenant
            </span>
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {/* Category badge */}
            {currentQuestion.category && (
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold tracking-wide mb-4">
                {currentQuestion.category}
              </span>
            )}

            {/* Question */}
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-8 leading-tight">
              {currentQuestion.question}
            </h2>

            {/* Answer options */}
            {currentQuestion.type === "text" ? (
              <div className="space-y-4">
                <Input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="h-14 text-lg bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:ring-accent"
                  onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                  autoFocus
                />
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim()}
                  className="w-full group"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:border-accent/50 transition-all duration-200 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="flex items-center justify-between">
                      {option}
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8">
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
