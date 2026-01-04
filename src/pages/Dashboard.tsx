import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Play, 
  BookOpen, 
  FileText, 
  ChevronRight, 
  Clock, 
  CheckCircle2,
  Lock,
  LogOut,
  User,
  Video,
  Calendar,
  Bell,
  ArrowLeft,
  List,
  Menu,
  X,
  ChevronDown,
  MessageCircle,
  Send,
  GraduationCap,
  Target,
  Sparkles,
  Home
} from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModuleType {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  current?: boolean;
  description: string;
  videoUrl: string;
  chapitres: string[];
}

interface CoursBonusType {
  id: number;
  title: string;
  duration: string;
  description: string;
  purchased: boolean;
  price: number;
  modules?: ModuleType[];
}

// Types de vue pour le Dashboard
type DashboardView = "home" | "direction" | "bonus-course";

// Mock data
const mockUser = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@email.com",
  formation: "Patrimoine Actif",
  progress: 35,
  currentModule: 2,
  totalModules: 8
};

const formationModules: Record<string, ModuleType[]> = {
  "Patrimoine Actif": [
    { 
      id: 1, 
      title: "Introduction au patrimoine actif", 
      duration: "45 min", 
      completed: true,
      description: "Découvre les fondamentaux de l'investissement immobilier et comment construire un patrimoine qui génère des revenus passifs. Ce module pose les bases de ta stratégie patrimoniale.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Qu'est-ce que le patrimoine actif ?", "Les différents types d'investissement", "Définir tes objectifs patrimoniaux", "Les erreurs à éviter"]
    },
    { 
      id: 2, 
      title: "Stratégies d'investissement locatif", 
      duration: "1h 20", 
      completed: false, 
      current: true,
      description: "Maîtrise les différentes stratégies locatives : location nue, meublée, courte durée, colocation. Apprends à choisir celle qui correspond à ton profil et tes objectifs.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Location nue vs meublée", "La location courte durée", "La colocation rentable", "Choisir sa stratégie"]
    },
    { 
      id: 3, 
      title: "Analyse de rentabilité", 
      duration: "55 min", 
      completed: false,
      description: "Apprends à calculer la rentabilité réelle d'un investissement et à identifier les bonnes affaires. Maîtrise les indicateurs clés : rendement brut, net, cash-flow.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Rendement brut et net", "Le cash-flow", "Les charges à prévoir", "Simuler un investissement"]
    },
    { 
      id: 4, 
      title: "Fiscalité immobilière avancée", 
      duration: "1h 10", 
      completed: false,
      description: "Comprends les régimes fiscaux et optimise tes impôts. LMNP, LMP, SCI : découvre les montages les plus avantageux pour ta situation.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Les régimes fiscaux", "LMNP en détail", "Créer une SCI", "Optimiser sa fiscalité"]
    },
    { 
      id: 5, 
      title: "Montage financier optimisé", 
      duration: "1h 30", 
      completed: false,
      description: "Maîtrise le financement bancaire : comment présenter ton dossier, négocier les meilleures conditions et structurer ton emprunt.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Préparer son dossier bancaire", "Négocier son taux", "L'effet de levier", "Les garanties bancaires"]
    },
    { 
      id: 6, 
      title: "Gestion locative efficace", 
      duration: "50 min", 
      completed: false,
      description: "Gère tes biens comme un pro : sélection des locataires, rédaction du bail, gestion des impayés et relation locataire.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Trouver le bon locataire", "Le bail et les documents", "Gérer les incidents", "Automatiser sa gestion"]
    },
    { 
      id: 7, 
      title: "Développer son patrimoine", 
      duration: "1h 15", 
      completed: false,
      description: "Passe à l'échelle : comment enchaîner les investissements et construire un patrimoine immobilier conséquent.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Réinvestir ses revenus", "Diversifier son patrimoine", "Les signaux d'alerte", "Planifier sur 10 ans"]
    },
    { 
      id: 8, 
      title: "Cas pratiques et mise en action", 
      duration: "2h", 
      completed: false,
      description: "Mets en pratique tout ce que tu as appris avec des études de cas réelles et un plan d'action personnalisé.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Étude de cas #1", "Étude de cas #2", "Ton plan d'action", "Les prochaines étapes"]
    },
  ],
  "Résidence Essentiel": [
    { 
      id: 1, 
      title: "Définir son projet résidentiel", 
      duration: "40 min", 
      completed: true,
      description: "Clarifie ton projet de vie et définis les critères essentiels de ta future résidence principale. Un bon projet commence par une vision claire.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Tes besoins réels", "Localisation idéale", "Neuf ou ancien ?", "Ta checklist personnelle"]
    },
    { 
      id: 2, 
      title: "Budget et capacité d'emprunt", 
      duration: "55 min", 
      completed: false, 
      current: true,
      description: "Calcule précisément ta capacité d'achat et comprends les critères bancaires. Apprends à optimiser ton dossier de financement.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Calculer sa capacité", "L'apport personnel", "Les frais annexes", "Optimiser son dossier"]
    },
    { 
      id: 3, 
      title: "Recherche et sélection de biens", 
      duration: "1h", 
      completed: false,
      description: "Méthodologie pour rechercher efficacement et identifier les biens à fort potentiel. Évite les pièges et repère les bonnes affaires.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Où chercher ?", "Analyser une annonce", "La visite efficace", "Les points de vigilance"]
    },
    { 
      id: 4, 
      title: "Négociation et offre d'achat", 
      duration: "45 min", 
      completed: false,
      description: "Maîtrise l'art de la négociation immobilière et rédige une offre d'achat percutante. Obtiens le meilleur prix.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Préparer sa négociation", "Les arguments qui marchent", "Rédiger son offre", "Gérer le refus"]
    },
    { 
      id: 5, 
      title: "Le financement de A à Z", 
      duration: "1h 20", 
      completed: false,
      description: "Tout sur le crédit immobilier : comparaison des offres, négociation avec les banques, assurance emprunteur.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Comparer les banques", "Négocier son prêt", "L'assurance emprunteur", "Les garanties"]
    },
    { 
      id: 6, 
      title: "Les étapes jusqu'à la signature", 
      duration: "1h", 
      completed: false,
      description: "Du compromis à l'acte authentique : toutes les étapes, les délais et les points de vigilance pour une transaction sereine.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      chapitres: ["Le compromis de vente", "Les conditions suspensives", "Chez le notaire", "La remise des clés"]
    },
  ]
};

