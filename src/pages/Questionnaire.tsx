import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import Logo from "@/components/Logo";

interface Question {
  id: string;
  stepTitle: string;
  question: string;
  type: "text" | "single";
  options?: string[];
  placeholder?: string;
  description?: string;
}

const questions: Question[] = [
  {
    id: "situation_actuelle",
    stepTitle: "Étape 1 – Où tu en es aujourd'hui",
    question: "Quand tu penses à l'immobilier aujourd'hui, tu es plutôt dans quel cas ?",
    type: "single",
    options: [
      "J'ai une idée vague mais rien de concret",
      "J'ai déjà repéré quelques annonces",
      "J'ai un projet précis mais je suis bloqué",
      "Je n'ai aucune idée par où commencer"
    ]
  },
  {
    id: "objectif",
    stepTitle: "Étape 2 – Ton objectif immobilier",
    question: "Quel est ton objectif principal aujourd'hui ?",
    type: "single",
    options: [
      "Investir pour générer un patrimoine et des revenus",
      "Développer mon patrimoine sur le long terme",
      "Avoir mon propre bien pour être serein sur l'avenir"
    ]
  },
  {
    id: "benefice",
    stepTitle: "Étape 3 – Ce que ce projet changerait vraiment pour toi",
    question: "Si ce projet aboutissait, qu'est-ce que ça t'apporterait avant tout ?",
    type: "single",
    options: [
      "Me sentir plus en sécurité financièrement",
      "Gagner un complément de revenu",
      "Ne plus dépendre uniquement de mon salaire"
    ]
  },
  {
    id: "ressenti",
    stepTitle: "Étape 4 – Ton ressenti face à l'investissement",
    question: "Quand tu penses à investir, tu ressens surtout…",
    type: "single",
    options: [
      "De l'excitation",
      "De la peur de faire une erreur",
      "De la confusion",
      "De la frustration de ne pas avancer"
    ]
  },
  {
    id: "frein",
    stepTitle: "Étape 5 – Ce qui te freine aujourd'hui",
    question: "Qu'est-ce qui t'empêche le plus d'avancer ?",
    type: "single",
    options: [
      "Je ne comprends pas les chiffres",
      "J'ai peur de la banque",
      "J'ai peur de perdre de l'argent",
      "Je n'ai personne pour m'expliquer simplement"
    ]
  },
  {
    id: "situation_pro",
    stepTitle: "Étape 6 – Ta situation actuelle",
    question: "Pour adapter cette direction à ta réalité quotidienne, tu es plutôt…",
    type: "single",
    options: [
      "Étudiant(e)",
      "Salarié(e)",
      "Indépendant(e) / Freelance"
    ]
  },
  {
    id: "horizon",
    stepTitle: "Étape 7 – Ton horizon de passage à l'action",
    question: "Tu aimerais avancer sérieusement dans…",
    type: "single",
    options: [
      "Moins de 3 mois",
      "3 à 6 mois",
      "Plus tard, quand je me sentirai prêt"
    ]
  },
  {
    id: "capacite",
    stepTitle: "Étape 8 – Ta capacité aujourd'hui (sans jargon)",
    question: "Aujourd'hui, arrives-tu à mettre un peu d'argent de côté chaque mois ?",
    type: "single",
    options: [
      "Non",
      "Un peu",
      "Oui, régulièrement"
    ]
  },
  {
    id: "prenom",
    stepTitle: "Étape 9 – Faisons connaissance",
    question: "Quel est ton prénom ?",
    description: "Chez NousProprio, on ne te parle pas comme à un numéro.\nOn préfère t'accompagner comme une vraie personne, avec ton histoire et tes objectifs.",
    type: "text",
    placeholder: "Ton prénom..."
  }
];

// Messages d'encouragement déclenchés après certaines questions
const encouragementTriggers: Record<string, string> = {
  "frein": "Super, on avance bien ensemble ! 🚀"
};

