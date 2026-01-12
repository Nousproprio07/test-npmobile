import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import Logo from "@/components/Logo";
import { useNotificationSound } from "@/hooks/use-notification-sound";

interface Question {
  id: string;
  stepTitle: string;
  question: string;
  type: "text" | "single" | "multi" | "contact";
  options?: string[];
  placeholder?: string;
  description?: string;
  maxSelections?: number;
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
    id: "benefice",
    stepTitle: "Étape 2 – Ce que ce projet changerait vraiment pour toi",
    question: "Quel est l'objectif de ton projet immobilier ?",
    description: "Tu peux sélectionner une seule réponse",
    type: "single",
    options: [
      "Me sentir enfin chez moi et en sécurité pour l'avenir",
      "Développer un patrimoine sur le long terme",
      "Investir pour générer un patrimoine et des revenus"
    ]
  },
  {
    id: "situation_familiale",
    stepTitle: "Étape 3 – Ta situation personnelle",
    question: "Aujourd'hui, tu es …",
    type: "single",
    options: [
      "Célibataire",
      "Célibataire avec enfant(s)",
      "En couple",
      "En couple avec enfant(s)"
    ]
  },
  {
    id: "logement_actuel",
    stepTitle: "Étape 4 – Ton logement actuel",
    question: "Actuellement, tu es…",
    type: "single",
    options: [
      "Locataire",
      "Hébergé(e) gratuitement",
      "Déjà propriétaire"
    ]
  },
  {
    id: "ressenti",
    stepTitle: "Étape 5 – Ton ressenti face à l'investissement",
    question: "Quand tu penses à investir, tu ressens surtout…",
    type: "multi",
    maxSelections: 2,
    options: [
      "De l'excitation",
      "De la peur de faire une erreur",
      "De la confusion",
      "De la frustration de ne pas avancer"
    ]
  },
  {
    id: "frein",
    stepTitle: "Étape 6 – Ce qui te freine aujourd'hui",
    question: "Qu'est-ce qui t'empêche le plus d'avancer ?",
    type: "multi",
    maxSelections: 2,
    options: [
      "Je ne comprends pas les chiffres",
      "J'ai peur de la banque",
      "J'ai peur de perdre de l'argent",
      "Je n'ai personne pour m'expliquer simplement"
    ]
  },
  {
    id: "situation_pro",
    stepTitle: "Étape 7 – Ta situation professionnelle",
    question: "Pour adapter cette direction à ta réalité quotidienne, tu es …",
    type: "single",
    options: [
      "Étudiant(e)",
      "Salarié(e)",
      "Indépendant(e) / Freelance"
    ]
  },
  {
    id: "revenus",
    stepTitle: "Étape 8 – Tes revenus",
    question: "Quel est ton revenu net mensuel (ou celui de ton foyer) ?",
    description: "Cette info reste confidentielle et nous permet d'adapter nos recommandations.",
    type: "single",
    options: [
      "Moins de 2 000 €",
      "Entre 2 000 € et 3 500 €",
      "Entre 3 500 € et 5 000 €",
      "Plus de 5 000 €"
    ]
  },
  {
    id: "horizon",
    stepTitle: "Étape 9 – Ton horizon de passage à l'action",
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
    stepTitle: "Étape 10 – Ta capacité d'épargne",
    question: "Aujourd'hui, arrives-tu à mettre un peu d'argent de côté chaque mois ?",
    type: "single",
    options: [
      "Non",
      "Un peu",
      "Oui, régulièrement"
    ]
  },
  {
    id: "contact",
    stepTitle: "Étape 11 – Faisons connaissance",
    question: "Dernière étape avant ta feuille de route",
    description: "À qui avons-nous l'honneur ? 😊",
    type: "contact",
    placeholder: ""
  }
];

// Messages d'encouragement déclenchés après certaines questions
const encouragementTriggers: Record<string, { message: string; emoji: string }> = {
  "ressenti": { 
    message: "C'est normal de ressentir ça ! On est là pour t'aider à avancer sereinement.", 
    emoji: "💪" 
  }
};