// Mock data pour "Ton point de départ" basé sur les réponses utilisateur
const pointDeDepartData = {
  situation_actuelle: "J'ai repéré quelques annonces mais je ne sais pas par où commencer",
  situationReading: "Tu explores activement le marché mais manques de méthodologie",
  benefice: ["Développer un patrimoine sur le long terme", "Investir pour générer un patrimoine et des revenus"],
  ressenti: ["De l'excitation", "Du doute"],
  frein: ["Je ne sais pas par où commencer", "Je manque de temps pour m'en occuper"],
  horizon: "Dans les 6 prochains mois"
};

const bloc3Content = [
  { id: 1, title: "Mon comparateur d'annonces", type: "Outil", icon: FileText },
  { id: 2, title: "Template offre d'achat", type: "PDF", icon: FileText },
  { id: 3, title: "Guide fiscal complet", type: "PDF", icon: FileText },
];

// Cours bonus (certains achetés, d'autres non)
const coursSupplementaires: CoursBonusType[] = [
  { 
    id: 1, 
    title: "Investir en SCPI", 
    duration: "30 min", 
    price: 47, 
    description: "Découvre comment investir dans l'immobilier sans acheter de bien physique grâce aux SCPI.",
    purchased: true, // Ce cours est acheté
    modules: [
      { id: 1, title: "Qu'est-ce qu'une SCPI ?", duration: "10 min", completed: true, description: "Introduction aux SCPI et leur fonctionnement.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Définition", "Types de SCPI", "Avantages"] },
      { id: 2, title: "Choisir sa SCPI", duration: "12 min", completed: false, current: true, description: "Les critères pour bien choisir.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Rendement", "Risques", "Diversification"] },
      { id: 3, title: "Fiscalité des SCPI", duration: "8 min", completed: false, description: "Optimiser la fiscalité de ses SCPI.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Imposition", "Régimes fiscaux", "Stratégies"] },
    ]
  },
  { 
    id: 2, 
    title: "Le crowdfunding immobilier", 
    duration: "25 min", 
    price: 37, 
    description: "Comprends le fonctionnement du crowdfunding immobilier et ses opportunités de rendement.",
    purchased: false
  },
  { 
    id: 3, 
    title: "Optimiser sa fiscalité", 
    duration: "45 min", 
    price: 67, 
    description: "Les meilleures stratégies pour réduire tes impôts grâce à l'immobilier.",
    purchased: true, // Ce cours est acheté
    modules: [
      { id: 1, title: "Les bases de la fiscalité immobilière", duration: "15 min", completed: false, current: true, description: "Comprendre les fondamentaux.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Revenus fonciers", "Plus-values", "IFI"] },
      { id: 2, title: "Le régime LMNP", duration: "20 min", completed: false, description: "Tout sur le statut LMNP.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Éligibilité", "Amortissements", "Déclarations"] },
      { id: 3, title: "Stratégies d'optimisation", duration: "10 min", completed: false, description: "Réduire légalement ses impôts.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Déficit foncier", "SCI", "Holding"] },
    ]
  },
  { 
    id: 4, 
    title: "Investir à l'étranger", 
    duration: "40 min", 
    price: 57, 
    description: "Les clés pour réussir ton premier investissement immobilier hors de France.",
    purchased: false
  },
];