const Questionnaire = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [textInput, setTextInput] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [showEncouragement, setShowEncouragement] = useState<string | null>(null);
  const [isRevisiting, setIsRevisiting] = useState(false); // Track if user came back to this question

  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestion = questions[currentStep];

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleStartQuiz = () => {
    setShowIntro(false);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleAnswer = (answer: string) => {
    const questionId = currentQuestion.id;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Trigger encouragement message if applicable
    const encouragementMessage = encouragementTriggers[questionId];
    if (encouragementMessage) {
      setShowEncouragement(encouragementMessage);
      setTimeout(() => setShowEncouragement(null), 2500);
    }

    // If not revisiting, auto-advance to next question
    if (!isRevisiting && currentStep < totalSteps - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setTextInput("");
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setIsAnimating(true);
      setIsRevisiting(false); // Reset revisiting state when moving forward
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setTextInput("");
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      const questionId = currentQuestion.id;
      setAnswers(prev => ({ ...prev, [questionId]: textInput.trim() }));
      
      // Show encouragement for last question
      setShowEncouragement("Merci ! Ta feuille de route arrive... ✨");
      setTimeout(() => {
        navigate("/resultat", { state: { answers: { ...answers, [questionId]: textInput.trim() } } });
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setIsRevisiting(true); // Mark that user is going back
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        // Restore the text input if going back to a text question
        const previousQuestion = questions[currentStep - 1];
        if (previousQuestion.type === "text" && answers[previousQuestion.id]) {
          setTextInput(answers[previousQuestion.id]);
        }
        setIsAnimating(false);
      }, 300);
    } else {
      setShowIntro(true);
    }
  };

  // Intro Screen
  if (showIntro) {
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
          </header>

          {/* Intro content */}
          <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full text-center px-4">
            <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
                Trouve ta direction immobilière
              </h1>
              
              <div className="text-left mb-8">
                <p className="text-primary-foreground/90 text-lg mb-4">
                  <strong className="text-primary-foreground">9 questions</strong> pour :
                </p>
                <ul className="space-y-2 text-primary-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-[#99c5ff]">•</span>
                    Clarifier ta situation actuelle
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#99c5ff]">•</span>
                    Identifier ce qui te bloque
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#99c5ff]">•</span>
                    Recevoir ta feuille de route personnalisée
                  </li>
                </ul>
              </div>

              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-primary-foreground/20">
                <p className="text-primary-foreground/80 text-base leading-relaxed">
                  Il n'y a pas de bonnes ou de mauvaises réponses.<br />
                  Réponds <strong className="text-primary-foreground">instinctivement</strong>.
                </p>
              </div>

              <Button
                size="lg"
                onClick={handleStartQuiz}
                className="w-full group text-lg py-6 bg-[#99c5ff] hover:bg-[#7ab3ff] text-primary font-semibold"
              >
                Découvrir
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question Screen
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

        <div className="mb-8">
          <Progress value={progress} className="h-2 bg-primary-foreground/20 [&>div]:bg-[#99c5ff]" />
        </div>

        {/* Encouragement message */}
        <div className={`mb-6 transition-all duration-500 ${showEncouragement ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none h-0 mb-0'}`}>
          <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-4 max-w-md mx-auto flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-primary/60 uppercase tracking-wide mb-0.5">
                NousProprio
              </p>
              <p className="text-primary font-medium text-base leading-snug">
                {showEncouragement}
              </p>
            </div>
            <span className="text-xs text-primary/40 flex-shrink-0">
              maintenant
            </span>
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {/* Step title */}
            <span className="inline-block px-3 py-1 rounded-full bg-[#99c5ff]/20 text-[#99c5ff] text-xs font-semibold tracking-wide mb-4">
              {currentQuestion.stepTitle}
            </span>

            {/* Question */}
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
              {currentQuestion.question}
            </h2>

            {/* Description for text questions */}
            {currentQuestion.description && (
              <p className="text-primary-foreground/70 text-base mb-6 leading-relaxed whitespace-pre-line">
                {currentQuestion.description}
              </p>
            )}

            {/* Answer options */}
            {currentQuestion.type === "text" ? (
              <div className="space-y-4 mt-4">
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
                  size="lg"
                  onClick={handleTextSubmit}
                  disabled={!textInput.trim()}
                  className="w-full group bg-[#99c5ff] hover:bg-[#7ab3ff] text-primary font-semibold disabled:opacity-50"
                >
                  Voir ma feuille de route
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            ) : (
              <div className="space-y-3 mt-4">
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = answers[currentQuestion.id] === option;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group ${
                        isSelected 
                          ? 'bg-[#99c5ff]/20 border-[#99c5ff] text-[#99c5ff]' 
                          : 'bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:border-[#99c5ff]/50'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="flex items-center justify-between">
                        {option}
                        <ArrowRight className={`w-5 h-5 transition-all ${
                          isSelected 
                            ? 'opacity-100 translate-x-0 text-[#99c5ff]' 
                            : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                        }`} />
                      </span>
                    </button>
                  );
                })}

                {/* Bouton Suivant - seulement si on revient sur une question et qu'une réponse est sélectionnée */}
                {isRevisiting && answers[currentQuestion.id] && currentStep < totalSteps - 1 && (
                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="w-full mt-4 group bg-[#99c5ff] hover:bg-[#7ab3ff] text-primary font-semibold"
                  >
                    Suivant
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