const Questionnaire = () => {
  const navigate = useNavigate();
  const { playNotification } = useNotificationSound();
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [textInput, setTextInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [prenomInput, setPrenomInput] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showEncouragement, setShowEncouragement] = useState<{ message: string; emoji: string } | null>(null);
  const [isRevisiting, setIsRevisiting] = useState(false);
  const [seenEncouragements, setSeenEncouragements] = useState<Set<string>>(new Set());

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
    
    // Gestion des réponses multiples
    if (currentQuestion.type === "multi") {
      const currentAnswers = (answers[questionId] as string[]) || [];
      const maxSelections = currentQuestion.maxSelections || 2;
      
      let newAnswers: string[];
      if (currentAnswers.includes(answer)) {
        // Désélectionner si déjà sélectionné
        newAnswers = currentAnswers.filter(a => a !== answer);
      } else if (currentAnswers.length < maxSelections) {
        // Ajouter si pas encore au max
        newAnswers = [...currentAnswers, answer];
      } else {
        // Remplacer le premier sélectionné si on a atteint le max
        newAnswers = [...currentAnswers.slice(1), answer];
      }
      
      setAnswers(prev => ({ ...prev, [questionId]: newAnswers }));
      return; // Pas d'auto-avance pour les questions multi
    }
    
    // Réponse unique
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    // Trigger encouragement message if applicable and not already seen
    const encouragementMessage = encouragementTriggers[questionId];
    if (encouragementMessage && !seenEncouragements.has(questionId)) {
      setShowEncouragement(encouragementMessage);
      playNotification();
      setSeenEncouragements(prev => new Set(prev).add(questionId));
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
  
  const handleMultiNext = () => {
    const questionId = currentQuestion.id;
    const currentAnswers = (answers[questionId] as string[]) || [];
    
    if (currentAnswers.length > 0 && currentStep < totalSteps - 1) {
      // Trigger encouragement message if applicable and not already seen
      const encouragementMessage = encouragementTriggers[questionId];
      if (encouragementMessage && !seenEncouragements.has(questionId)) {
        setShowEncouragement(encouragementMessage);
        playNotification();
        setSeenEncouragements(prev => new Set(prev).add(questionId));
        setTimeout(() => setShowEncouragement(null), 3000);
      }
      
      setIsAnimating(true);
      setIsRevisiting(false);
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
      setShowEncouragement({ message: "Merci ! Ta feuille de route arrive...", emoji: "✨" });
      playNotification();
      setTimeout(() => {
        navigate("/resultat", { state: { answers: { ...answers, [questionId]: textInput.trim() } } });
      }, 2000);
    }
  };

  const handleContactSubmit = () => {
    if (prenomInput.trim() && emailInput.trim() && consentChecked) {
      setAnswers(prev => ({ 
        ...prev, 
        prenom: prenomInput.trim(),
        email: emailInput.trim(),
        consent: "true"
      }));
      
      // Show encouragement for last question
      setShowEncouragement({ message: "Merci ! Ta feuille de route arrive...", emoji: "✨" });
      playNotification();
      setTimeout(() => {
        navigate("/resultat", { 
          state: { 
            answers: { 
              ...answers, 
              prenom: prenomInput.trim(),
              email: emailInput.trim(),
              consent: "true"
            } 
          } 
        });
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
        if (previousQuestion.type === "text") {
          const prevAnswer = answers[previousQuestion.id];
          if (typeof prevAnswer === "string") {
            setTextInput(prevAnswer);
          }
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

        <div className="container relative z-10 min-h-screen flex flex-col py-6 md:py-12">
          {/* Header */}
          <header className="flex items-center justify-between mb-8 md:mb-16">
            <Logo variant="light" />
          </header>

          {/* Intro content - wider on desktop */}
          <div className="flex-1 flex flex-col justify-center max-w-xl md:max-w-3xl mx-auto w-full text-center px-4">
            <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 md:mb-8 leading-tight">
                Trouve ta direction immobilière
              </h1>
              
              <p className="text-primary-foreground/90 text-lg md:text-xl mb-8 md:mb-10 text-center">
                <strong className="text-primary-foreground">3 minutes</strong> pour recevoir ta feuille de route personnalisée
              </p>

              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8 md:mb-10 border border-primary-foreground/20 max-w-lg mx-auto">
                <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed">
                  Il n'y a pas de bonnes ou de mauvaises réponses.<br />
                  Réponds <strong className="text-primary-foreground">instinctivement</strong>.
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <Button
                  size="lg"
                  onClick={handleStartQuiz}
                  className="w-full group text-lg md:text-xl py-6 md:py-7 bg-[#99c5ff] hover:bg-[#7ab3ff] text-primary font-semibold"
                >
                  Démarrer
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
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

      <div className="container relative z-10 min-h-screen flex flex-col py-6 md:py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 md:mb-12">
          <Logo variant="light" />
          <span className="text-primary-foreground/70 text-sm md:text-base font-medium">
            {currentStep + 1} / {totalSteps}
          </span>
        </header>

        <div className="mb-8 md:mb-12 max-w-3xl mx-auto w-full">
          <Progress value={progress} className="h-2 md:h-3 bg-primary-foreground/20 [&>div]:bg-[#99c5ff]" />
        </div>

        {/* Encouragement message */}
        <div className={`mb-6 transition-all duration-500 ${showEncouragement ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none h-0 mb-0'}`}>
          <div className="bg-white rounded-2xl shadow-lg border border-primary/10 p-4 md:p-5 max-w-md md:max-w-lg mx-auto flex items-center gap-4 animate-scale-in">
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <span className="text-2xl md:text-3xl">{showEncouragement?.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-semibold text-primary/60 uppercase tracking-wide mb-0.5">
                NousProprio
              </p>
              <p className="text-primary font-medium text-base md:text-lg leading-snug">
                {showEncouragement?.message}
              </p>
            </div>
            <span className="text-xs md:text-sm text-primary/40 flex-shrink-0">
              maintenant
            </span>
          </div>
        </div>

        {/* Question content - wider on desktop */}
        <div className="flex-1 flex flex-col justify-center max-w-xl md:max-w-3xl mx-auto w-full px-4 md:px-0">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {/* Step title */}
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-[#99c5ff]/20 text-[#99c5ff] text-xs md:text-sm font-semibold tracking-wide mb-4 md:mb-6">
              {currentQuestion.stepTitle}
            </span>

            {/* Question */}
            <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 md:mb-6 leading-tight">
              {currentQuestion.question}
            </h2>

            {/* Description for text questions */}
            {currentQuestion.description && (
              <p className="text-primary-foreground/70 text-base md:text-lg mb-6 md:mb-8 leading-relaxed whitespace-pre-line">
                {currentQuestion.description}
              </p>
            )}

            {/* Answer options */}
            {currentQuestion.type === "contact" ? (
              <div className="space-y-4 md:space-y-5 mt-4 md:mt-6">
                <div className="md:grid md:grid-cols-2 md:gap-5 space-y-4 md:space-y-0">
                  <Input
                    type="text"
                    value={prenomInput}
                    onChange={(e) => setPrenomInput(e.target.value)}
                    placeholder="Ton prénom..."
                    className="h-14 md:h-16 text-lg md:text-xl bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:ring-accent"
                    autoFocus
                  />
                  <div className="relative">
                    <Input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Ton email..."
                      className="h-14 md:h-16 text-lg md:text-xl bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:ring-accent"
                    />
                  </div>
                </div>
                
                {/* Email domain suggestions */}
                {emailInput && emailInput.includes("@") && !emailInput.includes(".") && (
                  <div className="flex flex-wrap gap-2">
                    {["@gmail.com", "@outlook.fr", "@hotmail.fr", "@yahoo.fr", "@icloud.com"].map((domain) => {
                      const localPart = emailInput.split("@")[0];
                      const suggestion = localPart + domain;
                      return (
                        <button
                          key={domain}
                          type="button"
                          onClick={() => setEmailInput(suggestion)}
                          className="px-3 py-1.5 text-sm rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/80 hover:bg-[#99c5ff]/20 hover:border-[#99c5ff]/50 hover:text-[#99c5ff] transition-all"
                        >
                          {domain}
                        </button>
                      );
                    })}
                  </div>
                )}
                
                <div className="flex items-start gap-3 p-4 md:p-5 rounded-xl bg-primary-foreground/5 border border-primary-foreground/20">
                  <Checkbox 
                    id="consent" 
                    checked={consentChecked}
                    onCheckedChange={(checked) => setConsentChecked(checked === true)}
                    className="mt-1 border-primary-foreground/50 data-[state=checked]:bg-[#99c5ff] data-[state=checked]:border-[#99c5ff]"
                  />
                  <label htmlFor="consent" className="text-primary-foreground/80 text-sm md:text-base leading-relaxed cursor-pointer">
                    J'accepte de recevoir ma feuille de route personnalisée par email
                  </label>
                </div>
                
                <p className="text-primary-foreground/50 text-xs md:text-sm leading-relaxed">
                  🔒 Tes données sont protégées conformément au RGPD. Nous ne les partageons jamais avec des tiers et tu peux te désinscrire à tout moment.
                </p>
                
                <div className="max-w-md mx-auto md:max-w-lg">
                  <Button
                    size="lg"
                    onClick={handleContactSubmit}
                    disabled={!prenomInput.trim() || !emailInput.trim() || !consentChecked || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.trim())}
                    className="w-full group text-lg md:text-xl py-6 md:py-7 bg-[#99c5ff] hover:bg-[#7ab3ff] text-primary font-semibold disabled:opacity-50"
                  >
                    Voir ma feuille de route
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            ) : currentQuestion.type === "text" ? (
              <div className="space-y-4 md:space-y-5 mt-4 md:mt-6">
                <Input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={currentQuestion.placeholder}
                  className="h-14 md:h-16 text-lg md:text-xl bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:ring-accent"
                  onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                  autoFocus
                />
                <div className="max-w-md mx-auto md:max-w-lg">
                  <Button
                    size="lg"
                    onClick={handleTextSubmit}
                    disabled={!textInput.trim()}
                    className="w-full group text-lg md:text-xl py-6 md:py-7 bg-[#99c5ff] hover:bg-[#7ab3ff] text-primary font-semibold disabled:opacity-50"
                  >
                    Voir ma feuille de route
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            ) : currentQuestion.type === "multi" ? (
              <div className="space-y-3 md:space-y-4 mt-4 md:mt-6">
                <p className="text-primary-foreground/70 text-sm md:text-base mb-2">
                  Tu peux sélectionner jusqu'à {currentQuestion.maxSelections} réponses
                </p>
                <div className="md:grid md:grid-cols-2 md:gap-4 space-y-3 md:space-y-0">
                  {currentQuestion.options?.map((option, index) => {
                    const selectedAnswers = (answers[currentQuestion.id] as string[]) || [];
                    const isSelected = selectedAnswers.includes(option);
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-200 group ${
                          isSelected 
                            ? 'bg-[#99c5ff]/20 border-[#99c5ff] text-[#99c5ff]' 
                            : 'bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:border-[#99c5ff]/50'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <span className="flex items-center justify-between text-base md:text-lg">
                          {option}
                          <CheckCircle2 className={`w-5 h-5 md:w-6 md:h-6 transition-all ${
                            isSelected 
                              ? 'opacity-100 text-[#99c5ff]' 
                              : 'opacity-0'
                          }`} />
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bouton Suivant pour les questions multi */}
                {((answers[currentQuestion.id] as string[])?.length > 0) && currentStep < totalSteps - 1 && (
                  <div className="max-w-md mx-auto md:max-w-lg pt-2">
                    <Button
                      size="lg"
                      onClick={handleMultiNext}
                      className="w-full group text-lg md:text-xl py-6 md:py-7 bg-[#99c5ff] hover:bg-[#7ab3ff] text-primary font-semibold"
                    >
                      Suivant
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4 mt-4 md:mt-6">
                <div className="md:grid md:grid-cols-2 md:gap-4 space-y-3 md:space-y-0">
                  {currentQuestion.options?.map((option, index) => {
                    const isSelected = answers[currentQuestion.id] === option;
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-200 group ${
                          isSelected 
                            ? 'bg-[#99c5ff]/20 border-[#99c5ff] text-[#99c5ff]' 
                            : 'bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:border-[#99c5ff]/50'
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <span className="flex items-center justify-between text-base md:text-lg">
                          {option}
                          <ArrowRight className={`w-5 h-5 md:w-6 md:h-6 transition-all ${
                            isSelected 
                              ? 'opacity-100 translate-x-0 text-[#99c5ff]' 
                              : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                          }`} />
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bouton Suivant - seulement si on revient sur une question et qu'une réponse est sélectionnée */}
                {isRevisiting && answers[currentQuestion.id] && currentStep < totalSteps - 1 && (
                  <div className="max-w-md mx-auto md:max-w-lg pt-2">
                    <Button
                      size="lg"
                      onClick={handleNext}
                      className="w-full group text-lg md:text-xl py-6 md:py-7 bg-[#99c5ff] hover:bg-[#7ab3ff] text-primary font-semibold"
                    >
                      Suivant
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 md:mt-12 max-w-3xl mx-auto w-full px-4 md:px-0">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-base md:text-lg"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            Retour
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