const tabItems = [
  { id: "formation", label: "Modules", shortLabel: "Modules" },
  { id: "bloc1", label: "Mon point de départ", shortLabel: "Point de départ" },
  { id: "bloc3", label: "Ma bibliothèque d'outils", shortLabel: "Outils" },
  { id: "faq", label: "Session FAQ live", shortLabel: "FAQ live" },
];

// Mock data pour la prochaine session FAQ
const prochaineFAQData = {
  date: "Jeudi 2 Janvier",
  heure: "19h00",
  lienVisio: "https://meet.google.com/abc-defg-hij",
  dateObj: new Date(2026, 0, 2, 19, 0) // 2 Janvier 2026 à 19h00
};

// Composant FAQ Tab
const FaqTab = ({ 
  faqQuestion, 
  setFaqQuestion, 
  isSubmittingQuestion, 
  handleSubmitQuestion, 
  myQuestions,
  loadMyQuestions
}: {
  faqQuestion: string;
  setFaqQuestion: (val: string) => void;
  isSubmittingQuestion: boolean;
  handleSubmitQuestion: () => void;
  myQuestions: Array<{
    id: string;
    question: string;
    submittedAt: string;
    status: 'pending' | 'answered';
    response?: string;
    respondedAt?: string;
  }>;
  loadMyQuestions: () => void;
}) => {
  useEffect(() => {
    loadMyQuestions();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-4">
        Sessions FAQ live
      </h3>

      {/* Formulaire de question */}
      <Card className="border-primary/50 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h4 className="font-semibold text-foreground">Poser une question</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Ta question sera transmise à notre équipe et traitée lors de la prochaine session FAQ live.
          </p>
          <Textarea
            placeholder="Écris ta question ici... (ex: Comment négocier le prix d'un bien immobilier ?)"
            value={faqQuestion}
            onChange={(e) => setFaqQuestion(e.target.value)}
            className="min-h-[100px] mb-3 resize-none"
          />
          <Button 
            onClick={handleSubmitQuestion}
            disabled={isSubmittingQuestion || !faqQuestion.trim()}
            className="w-full gap-2"
          >
            {isSubmittingQuestion ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Envoyer ma question
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {/* Prochaine session */}
      <Card className="border-primary bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Video className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-500/20 text-green-600 rounded-full mb-1">
                Prochaine session
              </span>
              <h4 className="text-base font-semibold text-foreground">FAQ live</h4>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {prochaineFAQData.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {prochaineFAQData.heure}
            </span>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => window.open(prochaineFAQData.lienVisio, '_blank')}
          >
            <Video className="w-4 h-4 mr-2" />
            Rejoindre la session
          </Button>
        </CardContent>
      </Card>

      {/* Info sessions */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-3">À propos des sessions</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Questions en direct avec nos experts</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Sessions hebdomadaires réservées aux membres</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>Replays disponibles</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Mes questions et réponses */}
      {myQuestions.length > 0 && (
        <div>
          <h4 className="text-base font-semibold text-foreground mb-3">Mes questions</h4>
          <div className="space-y-3">
            {myQuestions.map((q) => (
              <Card key={q.id} className={`overflow-hidden ${q.status === 'answered' ? 'border-green-500/30' : 'border-orange-500/30'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                      q.status === 'answered' 
                        ? 'bg-green-500/20 text-green-600' 
                        : 'bg-orange-500/20 text-orange-600'
                    }`}>
                      {q.status === 'answered' ? 'Répondue' : 'En attente'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(q.submittedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                  <p className="text-foreground font-medium mb-2">{q.question}</p>
                  
                  {q.status === 'answered' && q.response && (
                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-primary mb-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Réponse de l'équipe NousProprio</span>
                      </div>
                      <p className="text-sm text-foreground">{q.response}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Replays */}
      <div>
        <h4 className="text-base font-semibold text-foreground mb-3">Replays</h4>
        <div className="space-y-2">
          {[
            { id: 1, title: "FAQ #12 - Fiscalité", date: "19 Dec", duration: "1h 15" },
            { id: 2, title: "FAQ #11 - Négociation", date: "12 Dec", duration: "58 min" },
            { id: 3, title: "FAQ #10 - Financement", date: "5 Dec", duration: "1h 02" },
          ].map((replay) => (
            <Card key={replay.id} className="hover:border-primary/50 transition-all cursor-pointer active:scale-[0.98]">
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <Play className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{replay.title}</p>
                  <p className="text-xs text-muted-foreground">{replay.date} • {replay.duration}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Vue principale du Dashboard
  const [currentView, setCurrentView] = useState<DashboardView>("home");
  const [selectedBonusCourse, setSelectedBonusCourse] = useState<CoursBonusType | null>(null);
  
  const [activeTab, setActiveTab] = useState<"formation" | "bloc1" | "bloc3" | "faq">("formation");
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState("");
  const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
  const [myQuestions, setMyQuestions] = useState<Array<{
    id: string;
    question: string;
    submittedAt: string;
    status: 'pending' | 'answered';
    response?: string;
    respondedAt?: string;
  }>>([]);
  
  // Modules de la direction principale
  const modules = formationModules[mockUser.formation] || [];
  const currentModuleData = modules.find(m => m.current);

  // Notification toast pour la prochaine FAQ (à chaque visite du dashboard)
  useEffect(() => {
    const timer = setTimeout(() => {
      const now = new Date();
      const diffTime = prochaineFAQData.dateObj.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const joursRestants = diffDays > 0 ? `Dans ${diffDays} jour${diffDays > 1 ? 's' : ''}` : "Aujourd'hui";
      
      toast("📅 Prochaine session FAQ", {
        description: `${joursRestants} - ${prochaineFAQData.date} à ${prochaineFAQData.heure}`,
        duration: 4000
      });
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Cours bonus achetés
  const purchasedBonusCourses = coursSupplementaires.filter(c => c.purchased);
  
  // Récupérer les modules du cours bonus sélectionné
  const bonusCourseModules = selectedBonusCourse?.modules || [];

  // Charger les questions du client
  const loadMyQuestions = () => {
    // Récupérer depuis faq_questions (partagé avec équipe/admin)
    const allQuestions = JSON.parse(localStorage.getItem('faq_questions') || '[]');
    
    // Filtrer les questions de cet utilisateur
    const userQuestions = allQuestions
      .filter((q: any) => q.email === mockUser.email)
      .map((q: any) => ({
        id: q.id,
        question: q.question,
        submittedAt: q.date,
        status: q.status,
        response: q.response,
        respondedAt: q.respondedAt
      }));
    
    setMyQuestions(userQuestions.sort((a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()));
  };

  // Soumettre une question pour la FAQ
  const handleSubmitQuestion = async () => {
    if (!faqQuestion.trim()) {
      toast.error("Veuillez écrire votre question");
      return;
    }

    setIsSubmittingQuestion(true);
    
    // Simulation d'envoi (à connecter à un backend plus tard)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Stocker la question dans localStorage pour la démo
    // On utilise "faq_questions" pour que ce soit visible dans l'espace équipe et admin
    const existingQuestions = JSON.parse(localStorage.getItem('faq_questions') || '[]');
    const newQuestion = {
      id: Date.now().toString(),
      clientName: `${mockUser.firstName} ${mockUser.lastName}`,
      email: mockUser.email,
      question: faqQuestion,
      date: new Date().toISOString(),
      status: 'pending'
    };
    localStorage.setItem('faq_questions', JSON.stringify([...existingQuestions, newQuestion]));
    
    // Aussi sauvegarder dans l'historique client pour persistance
    const clientHistory = JSON.parse(localStorage.getItem('clientFaqHistory') || '[]');
    clientHistory.push({
      id: newQuestion.id,
      question: faqQuestion,
      submittedAt: newQuestion.date,
      status: 'pending'
    });
    localStorage.setItem('clientFaqHistory', JSON.stringify(clientHistory));
    
    toast.success("Votre question a été envoyée ! Elle sera traitée lors de la prochaine session FAQ.");
    setFaqQuestion("");
    setIsSubmittingQuestion(false);
    loadMyQuestions(); // Recharger la liste
  };

  const handleLogout = () => {
    navigate("/connexion");
  };

  // Gestion du retour à la vue précédente
  const handleBackFromModule = () => {
    setSelectedModule(null);
  };

  const handleBackFromCourseView = () => {
    if (selectedModule) {
      setSelectedModule(null);
    } else {
      setCurrentView("home");
      setSelectedBonusCourse(null);
      setActiveTab("formation");
    }
  };

  // Récupérer les modules actuels selon la vue
  const getCurrentModules = (): ModuleType[] => {
    if (currentView === "direction") {
      return modules;
    } else if (currentView === "bonus-course" && selectedBonusCourse?.modules) {
      return selectedBonusCourse.modules;
    }
    return [];
  };

  // Vue détaillée d'un module - OPTIMISÉE MOBILE
  if (selectedModule) {
    const currentModules = getCurrentModules();
    const moduleIndex = currentModules.findIndex(m => m.id === selectedModule.id);
    const contextTitle = currentView === "direction" ? mockUser.formation : selectedBonusCourse?.title || "";
    
    return (
      <div className="min-h-screen bg-background">
        {/* Header mobile-first */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleBackFromModule}
                className="text-muted-foreground hover:text-[#99c5ff] hover:bg-[#99c5ff]/10 -ml-2 px-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline ml-2">Retour</span>
              </Button>
              
              <span className="text-xs sm:text-sm text-muted-foreground">
                Module {moduleIndex + 1}/{currentModules.length}
              </span>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="text-muted-foreground hover:text-glacier-500 px-2"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="pb-24">
          {/* Player vidéo - Full width sur mobile */}
          <div className="aspect-video bg-black w-full">
            <iframe
              src={selectedModule.videoUrl}
              title={selectedModule.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Contenu sous la vidéo */}
          <div className="px-4 py-4 space-y-4">
            {/* Titre et durée */}
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-foreground leading-tight">
                {selectedModule.title}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedModule.duration}
                </span>
                {selectedModule.completed && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Complété
                  </span>
                )}
              </div>
            </div>

            {/* Description - Collapsible sur mobile */}
            <div className="bg-muted/30 rounded-xl p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedModule.description}
              </p>
            </div>

            {/* Chapitres - Accordion style sur mobile */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setShowChapters(!showChapters)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <List className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Chapitres</span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {selectedModule.chapitres.length}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${showChapters ? 'rotate-180' : ''}`} />
              </button>
              
              {showChapters && (
                <div className="px-4 pb-4 space-y-2 border-t border-border pt-3">
                  {selectedModule.chapitres.map((chapitre, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-sm text-foreground">{chapitre}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar fixe - Navigation + CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-area-bottom">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              disabled={moduleIndex === 0}
              onClick={() => {
                const prevModule = currentModules[moduleIndex - 1];
                if (prevModule && (prevModule.completed || prevModule.current)) {
                  setSelectedModule(prevModule);
                }
              }}
              className="flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            {!selectedModule.completed ? (
              <Button className="flex-1" size="lg">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Marquer comme terminé
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="flex-1" 
                size="lg"
                disabled={moduleIndex === currentModules.length - 1}
                onClick={() => {
                  const nextModule = currentModules[moduleIndex + 1];
                  if (nextModule) {
                    setSelectedModule(nextModule);
                  }
                }}
              >
                Module suivant
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            )}
            
            <Button
              variant="outline"
              size="icon"
              disabled={moduleIndex === currentModules.length - 1 || (!currentModules[moduleIndex + 1]?.completed && !currentModules[moduleIndex + 1]?.current)}
              onClick={() => {
                const nextModule = currentModules[moduleIndex + 1];
                if (nextModule) {
                  setSelectedModule(nextModule);
                }
              }}
              className="flex-shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // VUE HOME - Page d'accueil avec les formations
  // ==============================
  if (currentView === "home") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-lg sm:text-xl font-display font-bold text-primary">
                NousProprio
              </Link>
              
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{mockUser.firstName} {mockUser.lastName}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-glacier-500">
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
              
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader className="text-left pb-6 border-b border-border">
                    <SheetTitle className="text-lg font-display">Mon compte</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{mockUser.firstName} {mockUser.lastName}</p>
                        <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-muted-foreground" 
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Se déconnecter
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Notification FAQ */}
            <div className="mt-3 -mx-4 px-4 py-2 bg-primary/5 border-y border-primary/10">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Bell className="w-4 h-4 text-destructive flex-shrink-0 animate-bell-ring" />
                <span className="text-muted-foreground">Prochaine FAQ :</span>
                <span className="font-semibold text-primary truncate">{prochaineFAQData.date} • {prochaineFAQData.heure}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 py-6">
          {/* Welcome */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
              Bonjour {mockUser.firstName} 👋
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Voici ta feuille de route et tes cours bonus
            </p>
          </div>

          {/* Section: Ma Direction (Feuille de route) */}
          <div className="mb-8">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Ma direction
            </h2>
            
            <Card 
              className="border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => setCurrentView("direction")}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-display font-bold text-foreground mb-1">
                      {mockUser.formation}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ta feuille de route personnalisée
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progression</span>
                        <span className="font-bold text-primary">{mockUser.progress}%</span>
                      </div>
                      <Progress value={mockUser.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Module {mockUser.currentModule}/{mockUser.totalModules} • {currentModuleData?.title}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section: Mes cours bonus achetés */}
          {purchasedBonusCourses.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Mes cours bonus
              </h2>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {purchasedBonusCourses.map((cours) => {
                  const courseModules = cours.modules || [];
                  const completedModules = courseModules.filter(m => m.completed).length;
                  const courseProgress = courseModules.length > 0 ? Math.round((completedModules / courseModules.length) * 100) : 0;
                  const currentModule = courseModules.find(m => m.current);
                  
                  return (
                    <Card 
                      key={cours.id}
                      className="hover:border-primary/50 transition-all cursor-pointer group"
                      onClick={() => {
                        setSelectedBonusCourse(cours);
                        setCurrentView("bonus-course");
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-[#99c5ff]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                            <Play className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-1">{cours.title}</h4>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{cours.description}</p>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-muted-foreground">{courseProgress}% complété</span>
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <Clock className="w-3 h-3" /> {cours.duration}
                              </span>
                            </div>
                            <Progress value={courseProgress} className="h-1.5" />
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section: Cours bonus disponibles à l'achat */}
          <div>
            <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              Cours bonus disponibles
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {coursSupplementaires.filter(c => !c.purchased).map((cours) => (
                <Card key={cours.id} className="overflow-hidden hover:border-primary/30 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <p className="text-xl font-bold text-primary">{cours.price}€</p>
                    </div>
                    
                    <h4 className="text-base font-semibold text-foreground mb-1">
                      {cours.title}
                    </h4>
                    
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {cours.description}
                    </p>
                    
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {cours.duration}
                      </span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Acheter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==============================
  // VUE DIRECTION ou COURS BONUS - Contenu détaillé de la formation
  // ==============================
  const isDirectionView = currentView === "direction";
  const isBonusCourseView = currentView === "bonus-course";
  
  // Modules à afficher selon la vue
  const displayModules = isDirectionView ? modules : (selectedBonusCourse?.modules || []);
  const displayTitle = isDirectionView ? mockUser.formation : (selectedBonusCourse?.title || "");
  const completedCount = displayModules.filter(m => m.completed).length;
  const displayProgress = displayModules.length > 0 ? Math.round((completedCount / displayModules.length) * 100) : 0;
  const displayCurrentModule = displayModules.find(m => m.current);

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Mobile optimisé */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Bouton retour + Logo */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleBackFromCourseView}
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 -ml-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Link to="/" className="text-lg sm:text-xl font-display font-bold text-primary">
                NousProprio
              </Link>
            </div>
            
            {/* Desktop: User info */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{mockUser.firstName} {mockUser.lastName}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-glacier-500">
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
            
            {/* Mobile: Menu burger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader className="text-left pb-6 border-b border-border">
                  <SheetTitle className="text-lg font-display">Mon compte</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  {/* User info */}
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{mockUser.firstName} {mockUser.lastName}</p>
                      <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                    </div>
                  </div>
                  
                  {/* Formation info */}
                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">Formation actuelle</p>
                    <p className="font-semibold text-foreground">{displayTitle}</p>
                    <div className="mt-2">
                      <Progress value={displayProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{displayProgress}% complété</p>
                    </div>
                  </div>
                  
                  {/* Retour accueil */}
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-muted-foreground" 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleBackFromCourseView();
                    }}
                  >
                    <Home className="w-4 h-4 mr-3" />
                    Retour à l'accueil
                  </Button>
                  
                  {/* Actions */}
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-muted-foreground" 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Se déconnecter
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {/* Notification FAQ - Compacte sur mobile (uniquement pour la direction) */}
          {isDirectionView && (
            <div className="mt-3 -mx-4 px-4 py-2 bg-primary/5 border-y border-primary/10">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Bell className="w-4 h-4 text-destructive flex-shrink-0 animate-bell-ring" />
                <span className="text-muted-foreground">Prochaine FAQ :</span>
                <span className="font-semibold text-primary truncate">{prochaineFAQData.date} • {prochaineFAQData.heure}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-5">
          {/* Mobile: Bouton retour simple */}
          <div className="md:hidden mb-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackFromCourseView}
              className="text-muted-foreground hover:text-primary p-0 h-auto flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </div>
          
          {/* Desktop: Breadcrumb complet */}
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleBackFromCourseView}
              className="text-muted-foreground hover:text-primary p-0 h-auto"
            >
              Ma direction
            </Button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{displayTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
            {displayTitle}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {isDirectionView ? "Ta feuille de route personnalisée" : "Cours bonus"}
          </p>
        </div>

        {/* Progress Card - Optimisée mobile */}
        <Card className="mb-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base sm:text-lg font-semibold text-foreground">Progression</h2>
                  <span className="text-sm font-bold text-primary">{displayProgress}%</span>
                </div>
                <Progress value={displayProgress} className="h-2 sm:h-3" />
              </div>
              
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-muted-foreground flex-1 line-clamp-1">
                  Module {completedCount + 1}/{displayModules.length} • {displayCurrentModule?.title || displayModules[0]?.title}
                </p>
                <Button 
                  size="default"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground flex-shrink-0"
                  onClick={() => displayCurrentModule && setSelectedModule(displayCurrentModule)}
                >
                  <Play className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Continuer</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs - uniquement pour la direction (pas pour les cours bonus) */}
        {isDirectionView && (
          <div className="mb-6">
            {/* Mobile: Dropdown ou scroll horizontal */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>{tabItems.find(t => t.id === activeTab)?.shortLabel}</span>
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)]">
                  {tabItems.map((tab) => (
                    <DropdownMenuItem 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={activeTab === tab.id ? "bg-primary/10 text-primary" : ""}
                    >
                      {tab.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Desktop: Tabs classiques */}
            <div className="hidden md:flex flex-wrap gap-2 border-b border-border pb-4">
              {tabItems.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={activeTab === tab.id ? "bg-primary text-primary-foreground" : ""}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Contenu pour les cours bonus (liste simple des modules) */}
        {isBonusCourseView && (
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground">
              Modules du cours
            </h3>
            
            <div className="space-y-3">
              {displayModules.map((module, index) => (
                <Card 
                  key={module.id} 
                  className={`transition-all ${
                    module.current 
                      ? "border-primary bg-primary/5" 
                      : module.completed 
                        ? "border-green-500/30 bg-green-500/5" 
                        : "border-border opacity-70"
                  }`}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        module.completed 
                          ? "bg-green-500 text-white" 
                          : module.current 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {module.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : module.current ? (
                          <Play className="w-5 h-5" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm sm:text-base leading-tight ${module.completed || module.current ? "text-foreground" : "text-muted-foreground"}`}>
                          {module.title}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" /> {module.duration}
                        </p>
                      </div>
                      {(module.completed || module.current) && (
                        <Button 
                          variant={module.current ? "default" : "ghost"} 
                          size="sm"
                          className={`flex-shrink-0 ${module.current ? "bg-primary text-primary-foreground" : ""}`}
                          onClick={() => setSelectedModule(module)}
                        >
                          <span className="hidden sm:inline mr-1">{module.current ? "Continuer" : "Revoir"}</span>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Content based on active tab - uniquement pour la direction */}
        {isDirectionView && activeTab === "formation" && (
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground">
              Modules de la formation
            </h3>
            
            {/* Les 3 blocs principaux */}
            <div className="space-y-6">
              {/* Bloc 1: Préparation & Fondations */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">Préparation & Fondations</h4>
                    <p className="text-xs text-muted-foreground">Avant le financement</p>
                  </div>
                </div>
                <div className="ml-4 border-l-2 border-primary/20 pl-6 space-y-3">
                  {modules.slice(0, 3).map((module, index) => (
                    <Card 
                      key={module.id} 
                      className={`transition-all ${
                        module.current 
                          ? "border-primary bg-primary/5" 
                          : module.completed 
                            ? "border-green-500/30 bg-green-500/5" 
                            : "border-border opacity-70"
                      }`}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            module.completed 
                              ? "bg-green-500 text-white" 
                              : module.current 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted text-muted-foreground"
                          }`}>
                            {module.completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : module.current ? (
                              <Play className="w-5 h-5" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm sm:text-base leading-tight ${module.completed || module.current ? "text-foreground" : "text-muted-foreground"}`}>
                              {module.title}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" /> {module.duration}
                            </p>
                          </div>
                          {(module.completed || module.current) && (
                            <Button 
                              variant={module.current ? "default" : "ghost"} 
                              size="sm"
                              className={`flex-shrink-0 ${module.current ? "bg-primary text-primary-foreground" : ""}`}
                              onClick={() => setSelectedModule(module)}
                            >
                              <span className="hidden sm:inline mr-1">{module.current ? "Continuer" : "Revoir"}</span>
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Bloc 2: Maîtrise du Financement & Concrétisation */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">Maîtrise du Financement & Concrétisation</h4>
                    <p className="text-xs text-muted-foreground">Obtenir et sécuriser ton prêt</p>
                  </div>
                </div>
                <div className="ml-4 border-l-2 border-primary/20 pl-6 space-y-3">
                  {modules.slice(3, 5).map((module, index) => (
                    <Card 
                      key={module.id} 
                      className={`transition-all ${
                        module.current 
                          ? "border-primary bg-primary/5" 
                          : module.completed 
                            ? "border-green-500/30 bg-green-500/5" 
                            : "border-border opacity-70"
                      }`}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            module.completed 
                              ? "bg-green-500 text-white" 
                              : module.current 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted text-muted-foreground"
                          }`}>
                            {module.completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : module.current ? (
                              <Play className="w-5 h-5" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm sm:text-base leading-tight ${module.completed || module.current ? "text-foreground" : "text-muted-foreground"}`}>
                              {module.title}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" /> {module.duration}
                            </p>
                          </div>
                          {(module.completed || module.current) && (
                            <Button 
                              variant={module.current ? "default" : "ghost"} 
                              size="sm"
                              className={`flex-shrink-0 ${module.current ? "bg-primary text-primary-foreground" : ""}`}
                              onClick={() => setSelectedModule(module)}
                            >
                              <span className="hidden sm:inline mr-1">{module.current ? "Continuer" : "Revoir"}</span>
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Bloc 3: Après l'Achat & Optimisation */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">Après l'Achat & Optimisation</h4>
                    <p className="text-xs text-muted-foreground">Gérer et valoriser ton bien</p>
                  </div>
                </div>
                <div className="ml-4 border-l-2 border-primary/20 pl-6 space-y-3">
                  {modules.slice(5).map((module, index) => (
                    <Card 
                      key={module.id} 
                      className={`transition-all ${
                        module.current 
                          ? "border-primary bg-primary/5" 
                          : module.completed 
                            ? "border-green-500/30 bg-green-500/5" 
                            : "border-border opacity-70"
                      }`}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            module.completed 
                              ? "bg-green-500 text-white" 
                              : module.current 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted text-muted-foreground"
                          }`}>
                            {module.completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : module.current ? (
                              <Play className="w-5 h-5" />
                            ) : (
                              <Lock className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm sm:text-base leading-tight ${module.completed || module.current ? "text-foreground" : "text-muted-foreground"}`}>
                              {module.title}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" /> {module.duration}
                            </p>
                          </div>
                          {(module.completed || module.current) && (
                            <Button 
                              variant={module.current ? "default" : "ghost"} 
                              size="sm"
                              className={`flex-shrink-0 ${module.current ? "bg-primary text-primary-foreground" : ""}`}
                              onClick={() => setSelectedModule(module)}
                            >
                              <span className="hidden sm:inline mr-1">{module.current ? "Continuer" : "Revoir"}</span>
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {isDirectionView && activeTab === "bloc1" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-2">
                Mon point de départ
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Voici les réponses que tu as renseignées dans le diagnostic pour déterminer ta direction. Elles nous permettent de personnaliser ton accompagnement.
              </p>
            </div>
            
            {/* Cards au lieu du tableau sur mobile */}
            <div className="space-y-3">
              {[
                { label: "Ta situation actuelle", value: pointDeDepartData.situationReading },
                { label: "Ton intention profonde", value: pointDeDepartData.benefice.join(", ") },
                { label: "Ton rapport à l'investissement", value: `Tu ressens ${pointDeDepartData.ressenti.map(r => r.toLowerCase()).join(", ")}` },
                { label: "Ton principal blocage", value: pointDeDepartData.frein.join(", ") },
                { label: "Ton horizon", value: pointDeDepartData.horizon },
              ].map((item, index) => (
                <Card key={index} className="border-primary/10">
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm text-foreground">
                      {item.value}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {isDirectionView && activeTab === "bloc3" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-2">
                Ma bibliothèque d'outils
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Retrouve ici tous les outils, documents et ressources présents dans tes modules. C'est ton espace centralisé pour accéder rapidement à tout ce dont tu as besoin.
              </p>
            </div>
            <div className="grid gap-3">
              {bloc3Content.map((item) => (
                <Card key={item.id} className="hover:border-primary/50 transition-all cursor-pointer active:scale-[0.98]">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {isDirectionView && activeTab === "faq" && (
          <FaqTab 
            faqQuestion={faqQuestion}
            setFaqQuestion={setFaqQuestion}
            isSubmittingQuestion={isSubmittingQuestion}
            handleSubmitQuestion={handleSubmitQuestion}
            myQuestions={myQuestions}
            loadMyQuestions={loadMyQuestions}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
