import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  ChevronDown, 
  ChevronUp,
  Video,
  BookOpen,
  GraduationCap,
  PlayCircle,
  Play,
  Wrench,
  ArrowLeft,
  Users,
  User,
  Euro,
  Eye,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Clock,
  Search,
  Mail,
  Send,
  MessageCircle,
  Check,
  Paperclip,
  FileText,
  AlertTriangle
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
interface VideoLesson {
  id: string;
  title: string;
  vimeoUrl: string;
  description: string;
  tool?: string;
  toolUrl?: string;
  attachmentName?: string;
  attachmentUrl?: string;
}

interface Module {
  id: string;
  title: string;
  subtitle: string;
  videos: VideoLesson[];
}

interface Formation {
  id: string;
  title: string;
  displayTitle: string;
  type: 'direction' | 'cours';
  price: string;
  isPublished: boolean;
  modules: Module[];
  bonus: VideoLesson[];
  replays: VideoLesson[];
  // Champs pour les cours
  relevance?: string;
  purpose?: string;
  directions?: string[];
  vimeoUrl?: string;
}

// Types pour les lives
interface LiveSession {
  id: string;
  title: string;
  date: string;
  time: string;
  animator: string;
  meetLink: string;
  createdAt: string;
  notificationSent: boolean;
}

// Liste des animateurs
const animators = [
  { id: "alex", name: "Alex" },
  { id: "johanna", name: "Johanna" },
  { id: "arold", name: "Arold" },
  { id: "sarah", name: "Sarah" },
  { id: "valentine", name: "Valentine" }
];

// Types pour les clients
interface ClientProgress {
  moduleId: string;
  moduleName: string;
  completed: boolean;
  videosCompleted: number;
  totalVideos: number;
}

interface ClientStartingPoint {
  situation: string;
  intention: string;
  sentiment: string;
  blocage: string;
  delai: string;
}

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  amountSpent: number;
  accompagnement: 'residence-essentiel' | 'patrimoine-actif';
  startingPoint: ClientStartingPoint;
  progress: ClientProgress[];
  joinedAt: string;
}

// Données mockup des clients
const mockClients: Client[] = [
  {
    id: "1",
    firstName: "Marie",
    lastName: "Dupont",
    email: "marie.dupont@email.com",
    amountSpent: 497,
    accompagnement: "residence-essentiel",
    startingPoint: {
      situation: "Locataire depuis 5 ans",
      intention: "Acheter ma résidence principale",
      sentiment: "Motivée mais perdue",
      blocage: "Pas assez d'apport",
      delai: "6-12 mois"
    },
    progress: [
      { moduleId: "preparation", moduleName: "Préparation & Fondations", completed: true, videosCompleted: 4, totalVideos: 4 },
      { moduleId: "financement", moduleName: "Maîtrise du Financement", completed: false, videosCompleted: 2, totalVideos: 5 },
      { moduleId: "apres-achat", moduleName: "Après l'Achat", completed: false, videosCompleted: 0, totalVideos: 3 }
    ],
    joinedAt: "2024-01-15"
  },
  {
    id: "2",
    firstName: "Thomas",
    lastName: "Martin",
    email: "thomas.martin@email.com",
    amountSpent: 497,
    accompagnement: "residence-essentiel",
    startingPoint: {
      situation: "Propriétaire voulant revendre",
      intention: "Acheter plus grand",
      sentiment: "Confiant",
      blocage: "Timing de la revente",
      delai: "3-6 mois"
    },
    progress: [
      { moduleId: "preparation", moduleName: "Préparation & Fondations", completed: true, videosCompleted: 4, totalVideos: 4 },
      { moduleId: "financement", moduleName: "Maîtrise du Financement", completed: true, videosCompleted: 5, totalVideos: 5 },
      { moduleId: "apres-achat", moduleName: "Après l'Achat", completed: false, videosCompleted: 1, totalVideos: 3 }
    ],
    joinedAt: "2024-02-20"
  },
  {
    id: "3",
    firstName: "Sophie",
    lastName: "Bernard",
    email: "sophie.bernard@email.com",
    amountSpent: 997,
    accompagnement: "patrimoine-actif",
    startingPoint: {
      situation: "Déjà propriétaire de ma RP",
      intention: "Investir dans du locatif",
      sentiment: "Prête à passer à l'action",
      blocage: "Choix de la stratégie",
      delai: "Moins de 3 mois"
    },
    progress: [
      { moduleId: "preparation", moduleName: "Préparation & Fondations", completed: true, videosCompleted: 6, totalVideos: 6 },
      { moduleId: "financement", moduleName: "Maîtrise du Financement", completed: true, videosCompleted: 7, totalVideos: 7 },
      { moduleId: "apres-achat", moduleName: "Après l'Achat & Optimisation", completed: false, videosCompleted: 3, totalVideos: 5 }
    ],
    joinedAt: "2024-03-05"
  },
  {
    id: "4",
    firstName: "Pierre",
    lastName: "Lefebvre",
    email: "pierre.lefebvre@email.com",
    amountSpent: 997,
    accompagnement: "patrimoine-actif",
    startingPoint: {
      situation: "Multi-propriétaire",
      intention: "Développer mon patrimoine",
      sentiment: "Expert qui veut optimiser",
      blocage: "Fiscalité complexe",
      delai: "6-12 mois"
    },
    progress: [
      { moduleId: "preparation", moduleName: "Préparation & Fondations", completed: true, videosCompleted: 6, totalVideos: 6 },
      { moduleId: "financement", moduleName: "Maîtrise du Financement", completed: false, videosCompleted: 4, totalVideos: 7 },
      { moduleId: "apres-achat", moduleName: "Après l'Achat & Optimisation", completed: false, videosCompleted: 0, totalVideos: 5 }
    ],
    joinedAt: "2024-01-28"
  },
  {
    id: "5",
    firstName: "Julie",
    lastName: "Moreau",
    email: "julie.moreau@email.com",
    amountSpent: 997,
    accompagnement: "patrimoine-actif",
    startingPoint: {
      situation: "Primo-investisseur",
      intention: "Premier investissement locatif",
      sentiment: "Déterminée",
      blocage: "Peur de me tromper",
      delai: "3-6 mois"
    },
    progress: [
      { moduleId: "preparation", moduleName: "Préparation & Fondations", completed: false, videosCompleted: 3, totalVideos: 6 },
      { moduleId: "financement", moduleName: "Maîtrise du Financement", completed: false, videosCompleted: 0, totalVideos: 7 },
      { moduleId: "apres-achat", moduleName: "Après l'Achat & Optimisation", completed: false, videosCompleted: 0, totalVideos: 5 }
    ],
    joinedAt: "2024-03-18"
  }
];

// Modules prédéfinis
const defaultModules: Omit<Module, 'videos'>[] = [
  {
    id: "preparation",
    title: "Préparation & Fondations",
    subtitle: "Avant le financement"
  },
  {
    id: "financement",
    title: "Maîtrise du Financement & Concrétisation",
    subtitle: "Obtenir et sécuriser ton prêt"
  },
  {
    id: "apres-achat",
    title: "Après l'Achat & Optimisation",
    subtitle: "Gérer et valoriser ton bien"
  }
];

// État initial avec une formation exemple
const initialFormations: Formation[] = [
  {
    id: "1",
    title: "Patrimoine Actif /direction",
    displayTitle: "Patrimoine Actif",
    type: 'direction',
    price: "",
    isPublished: false,
    modules: defaultModules.map(m => ({ ...m, videos: [] })),
    bonus: [],
    replays: []
  }
];

const AdminDashboard = () => {
  const [formations, setFormations] = useState<Formation[]>(initialFormations);
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [isAddingFormation, setIsAddingFormation] = useState(false);
  const [newFormationTitle, setNewFormationTitle] = useState("");
  const [newCourseForm, setNewCourseForm] = useState({
    title: "",
    relevance: "",
    purpose: "",
    directions: [] as string[],
    vimeoUrl: ""
  });
  const [editingVideo, setEditingVideo] = useState<{
    formationId: string;
    moduleId?: string;
    type: 'module' | 'bonus' | 'replay';
    video?: VideoLesson;
  } | null>(null);
  const [videoForm, setVideoForm] = useState<Omit<VideoLesson, 'id'>>({
    title: "",
    vimeoUrl: "",
    description: "",
    tool: "",
    toolUrl: "",
    attachmentName: "",
    attachmentUrl: ""
  });

  // État pour la section clients
  const [adminView, setAdminView] = useState<'formations' | 'clients' | 'questions' | 'lives'>('formations');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientFilter, setClientFilter] = useState<'all' | 'residence-essentiel' | 'patrimoine-actif'>('all');
  const [searchQuery, setSearchQuery] = useState("");
  
  // État pour l'envoi d'emails
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState<Client | null>(null);
  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: ""
  });
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // État pour les questions FAQ
  // Questions exemple par défaut
  const defaultExampleQuestions = [
    {
      id: 'example-1',
      clientName: 'Marie Dupont',
      clientEmail: 'marie.dupont@email.com',
      question: 'Comment négocier au mieux le prix d\'un bien immobilier dans un marché tendu ?',
      submittedAt: new Date().toISOString(),
      status: 'pending' as const,
      response: '' as string
    },
    {
      id: 'example-2',
      clientName: 'Thomas Martin',
      clientEmail: 'thomas.martin@email.com',
      question: 'Quelle est la différence entre un prêt à taux fixe et un prêt à taux variable ?',
      submittedAt: new Date(Date.now() - 86400000).toISOString(),
      status: 'pending' as const,
      response: '' as string
    }
  ];

  const [faqQuestions, setFaqQuestions] = useState<Array<{
    id: string;
    clientName: string;
    clientEmail: string;
    question: string;
    submittedAt: string;
    status: 'pending' | 'answered';
    response?: string;
    respondedAt?: string;
  }>>([]);
  const [questionTab, setQuestionTab] = useState<'pending' | 'answered'>('pending');
  const [responseText, setResponseText] = useState<{[key: string]: string}>({});

  // État pour les lives
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>(() => {
    const stored = localStorage.getItem('admin_live_sessions');
    return stored ? JSON.parse(stored) : [];
  });
  const [newLive, setNewLive] = useState({
    title: "",
    date: "",
    time: "",
    animator: "",
    meetLink: ""
  });
  const [isAddingLive, setIsAddingLive] = useState(false);

  // État pour la suppression sécurisée de formation
  const [deleteFormationDialog, setDeleteFormationDialog] = useState<{
    isOpen: boolean;
    formation: Formation | null;
    confirmationStep: 'name' | 'confirm';
    typedName: string;
  }>({
    isOpen: false,
    formation: null,
    confirmationStep: 'name',
    typedName: ""
  });

  // État pour les propositions de cours de l'équipe
  interface TeamCourseProposal {
    id: string;
    title: string;
    relevance: string;
    directions: string[];
    purpose: string;
    status: "pending" | "approved" | "rejected";
    createdAt: string;
    createdBy: string;
  }
  const [teamProposals, setTeamProposals] = useState<TeamCourseProposal[]>([]);

  // Charger les propositions de l'équipe
  useEffect(() => {
    const loadTeamProposals = () => {
      const savedProposals = localStorage.getItem("equipe_course_proposals");
      if (savedProposals) {
        setTeamProposals(JSON.parse(savedProposals));
      }
    };
    loadTeamProposals();
    // Rafraîchir toutes les 5 secondes pour voir les nouvelles propositions
    const interval = setInterval(loadTeamProposals, 5000);
    return () => clearInterval(interval);
  }, []);

  // Approuver une proposition
  const handleApproveProposal = (proposal: TeamCourseProposal) => {
    // Créer le cours à partir de la proposition
    const newFormation: Formation = {
      id: Date.now().toString(),
      title: proposal.title,
      displayTitle: proposal.title,
      type: 'cours',
      price: "",
      isPublished: false,
      modules: [],
      bonus: [],
      replays: [],
      relevance: proposal.relevance,
      purpose: proposal.purpose,
      directions: proposal.directions,
      vimeoUrl: ""
    };
    
    setFormations(prev => [...prev, newFormation]);
    setSelectedFormation(newFormation);
    
    // Mettre à jour le statut de la proposition
    const updatedProposals = teamProposals.map(p => 
      p.id === proposal.id ? { ...p, status: 'approved' as const } : p
    );
    setTeamProposals(updatedProposals);
    localStorage.setItem("equipe_course_proposals", JSON.stringify(updatedProposals));
    
    toast.success(`Proposition "${proposal.title}" approuvée et ajoutée aux cours`);
  };

  // Rejeter une proposition
  const handleRejectProposal = (proposalId: string) => {
    const updatedProposals = teamProposals.map(p => 
      p.id === proposalId ? { ...p, status: 'rejected' as const } : p
    );
    setTeamProposals(updatedProposals);
    localStorage.setItem("equipe_course_proposals", JSON.stringify(updatedProposals));
    toast.success("Proposition refusée");
  };

  // Supprimer une proposition
  const handleDeleteProposal = (proposalId: string) => {
    const updatedProposals = teamProposals.filter(p => p.id !== proposalId);
    setTeamProposals(updatedProposals);
    localStorage.setItem("equipe_course_proposals", JSON.stringify(updatedProposals));
    toast.success("Proposition supprimée");
  };

  const pendingProposals = teamProposals.filter(p => p.status === 'pending');
  const processedProposals = teamProposals.filter(p => p.status !== 'pending');

  // Sauvegarder les lives dans localStorage
  const saveLiveSessions = (sessions: LiveSession[]) => {
    setLiveSessions(sessions);
    localStorage.setItem('admin_live_sessions', JSON.stringify(sessions));
  };

  // Ajouter un live
  const handleAddLive = () => {
    if (!newLive.title || !newLive.date || !newLive.time || !newLive.animator || !newLive.meetLink) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    const live: LiveSession = {
      id: Date.now().toString(),
      ...newLive,
      createdAt: new Date().toISOString(),
      notificationSent: false
    };

    const updatedSessions = [...liveSessions, live];
    saveLiveSessions(updatedSessions);
    
    setNewLive({ title: "", date: "", time: "", animator: "", meetLink: "" });
    setIsAddingLive(false);
    toast.success("Live ajouté avec succès");
  };

  // Envoyer notification aux clients (mockup - nécessite Cloud pour l'email réel)
  const sendLiveNotification = async (liveId: string) => {
    const live = liveSessions.find(l => l.id === liveId);
    if (!live) return;

    // Simulation d'envoi (à connecter à Lovable Cloud pour l'envoi réel)
    toast.info("Envoi des notifications en cours...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedSessions = liveSessions.map(l => 
      l.id === liveId ? { ...l, notificationSent: true } : l
    );
    saveLiveSessions(updatedSessions);
    
    toast.success(`Notification envoyée à ${mockClients.length} clients !`);
  };

  // Supprimer un live
  const deleteLive = (liveId: string) => {
    const updatedSessions = liveSessions.filter(l => l.id !== liveId);
    saveLiveSessions(updatedSessions);
    toast.success("Live supprimé");
  };
  // Charger les questions depuis localStorage
  const loadFaqQuestions = () => {
    const storedQuestions = localStorage.getItem('faqQuestions');
    if (storedQuestions) {
      setFaqQuestions(JSON.parse(storedQuestions));
    } else {
      // Si aucune question stockée, charger les exemples
      setFaqQuestions(defaultExampleQuestions);
      localStorage.setItem('faqQuestions', JSON.stringify(defaultExampleQuestions));
    }
  };

  // Marquer une question comme répondue avec la réponse
  const markQuestionAsAnswered = (questionId: string) => {
    const response = responseText[questionId] || '';
    if (!response.trim()) {
      toast.error("Veuillez écrire une réponse avant de valider");
      return;
    }
    
    const updatedQuestions = faqQuestions.map(q => 
      q.id === questionId ? { 
        ...q, 
        status: 'answered' as const, 
        response: response.trim(),
        respondedAt: new Date().toISOString()
      } : q
    );
    setFaqQuestions(updatedQuestions);
    localStorage.setItem('faqQuestions', JSON.stringify(updatedQuestions));
    
    // Sauvegarder aussi dans l'historique client (qui persiste même après suppression admin)
    const clientHistoryKey = `clientFaqHistory`;
    const clientHistory = JSON.parse(localStorage.getItem(clientHistoryKey) || '[]');
    const answeredQuestion = updatedQuestions.find(q => q.id === questionId);
    if (answeredQuestion) {
      const existingIndex = clientHistory.findIndex((h: any) => h.id === questionId);
      if (existingIndex >= 0) {
        clientHistory[existingIndex] = answeredQuestion;
      } else {
        clientHistory.push(answeredQuestion);
      }
      localStorage.setItem(clientHistoryKey, JSON.stringify(clientHistory));
    }
    
    setResponseText(prev => ({ ...prev, [questionId]: '' }));
    toast.success("Réponse envoyée au client");
  };

  // Supprimer une question
  const deleteQuestion = (questionId: string) => {
    const updatedQuestions = faqQuestions.filter(q => q.id !== questionId);
    setFaqQuestions(updatedQuestions);
    localStorage.setItem('faqQuestions', JSON.stringify(updatedQuestions));
    toast.success("Question supprimée");
  };

  // Supprimer toutes les questions répondues
  const clearAnsweredQuestions = () => {
    const updatedQuestions = faqQuestions.filter(q => q.status !== 'answered');
    setFaqQuestions(updatedQuestions);
    localStorage.setItem('faqQuestions', JSON.stringify(updatedQuestions));
    toast.success("Questions répondues supprimées");
  };

  // Détecter le type à partir du titre
  const detectFormationType = (title: string): { displayTitle: string; type: 'direction' | 'cours' } => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('/direction')) {
      return {
        displayTitle: title.replace(/\/direction/gi, '').trim(),
        type: 'direction'
      };
    } else if (lowerTitle.includes('/cours')) {
      return {
        displayTitle: title.replace(/\/cours/gi, '').trim(),
        type: 'cours'
      };
    }
    return { displayTitle: title, type: 'cours' };
  };

  // Message basé sur le type détecté
  const getTypeMessage = (title: string): string | null => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('/direction')) {
      return "C'est une direction";
    } else if (lowerTitle.includes('/cours')) {
      return "C'est un cours";
    }
    return null;
  };

  // Gérer le changement de direction pour le formulaire de cours
  const handleCourseDirectionChange = (direction: string, checked: boolean) => {
    setNewCourseForm(prev => ({
      ...prev,
      directions: checked 
        ? [...prev.directions, direction]
        : prev.directions.filter(d => d !== direction)
    }));
  };

  // Ajouter une formation (direction ou cours)
  const handleAddFormation = () => {
    // Pour les directions (ancien système avec /direction)
    if (newFormationTitle.toLowerCase().includes('/direction')) {
      const { displayTitle, type } = detectFormationType(newFormationTitle);
      
      const newFormation: Formation = {
        id: Date.now().toString(),
        title: newFormationTitle,
        displayTitle,
        type,
        price: "",
        isPublished: false,
        modules: defaultModules.map(m => ({ ...m, videos: [] })),
        bonus: [],
        replays: []
      };
      
      setFormations([...formations, newFormation]);
      setSelectedFormation(newFormation); // Sélectionner automatiquement
      setNewFormationTitle("");
      setIsAddingFormation(false);
      toast.success("Direction créée avec succès");
      return;
    }

    // Pour les cours (nouveau système avec formulaire complet)
    if (!newCourseForm.title.trim()) {
      toast.error("Veuillez entrer un titre pour le cours");
      return;
    }
    if (!newCourseForm.relevance.trim()) {
      toast.error("Veuillez expliquer pourquoi ce cours est pertinent");
      return;
    }
    if (!newCourseForm.purpose.trim()) {
      toast.error("Veuillez indiquer le but du cours");
      return;
    }
    if (newCourseForm.directions.length === 0) {
      toast.error("Veuillez sélectionner au moins une direction");
      return;
    }
    
    const newFormation: Formation = {
      id: Date.now().toString(),
      title: newCourseForm.title,
      displayTitle: newCourseForm.title,
      type: 'cours',
      price: "",
      isPublished: false,
      modules: [],
      bonus: [],
      replays: [],
      relevance: newCourseForm.relevance,
      purpose: newCourseForm.purpose,
      directions: newCourseForm.directions,
      vimeoUrl: newCourseForm.vimeoUrl
    };
    
    setFormations([...formations, newFormation]);
    setSelectedFormation(newFormation); // Sélectionner automatiquement
    setNewCourseForm({ title: "", relevance: "", purpose: "", directions: [], vimeoUrl: "" });
    setNewFormationTitle("");
    setIsAddingFormation(false);
    toast.success("Cours créé avec succès");
  };

  // Valider et publier un cours directement
  const handleValidateCourse = () => {
    if (!newCourseForm.title.trim() || !newCourseForm.relevance.trim() || 
        !newCourseForm.purpose.trim() || newCourseForm.directions.length === 0 ||
        !newCourseForm.vimeoUrl.trim()) {
      toast.error("Veuillez remplir tous les champs y compris le lien Vimeo pour valider");
      return;
    }
    
    const newFormation: Formation = {
      id: Date.now().toString(),
      title: newCourseForm.title,
      displayTitle: newCourseForm.title,
      type: 'cours',
      price: "0",
      isPublished: true,
      modules: [],
      bonus: [],
      replays: [],
      relevance: newCourseForm.relevance,
      purpose: newCourseForm.purpose,
      directions: newCourseForm.directions,
      vimeoUrl: newCourseForm.vimeoUrl
    };
    
    const updatedFormations = [...formations, newFormation];
    setFormations(updatedFormations);
    localStorage.setItem('admin_formations', JSON.stringify(updatedFormations));
    
    setNewCourseForm({ title: "", relevance: "", purpose: "", directions: [], vimeoUrl: "" });
    setNewFormationTitle("");
    setIsAddingFormation(false);
    toast.success("Cours validé et publié !");
  };

  // Mettre à jour le prix d'une formation
  const handleUpdatePrice = (formationId: string, price: string) => {
    const updatedFormations = formations.map(f => 
      f.id === formationId ? { ...f, price } : f
    );
    setFormations(updatedFormations);
    
    // Mettre à jour aussi selectedFormation si c'est la même
    if (selectedFormation?.id === formationId) {
      setSelectedFormation({ ...selectedFormation, price });
    }
  };

  // Vérifier si une formation est complète (tous les champs remplis)
  const isFormationComplete = (formation: Formation): { complete: boolean; missing: string[] } => {
    const missing: string[] = [];
    
    // Vérifier le prix
    if (!formation.price || formation.price.trim() === "") {
      missing.push("Prix");
    }
    
    // Vérifier que chaque module a au moins une vidéo
    formation.modules.forEach(module => {
      if (module.videos.length === 0) {
        missing.push(`Module "${module.title}" (aucune vidéo)`);
      }
    });
    
    return { complete: missing.length === 0, missing };
  };

  // Publier une formation
  const handlePublishFormation = (formationId: string) => {
    const formation = formations.find(f => f.id === formationId);
    if (!formation) return;

    const { complete, missing } = isFormationComplete(formation);
    
    if (!complete) {
      toast.error(
        <div>
          <p className="font-semibold mb-1">Impossible de publier</p>
          <p className="text-sm">Champs manquants :</p>
          <ul className="text-sm list-disc pl-4 mt-1">
            {missing.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      );
      return;
    }

    const updatedFormations = formations.map(f => 
      f.id === formationId ? { ...f, isPublished: true } : f
    );
    setFormations(updatedFormations);
    
    // Mettre à jour selectedFormation aussi
    if (selectedFormation?.id === formationId) {
      setSelectedFormation({ ...selectedFormation, isPublished: true });
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('admin_formations', JSON.stringify(updatedFormations));
    
    toast.success(`${formation.type === 'direction' ? 'Direction' : 'Cours'} publié avec succès !`);
  };

  // Ouvrir le dialogue de suppression sécurisée
  const openDeleteFormationDialog = (formation: Formation) => {
    setDeleteFormationDialog({
      isOpen: true,
      formation,
      confirmationStep: 'name',
      typedName: ""
    });
  };

  // Vérifier le nom tapé et passer à l'étape de confirmation
  const handleCheckNameAndConfirm = () => {
    if (!deleteFormationDialog.formation) return;
    
    if (deleteFormationDialog.typedName.trim().toLowerCase() === deleteFormationDialog.formation.displayTitle.trim().toLowerCase()) {
      setDeleteFormationDialog(prev => ({ ...prev, confirmationStep: 'confirm' }));
    } else {
      toast.error("Le nom ne correspond pas. Veuillez entrer le nom exact de la formation.");
    }
  };

  // Supprimer une formation après confirmation
  const handleDeleteFormation = () => {
    if (!deleteFormationDialog.formation) return;
    
    const formationId = deleteFormationDialog.formation.id;
    setFormations(formations.filter(f => f.id !== formationId));
    if (selectedFormation?.id === formationId) {
      setSelectedFormation(null);
    }
    
    setDeleteFormationDialog({
      isOpen: false,
      formation: null,
      confirmationStep: 'name',
      typedName: ""
    });
    
    toast.success("Direction / Cours supprimé définitivement");
  };

  // Fermer le dialogue de suppression
  const closeDeleteFormationDialog = () => {
    setDeleteFormationDialog({
      isOpen: false,
      formation: null,
      confirmationStep: 'name',
      typedName: ""
    });
  };

  // Ajouter/Modifier une vidéo
  const handleSaveVideo = () => {
    if (!editingVideo || !videoForm.title.trim() || !videoForm.vimeoUrl.trim()) {
      toast.error("Veuillez remplir le titre et le lien Vimeo");
      return;
    }

    const newVideo: VideoLesson = {
      id: editingVideo.video?.id || Date.now().toString(),
      ...videoForm
    };

    setFormations(formations.map(formation => {
      if (formation.id !== editingVideo.formationId) return formation;

      if (editingVideo.type === 'module' && editingVideo.moduleId) {
        return {
          ...formation,
          modules: formation.modules.map(module => {
            if (module.id !== editingVideo.moduleId) return module;
            
            if (editingVideo.video) {
              // Modification
              return {
                ...module,
                videos: module.videos.map(v => v.id === editingVideo.video!.id ? newVideo : v)
              };
            } else {
              // Ajout
              return {
                ...module,
                videos: [...module.videos, newVideo]
              };
            }
          })
        };
      } else if (editingVideo.type === 'bonus') {
        if (editingVideo.video) {
          return {
            ...formation,
            bonus: formation.bonus.map(v => v.id === editingVideo.video!.id ? newVideo : v)
          };
        } else {
          return {
            ...formation,
            bonus: [...formation.bonus, newVideo]
          };
        }
      } else if (editingVideo.type === 'replay') {
        if (editingVideo.video) {
          return {
            ...formation,
            replays: formation.replays.map(v => v.id === editingVideo.video!.id ? newVideo : v)
          };
        } else {
          return {
            ...formation,
            replays: [...formation.replays, newVideo]
          };
        }
      }
      
      return formation;
    }));

    setEditingVideo(null);
    setVideoForm({ title: "", vimeoUrl: "", description: "", tool: "", toolUrl: "", attachmentName: "", attachmentUrl: "" });
    toast.success(editingVideo.video ? "Vidéo modifiée" : "Vidéo ajoutée");
  };

  // Supprimer une vidéo
  const handleDeleteVideo = (formationId: string, type: 'module' | 'bonus' | 'replay', videoId: string, moduleId?: string) => {
    setFormations(formations.map(formation => {
      if (formation.id !== formationId) return formation;

      if (type === 'module' && moduleId) {
        return {
          ...formation,
          modules: formation.modules.map(module => {
            if (module.id !== moduleId) return module;
            return {
              ...module,
              videos: module.videos.filter(v => v.id !== videoId)
            };
          })
        };
      } else if (type === 'bonus') {
        return {
          ...formation,
          bonus: formation.bonus.filter(v => v.id !== videoId)
        };
      } else if (type === 'replay') {
        return {
          ...formation,
          replays: formation.replays.filter(v => v.id !== videoId)
        };
      }
      
      return formation;
    }));
    toast.success("Vidéo supprimée");
  };

  // Ouvrir le formulaire d'édition
  const openVideoForm = (formationId: string, type: 'module' | 'bonus' | 'replay', moduleId?: string, video?: VideoLesson) => {
    setEditingVideo({ formationId, moduleId, type, video });
    setVideoForm(video ? {
      title: video.title,
      vimeoUrl: video.vimeoUrl,
      description: video.description,
      tool: video.tool || "",
      toolUrl: video.toolUrl || "",
      attachmentName: video.attachmentName || "",
      attachmentUrl: video.attachmentUrl || ""
    } : { title: "", vimeoUrl: "", description: "", tool: "", toolUrl: "", attachmentName: "", attachmentUrl: "" });
  };

  // Composant pour afficher une vidéo
  const VideoCard = ({ video, formationId, type, moduleId }: { 
    video: VideoLesson; 
    formationId: string; 
    type: 'module' | 'bonus' | 'replay';
    moduleId?: string;
  }) => (
    <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg group">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <PlayCircle className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground text-sm truncate">{video.title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{video.description}</p>
        {video.tool && (
          <div className="flex items-center gap-1 mt-1 text-xs text-primary">
            <Wrench className="w-3 h-3" />
            {video.toolUrl ? (
              <a href={video.toolUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {video.tool}
              </a>
            ) : (
              video.tool
            )}
          </div>
        )}
        {video.attachmentName && (
          <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
            <Paperclip className="w-3 h-3" />
            {video.attachmentUrl ? (
              <a href={video.attachmentUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {video.attachmentName}
              </a>
            ) : (
              video.attachmentName
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => openVideoForm(formationId, type, moduleId, video)}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={() => handleDeleteVideo(formationId, type, video.id, moduleId)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  // Filtrer les clients par catégorie et recherche
  const filteredClients = mockClients.filter(client => {
    const matchesFilter = clientFilter === 'all' || client.accompagnement === clientFilter;
    const matchesSearch = searchQuery === "" || 
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const residenceEssentielClients = mockClients.filter(c => c.accompagnement === 'residence-essentiel');
  const patrimoineActifClients = mockClients.filter(c => c.accompagnement === 'patrimoine-actif');

  // Calculer la progression globale d'un client
  const getClientOverallProgress = (client: Client) => {
    const totalCompleted = client.progress.reduce((acc, p) => acc + p.videosCompleted, 0);
    const totalVideos = client.progress.reduce((acc, p) => acc + p.totalVideos, 0);
    return totalVideos > 0 ? Math.round((totalCompleted / totalVideos) * 100) : 0;
  };

  // Ouvrir le dialog d'envoi d'email
  const openEmailDialog = (client: Client) => {
    setEmailRecipient(client);
    setEmailForm({ subject: "", message: "" });
    setIsEmailDialogOpen(true);
  };

  // Envoyer un email (mockup)
  const handleSendEmail = async () => {
    if (!emailRecipient || !emailForm.subject.trim() || !emailForm.message.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setIsSendingEmail(true);
    
    // Simulation d'envoi d'email (mockup)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`Email envoyé à ${emailRecipient.firstName} ${emailRecipient.lastName}`);
    setIsEmailDialogOpen(false);
    setEmailRecipient(null);
    setEmailForm({ subject: "", message: "" });
    setIsSendingEmail(false);
  };

  // Composant pour afficher la fiche client détaillée
  const ClientDetailView = ({ client }: { client: Client }) => (
    <div className="space-y-6">
      {/* En-tête client */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {client.firstName} {client.lastName}
                </h2>
                <p className="text-muted-foreground">{client.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    client.accompagnement === 'patrimoine-actif' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {client.accompagnement === 'patrimoine-actif' ? 'Patrimoine Actif' : 'Résidence Essentiel'}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Client depuis le {new Date(client.joinedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{client.amountSpent}€</div>
              <p className="text-sm text-muted-foreground">dépensés sur le site</p>
            </div>
          </div>
          {/* Bouton envoyer un email */}
          <div className="mt-4 pt-4 border-t border-border">
            <Button 
              onClick={() => openEmailDialog(client)}
              className="gap-2"
            >
              <Mail className="w-4 h-4" />
              Envoyer un email
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Point de départ */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-primary" />
            Point de départ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Situation</p>
              <p className="font-medium text-foreground">{client.startingPoint.situation}</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Intention</p>
              <p className="font-medium text-foreground">{client.startingPoint.intention}</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Sentiment</p>
              <p className="font-medium text-foreground">{client.startingPoint.sentiment}</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Blocage principal</p>
              <p className="font-medium text-foreground">{client.startingPoint.blocage}</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Délai souhaité</p>
              <p className="font-medium text-foreground">{client.startingPoint.delai}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progression */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Progression de l'accompagnement
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">{getClientOverallProgress(client)}%</span>
              <span className="text-sm text-muted-foreground">complété</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress value={getClientOverallProgress(client)} className="h-3" />
          </div>
          <div className="space-y-4">
            {client.progress.map((module) => (
              <div key={module.moduleId} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  module.completed ? 'bg-green-500/10' : 'bg-primary/10'
                }`}>
                  {module.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : module.videosCompleted > 0 ? (
                    <Clock className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{module.moduleName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress 
                      value={(module.videosCompleted / module.totalVideos) * 100} 
                      className="h-2 flex-1 max-w-[200px]" 
                    />
                    <span className="text-sm text-muted-foreground">
                      {module.videosCompleted}/{module.totalVideos} vidéos
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  module.completed 
                    ? 'bg-green-500/10 text-green-600' 
                    : module.videosCompleted > 0 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {module.completed ? 'Terminé' : module.videosCompleted > 0 ? 'En cours' : 'Non commencé'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button 
        variant="outline" 
        onClick={() => setSelectedClient(null)}
        className="w-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour à la liste des clients
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  {adminView === 'formations' ? 'Gérer les directions / cours' : 
                   adminView === 'lives' ? 'Gérer les lives' :
                   adminView === 'questions' ? 'Questions FAQ' : 'Base de données clients'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Toggle entre Directions / Cours, Clients, Questions et Lives */}
              <div className="flex bg-muted rounded-lg p-1 flex-wrap">
                <Button
                  variant={adminView === 'formations' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setAdminView('formations');
                    setSelectedClient(null);
                  }}
                  className="gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="hidden sm:inline">Production</span>
                </Button>
                <Button
                  variant={adminView === 'clients' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setAdminView('clients');
                    setSelectedFormation(null);
                  }}
                  className="gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Clients</span>
                </Button>
                <Button
                  variant={adminView === 'questions' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setAdminView('questions');
                    setSelectedFormation(null);
                    setSelectedClient(null);
                    loadFaqQuestions();
                  }}
                  className="gap-2 relative"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Questions</span>
                  {faqQuestions.filter(q => q.status === 'pending').length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {faqQuestions.filter(q => q.status === 'pending').length}
                    </span>
                  )}
                </Button>
                <Button
                  variant={adminView === 'lives' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setAdminView('lives');
                    setSelectedFormation(null);
                    setSelectedClient(null);
                  }}
                  className="gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span className="hidden sm:inline">Lives</span>
                </Button>
              </div>
              <Link to="/" className="text-lg font-display font-bold text-primary">
                NousProprio
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* VUE CLIENTS */}
        {adminView === 'clients' && (
          <div>
            {selectedClient ? (
              <ClientDetailView client={selectedClient} />
            ) : (
              <div className="space-y-6">
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all ${clientFilter === 'all' ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
                    onClick={() => setClientFilter('all')}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Tous les clients</p>
                          <p className="text-3xl font-bold text-foreground">{mockClients.length}</p>
                        </div>
                        <Users className="w-10 h-10 text-muted-foreground/30" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${clientFilter === 'residence-essentiel' ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
                    onClick={() => setClientFilter('residence-essentiel')}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Résidence Essentiel</p>
                          <p className="text-3xl font-bold text-foreground">{residenceEssentielClients.length}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {residenceEssentielClients.reduce((acc, c) => acc + c.amountSpent, 0)}€ total
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                          <User className="w-5 h-5 text-secondary-foreground" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${clientFilter === 'patrimoine-actif' ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
                    onClick={() => setClientFilter('patrimoine-actif')}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Patrimoine Actif</p>
                          <p className="text-3xl font-bold text-foreground">{patrimoineActifClients.length}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {patrimoineActifClients.reduce((acc, c) => acc + c.amountSpent, 0)}€ total
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Liste des clients */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        {clientFilter === 'all' 
                          ? 'Tous les clients' 
                          : clientFilter === 'residence-essentiel' 
                            ? 'Clients Résidence Essentiel' 
                            : 'Clients Patrimoine Actif'}
                        <span className="text-sm font-normal text-muted-foreground">
                          ({filteredClients.length})
                        </span>
                      </CardTitle>
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Rechercher un client..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {filteredClients.map((client) => (
                        <div
                          key={client.id}
                          className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all group"
                          onClick={() => setSelectedClient(client)}
                        >
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground">
                              {client.firstName} {client.lastName}
                            </h4>
                            <p className="text-sm text-muted-foreground truncate">{client.email}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-1 text-lg font-bold text-primary">
                              <Euro className="w-4 h-4" />
                              {client.amountSpent}
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              client.accompagnement === 'patrimoine-actif' 
                                ? 'bg-primary/10 text-primary' 
                                : 'bg-secondary text-secondary-foreground'
                            }`}>
                              {client.accompagnement === 'patrimoine-actif' ? 'Patrimoine' : 'Résidence'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="text-right">
                              <span className="text-sm font-medium">{getClientOverallProgress(client)}%</span>
                              <Progress value={getClientOverallProgress(client)} className="h-2 w-20" />
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      ))}

                      {filteredClients.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                          <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                          <p className="text-sm">Aucun client dans cette catégorie</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* VUE QUESTIONS FAQ */}
        {adminView === 'questions' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total questions</p>
                      <p className="text-3xl font-bold text-foreground">{faqQuestions.length}</p>
                    </div>
                    <MessageCircle className="w-10 h-10 text-muted-foreground/30" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-orange-500/30 bg-orange-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">En attente</p>
                      <p className="text-3xl font-bold text-orange-500">
                        {faqQuestions.filter(q => q.status === 'pending').length}
                      </p>
                    </div>
                    <Clock className="w-10 h-10 text-orange-500/30" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Répondues</p>
                      <p className="text-3xl font-bold text-green-500">
                        {faqQuestions.filter(q => q.status === 'answered').length}
                      </p>
                    </div>
                    <CheckCircle2 className="w-10 h-10 text-green-500/30" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Liste des questions */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Questions des clients pour la FAQ
                  </CardTitle>
                  {questionTab === 'answered' && faqQuestions.filter(q => q.status === 'answered').length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={clearAnsweredQuestions}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Vider les répondues
                    </Button>
                  )}
                </div>
                {/* Onglets En attente / Répondues */}
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant={questionTab === 'pending' ? 'default' : 'outline'}
                    onClick={() => setQuestionTab('pending')}
                    className="gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    En attente
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-background/20">
                      {faqQuestions.filter(q => q.status === 'pending').length}
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    variant={questionTab === 'answered' ? 'default' : 'outline'}
                    onClick={() => setQuestionTab('answered')}
                    className="gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Répondues
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-background/20">
                      {faqQuestions.filter(q => q.status === 'answered').length}
                    </span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {faqQuestions.filter(q => q.status === questionTab).length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">
                      {questionTab === 'pending' 
                        ? 'Aucune question en attente' 
                        : 'Aucune question répondue'}
                    </p>
                    <p className="text-xs mt-1">
                      {questionTab === 'pending'
                        ? 'Les nouvelles questions apparaîtront ici'
                        : 'Les questions marquées comme répondues apparaîtront ici'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {faqQuestions
                      .filter(q => q.status === questionTab)
                      .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                      .map((question) => (
                        <div
                          key={question.id}
                          className={`p-4 rounded-lg border transition-all ${
                            question.status === 'pending' 
                              ? 'border-orange-500/30 bg-orange-500/5' 
                              : 'border-border bg-muted/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-muted-foreground">
                                  {new Date(question.submittedAt).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              <p className="text-foreground font-medium mb-2">{question.question}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <User className="w-4 h-4" />
                                <span>{question.clientName}</span>
                                <span className="text-muted-foreground/50">•</span>
                                <span>{question.clientEmail}</span>
                              </div>
                              
                              {/* Zone de réponse pour les questions en attente */}
                              {question.status === 'pending' && (
                                <div className="mt-4 space-y-2">
                                  <Textarea
                                    placeholder="Écrivez votre réponse ici..."
                                    value={responseText[question.id] || ''}
                                    onChange={(e) => setResponseText(prev => ({ ...prev, [question.id]: e.target.value }))}
                                    className="min-h-[80px] resize-none"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => markQuestionAsAnswered(question.id)}
                                    disabled={!responseText[question.id]?.trim()}
                                    className="gap-1"
                                  >
                                    <Send className="w-4 h-4" />
                                    Envoyer la réponse
                                  </Button>
                                </div>
                              )}
                              
                              {/* Afficher la réponse pour les questions répondues */}
                              {question.status === 'answered' && question.response && (
                                <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                                  <div className="flex items-center gap-2 text-xs text-primary mb-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span>Répondu le {question.respondedAt && new Date(question.respondedAt).toLocaleDateString('fr-FR', {
                                      day: 'numeric',
                                      month: 'short',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}</span>
                                  </div>
                                  <p className="text-sm text-foreground">{question.response}</p>
                                </div>
                              )}
                            </div>
                            <div className="flex items-start gap-2 flex-shrink-0">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteQuestion(question.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* VUE LIVES */}
        {adminView === 'lives' && (
          <div className="space-y-6">
            {/* Header avec bouton ajouter */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground">Gestion des Lives</h2>
                <p className="text-muted-foreground">Planifiez vos sessions FAQ et notifiez les clients</p>
              </div>
              <Button onClick={() => setIsAddingLive(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Nouveau Live
              </Button>
            </div>

            {/* Formulaire d'ajout de live */}
            {isAddingLive && (
              <Card className="border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" />
                    Programmer un nouveau live
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="live-title">Nom du live *</Label>
                      <Input
                        id="live-title"
                        placeholder="Ex: FAQ : Questions investissement"
                        value={newLive.title}
                        onChange={(e) => setNewLive(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="live-animator">Animateur *</Label>
                      <select
                        id="live-animator"
                        value={newLive.animator}
                        onChange={(e) => setNewLive(prev => ({ ...prev, animator: e.target.value }))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Sélectionner un animateur</option>
                        {animators.map(animator => (
                          <option key={animator.id} value={animator.name}>{animator.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="live-date">Date *</Label>
                      <Input
                        id="live-date"
                        type="date"
                        value={newLive.date}
                        onChange={(e) => setNewLive(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="live-time">Heure *</Label>
                      <Input
                        id="live-time"
                        type="time"
                        value={newLive.time}
                        onChange={(e) => setNewLive(prev => ({ ...prev, time: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="live-link">Lien Google Meet *</Label>
                    <Input
                      id="live-link"
                      placeholder="https://meet.google.com/xxx-xxxx-xxx"
                      value={newLive.meetLink}
                      onChange={(e) => setNewLive(prev => ({ ...prev, meetLink: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => {
                      setIsAddingLive(false);
                      setNewLive({ title: "", date: "", time: "", animator: "", meetLink: "" });
                    }}>
                      Annuler
                    </Button>
                    <Button onClick={handleAddLive}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter le live
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Liste des lives */}
            <div className="grid gap-4">
              {liveSessions.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    <Video className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Aucun live programmé</p>
                    <p className="text-sm mt-1">Cliquez sur "Nouveau Live" pour en créer un</p>
                  </CardContent>
                </Card>
              ) : (
                liveSessions
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map(live => {
                    const liveDate = new Date(live.date);
                    const formattedDate = liveDate.toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long'
                    });

                    return (
                      <Card key={live.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-center gap-4 p-4">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Video className="w-7 h-7 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground text-lg">{live.title}</h3>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {formattedDate} • {live.time}
                                </span>
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  Animé par {live.animator}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <a 
                                  href={live.meetLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary hover:underline truncate max-w-[300px]"
                                >
                                  {live.meetLink}
                                </a>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                              <Button
                                size="sm"
                                className="gap-1 bg-red-600 hover:bg-red-700"
                                onClick={() => window.open(live.meetLink, '_blank')}
                              >
                                <Play className="w-4 h-4" />
                                Démarrer le live
                              </Button>
                              {live.notificationSent ? (
                                <span className="flex items-center gap-1 text-xs text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                                  <Check className="w-3 h-3" />
                                  Notifié
                                </span>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => sendLiveNotification(live.id)}
                                  className="gap-1"
                                >
                                  <Mail className="w-4 h-4" />
                                  Notifier les clients
                                </Button>
                              )}
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => deleteLive(live.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
              )}
            </div>

            {/* Info Cloud */}
            <Card className="border-amber-500/30 bg-amber-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Envoi d'emails aux clients</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Pour activer l'envoi réel d'emails de notification aux clients, connectez Lovable Cloud. 
                      Actuellement, les notifications sont simulées.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* VUE DIRECTIONS / COURS */}
        {adminView === 'formations' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar - Liste des directions / cours */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Directions / Cours
                  </CardTitle>
                  <Button
                    size="sm"
                    onClick={() => setIsAddingFormation(true)}
                    className="h-8"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {isAddingFormation && (
                  <div className="p-4 border border-primary/20 rounded-lg bg-primary/5 space-y-4">
                    {/* Choix du type */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Type</Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={newFormationTitle.includes('/direction') ? 'default' : 'outline'}
                          onClick={() => setNewFormationTitle('/direction')}
                          className="flex-1"
                        >
                          Direction
                        </Button>
                        <Button
                          size="sm"
                          variant={!newFormationTitle.includes('/direction') ? 'default' : 'outline'}
                          onClick={() => setNewFormationTitle('')}
                          className="flex-1"
                        >
                          Cours
                        </Button>
                      </div>
                    </div>

                    {/* Formulaire Direction */}
                    {newFormationTitle.includes('/direction') && (
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="text-sm">Nom de la direction *</Label>
                          <Input
                            placeholder="Ex: Patrimoine Premium"
                            value={newFormationTitle.replace('/direction', '').trim()}
                            onChange={(e) => setNewFormationTitle(e.target.value + ' /direction')}
                            className="h-9"
                          />
                        </div>
                        <div className="bg-blue-500/10 text-blue-600 border border-blue-500/20 text-sm px-3 py-2 rounded-md">
                          ✓ C'est une direction
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleAddFormation} className="flex-1">
                            <Save className="w-4 h-4 mr-1" />
                            Créer la direction
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setIsAddingFormation(false);
                              setNewFormationTitle("");
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Formulaire Cours (style EquipeAdmin) */}
                    {!newFormationTitle.includes('/direction') && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm">Titre du cours *</Label>
                          <Input
                            placeholder="Ex: Optimisation fiscale avancée"
                            value={newCourseForm.title}
                            onChange={(e) => setNewCourseForm(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm">Pourquoi ce cours est pertinent ? *</Label>
                          <Textarea
                            placeholder="Expliquez en quoi ce cours apportera de la valeur aux participants..."
                            rows={2}
                            value={newCourseForm.relevance}
                            onChange={(e) => setNewCourseForm(prev => ({ ...prev, relevance: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm">Pour quelles directions ? *</Label>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="admin-patrimoine-actif"
                                checked={newCourseForm.directions.includes("Patrimoine Actif")}
                                onChange={(e) => handleCourseDirectionChange("Patrimoine Actif", e.target.checked)}
                                className="h-4 w-4 rounded border-input"
                              />
                              <label htmlFor="admin-patrimoine-actif" className="text-sm cursor-pointer">
                                Patrimoine Actif
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="admin-residence-essentiel"
                                checked={newCourseForm.directions.includes("Résidence Essentiel")}
                                onChange={(e) => handleCourseDirectionChange("Résidence Essentiel", e.target.checked)}
                                className="h-4 w-4 rounded border-input"
                              />
                              <label htmlFor="admin-residence-essentiel" className="text-sm cursor-pointer">
                                Résidence Essentiel
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="admin-les-deux"
                                checked={newCourseForm.directions.includes("Patrimoine Actif") && newCourseForm.directions.includes("Résidence Essentiel")}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewCourseForm(prev => ({ ...prev, directions: ["Patrimoine Actif", "Résidence Essentiel"] }));
                                  } else {
                                    setNewCourseForm(prev => ({ ...prev, directions: [] }));
                                  }
                                }}
                                className="h-4 w-4 rounded border-input"
                              />
                              <label htmlFor="admin-les-deux" className="text-sm cursor-pointer">
                                Les deux directions
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm">Dans quel but ? *</Label>
                          <Textarea
                            placeholder="Décrivez l'objectif et les résultats attendus..."
                            rows={2}
                            value={newCourseForm.purpose}
                            onChange={(e) => setNewCourseForm(prev => ({ ...prev, purpose: e.target.value }))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm flex items-center gap-2">
                            <Video className="w-4 h-4 text-primary" />
                            Lien Vimeo
                          </Label>
                          <Input
                            placeholder="https://vimeo.com/..."
                            value={newCourseForm.vimeoUrl}
                            onChange={(e) => setNewCourseForm(prev => ({ ...prev, vimeoUrl: e.target.value }))}
                          />
                        </div>

                        <div className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-sm px-3 py-2 rounded-md">
                          ✓ C'est un cours
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleAddFormation} className="flex-1" variant="outline">
                            <Save className="w-4 h-4 mr-1" />
                            Créer
                          </Button>
                          <Button size="sm" onClick={handleValidateCourse} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Valider
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setIsAddingFormation(false);
                              setNewFormationTitle("");
                              setNewCourseForm({ title: "", relevance: "", purpose: "", directions: [], vimeoUrl: "" });
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {formations.map((formation) => (
                  <div
                    key={formation.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedFormation?.id === formation.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50 hover:bg-muted/30'
                    }`}
                    onClick={() => setSelectedFormation(formation)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">{formation.displayTitle}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          formation.type === 'direction' 
                            ? 'bg-blue-500/10 text-blue-600' 
                            : 'bg-emerald-500/10 text-emerald-600'
                        }`}>
                          {formation.type === 'direction' ? 'Direction' : 'Cours'}
                        </span>
                        {formation.isPublished && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">
                            Publié
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteFormationDialog(formation);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    {/* Afficher les directions pour les cours */}
                    {formation.type === 'cours' && formation.directions && formation.directions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {formation.directions.map((dir, i) => (
                          <span 
                            key={i} 
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              dir === 'Patrimoine Actif' 
                                ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' 
                                : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                            }`}
                          >
                            {dir}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      {formation.type === 'direction' ? (
                        <>
                          <span>{formation.modules.reduce((acc, m) => acc + m.videos.length, 0)} vidéos</span>
                          <span>{formation.bonus.length} bonus</span>
                          <span>{formation.replays.length} replays</span>
                        </>
                      ) : formation.vimeoUrl ? (
                        <span className="flex items-center gap-1 text-primary">
                          <Video className="w-3 h-3" /> Vidéo liée
                        </span>
                      ) : (
                        <span className="text-amber-500">Sans vidéo</span>
                      )}
                      {formation.price && <span className="text-primary font-medium">{formation.price}€</span>}
                    </div>
                  </div>
                ))}

                {formations.length === 0 && !isAddingFormation && (
                  <div className="text-center py-8 text-muted-foreground">
                    <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">Aucune direction / cours</p>
                    <p className="text-xs mt-1">Cliquez sur "Ajouter" pour créer</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section Validation de proposition de cours */}
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-500" />
                    Propositions équipe
                    {pendingProposals.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-amber-500/20 text-amber-600 rounded-full">
                        {pendingProposals.length} en attente
                      </span>
                    )}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {teamProposals.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <FileText className="w-10 h-10 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Aucune proposition de cours</p>
                    <p className="text-xs mt-1">L'équipe n'a pas encore soumis de cours</p>
                  </div>
                ) : (
                  <>
                    {/* Propositions en attente */}
                    {pendingProposals.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-amber-600 uppercase tracking-wide">En attente de validation</p>
                        {pendingProposals.map((proposal) => (
                          <div 
                            key={proposal.id} 
                            className="p-3 border border-amber-500/30 bg-amber-500/5 rounded-lg space-y-2"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm text-foreground">{proposal.title}</h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Par {proposal.createdBy} • {new Date(proposal.createdAt).toLocaleDateString('fr-FR')}
                                </p>
                              </div>
                              <div className="flex gap-1 flex-shrink-0">
                                <Button
                                  size="sm"
                                  className="h-7 text-xs gap-1 bg-emerald-600 hover:bg-emerald-700"
                                  onClick={() => handleApproveProposal(proposal)}
                                >
                                  <Check className="w-3 h-3" />
                                  Valider
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                                  onClick={() => handleRejectProposal(proposal.id)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {proposal.directions.map((dir, i) => (
                                <span 
                                  key={i}
                                  className={`text-xs px-2 py-0.5 rounded-full ${
                                    dir === 'Patrimoine Actif' 
                                      ? 'bg-purple-500/10 text-purple-600' 
                                      : 'bg-amber-500/10 text-amber-600'
                                  }`}
                                >
                                  {dir}
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p><span className="font-medium">Pertinence:</span> {proposal.relevance}</p>
                              <p><span className="font-medium">But:</span> {proposal.purpose}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Propositions traitées */}
                    {processedProposals.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Historique</p>
                        {processedProposals.slice(0, 3).map((proposal) => (
                          <div 
                            key={proposal.id} 
                            className="p-2 border border-border rounded-lg flex items-center justify-between gap-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground truncate">{proposal.title}</p>
                              <p className="text-xs text-muted-foreground">Par {proposal.createdBy}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                proposal.status === 'approved' 
                                  ? 'bg-emerald-500/10 text-emerald-600' 
                                  : 'bg-red-500/10 text-red-600'
                              }`}>
                                {proposal.status === 'approved' ? 'Approuvé' : 'Refusé'}
                              </span>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                onClick={() => handleDeleteProposal(proposal.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal - Détails de la direction / cours */}
          <div className="lg:col-span-8 xl:col-span-9">
            {selectedFormation ? (
              <div className="space-y-4">
                {/* Titre et infos de la direction / cours */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{selectedFormation.displayTitle}</CardTitle>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedFormation.type === 'direction' 
                              ? 'bg-blue-500/10 text-blue-600' 
                              : 'bg-emerald-500/10 text-emerald-600'
                          }`}>
                            {selectedFormation.type === 'direction' ? 'Direction' : 'Cours'}
                          </span>
                          {selectedFormation.isPublished && (
                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600">
                              ✓ Publié
                            </span>
                          )}
                        </div>
                        {selectedFormation.type === 'cours' && selectedFormation.directions && (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedFormation.directions.map((dir, i) => (
                              <span 
                                key={i} 
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  dir === 'Patrimoine Actif' 
                                    ? 'bg-purple-500/10 text-purple-600 border border-purple-500/20' 
                                    : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                                }`}
                              >
                                {dir}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {!selectedFormation.isPublished && (
                          <Button 
                            onClick={() => handlePublishFormation(selectedFormation.id)}
                            className="gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            Publier
                          </Button>
                        )}
                        <Button 
                          variant="outline"
                          className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => openDeleteFormationDialog(selectedFormation)}
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Détails du cours (uniquement pour les cours) */}
                {selectedFormation.type === 'cours' && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Détails du cours
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedFormation.relevance && (
                        <div>
                          <Label className="text-sm text-muted-foreground">Pourquoi ce cours est pertinent ?</Label>
                          <p className="mt-1 text-foreground">{selectedFormation.relevance}</p>
                        </div>
                      )}
                      {selectedFormation.purpose && (
                        <div>
                          <Label className="text-sm text-muted-foreground">Dans quel but ?</Label>
                          <p className="mt-1 text-foreground">{selectedFormation.purpose}</p>
                        </div>
                      )}
                      {selectedFormation.vimeoUrl && (
                        <div>
                          <Label className="text-sm text-muted-foreground flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            Lien Vimeo
                          </Label>
                          <a 
                            href={selectedFormation.vimeoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-1 text-primary hover:underline flex items-center gap-1"
                          >
                            {selectedFormation.vimeoUrl}
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                      {!selectedFormation.vimeoUrl && (
                        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                          <span className="text-sm text-amber-600">Aucun lien Vimeo n'a été renseigné pour ce cours.</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Prix */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Euro className="w-5 h-5 text-primary" />
                      Prix de la {selectedFormation.type === 'direction' ? 'direction' : 'cours'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 max-w-xs">
                        <Input
                          type="number"
                          placeholder="Prix en euros"
                          value={selectedFormation.price}
                          onChange={(e) => handleUpdatePrice(selectedFormation.id, e.target.value)}
                          className="text-lg"
                        />
                      </div>
                      <span className="text-2xl font-bold text-muted-foreground">€</span>
                      {selectedFormation.price && (
                        <span className="text-sm text-green-600 bg-green-500/10 px-3 py-1.5 rounded-full">
                          Prix défini
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Modules */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Video className="w-5 h-5 text-primary" />
                      Modules de la direction / cours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="space-y-2">
                      {selectedFormation.modules.map((module) => (
                        <AccordionItem 
                          key={module.id} 
                          value={module.id}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="hover:no-underline py-3">
                            <div className="flex items-center gap-3 text-left">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <BookOpen className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground">{module.title}</h3>
                                <p className="text-sm text-muted-foreground">{module.subtitle}</p>
                              </div>
                              <span className="ml-auto mr-4 text-xs bg-muted px-2 py-1 rounded-full">
                                {module.videos.length} vidéo{module.videos.length > 1 ? 's' : ''}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="space-y-2 mt-2">
                              {module.videos.map((video) => (
                                <VideoCard 
                                  key={video.id}
                                  video={video}
                                  formationId={selectedFormation.id}
                                  type="module"
                                  moduleId={module.id}
                                />
                              ))}
                              
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full mt-2 border-dashed"
                                onClick={() => openVideoForm(selectedFormation.id, 'module', module.id)}
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter une vidéo
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Cours Bonus */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="text-xl">🎁</span>
                        Cours Bonus
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openVideoForm(selectedFormation.id, 'bonus')}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedFormation.bonus.length > 0 ? (
                      <div className="space-y-2">
                        {selectedFormation.bonus.map((video) => (
                          <VideoCard 
                            key={video.id}
                            video={video}
                            formationId={selectedFormation.id}
                            type="bonus"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground border border-dashed rounded-lg">
                        <p className="text-sm">Aucun cours bonus</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Replays des Lives */}
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <span className="text-xl">🔴</span>
                        Replays des Lives
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openVideoForm(selectedFormation.id, 'replay')}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Ajouter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {selectedFormation.replays.length > 0 ? (
                      <div className="space-y-2">
                        {selectedFormation.replays.map((video) => (
                          <VideoCard 
                            key={video.id}
                            video={video}
                            formationId={selectedFormation.id}
                            type="replay"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground border border-dashed rounded-lg">
                        <p className="text-sm">Aucun replay</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full min-h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <h3 className="text-lg font-medium mb-1">Sélectionnez une direction / cours</h3>
                  <p className="text-sm">Choisissez une direction / cours dans la liste pour le modifier</p>
                </div>
              </Card>
            )}
          </div>
        </div>
        )}
      </div>

      {/* Dialog pour ajouter/modifier une vidéo */}
      <Dialog open={!!editingVideo} onOpenChange={(open) => !open && setEditingVideo(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingVideo?.video ? 'Modifier la vidéo' : 'Ajouter une vidéo'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="video-title">Titre de la vidéo *</Label>
              <Input
                id="video-title"
                placeholder="Ex: Introduction au financement"
                value={videoForm.title}
                onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video-url">Lien Vimeo *</Label>
              <Input
                id="video-url"
                placeholder="https://vimeo.com/123456789"
                value={videoForm.vimeoUrl}
                onChange={(e) => setVideoForm({ ...videoForm, vimeoUrl: e.target.value })}
              />
              {/* Prévisualisation vidéo Vimeo */}
              {videoForm.vimeoUrl && (() => {
                const vimeoMatch = videoForm.vimeoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/);
                const vimeoId = vimeoMatch ? vimeoMatch[1] : null;
                if (vimeoId) {
                  return (
                    <div className="mt-2 rounded-lg overflow-hidden border border-border bg-black">
                      <div className="aspect-video">
                        <iframe
                          src={`https://player.vimeo.com/video/${vimeoId}`}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="autoplay; fullscreen; picture-in-picture"
                          allowFullScreen
                          title="Prévisualisation vidéo"
                        />
                      </div>
                      <div className="p-2 bg-emerald-500/10 border-t border-emerald-500/20 flex items-center gap-2 text-emerald-600 text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        Vidéo détectée et fonctionnelle
                      </div>
                    </div>
                  );
                } else if (videoForm.vimeoUrl.length > 10) {
                  return (
                    <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 text-sm flex items-center gap-2">
                      <X className="w-4 h-4" />
                      Format de lien Vimeo non reconnu. Utilisez le format: https://vimeo.com/123456789
                    </div>
                  );
                }
                return null;
              })()}
            </div>
            <div className="space-y-2">
              <Label htmlFor="video-description">Description</Label>
              <Textarea
                id="video-description"
                placeholder="Décrivez le contenu de la vidéo..."
                value={videoForm.description}
                onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                rows={3}
              />
            </div>
            
            {/* Section Outil associé */}
            <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/20">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-primary" />
                  Outil associé (optionnel)
                </Label>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="video-tool" className="text-sm text-muted-foreground">Nom de l'outil</Label>
                  <Input
                    id="video-tool"
                    placeholder="Ex: Simulateur de prêt"
                    value={videoForm.tool}
                    onChange={(e) => setVideoForm({ ...videoForm, tool: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="video-tool-link" className="text-sm text-muted-foreground">Lien vers l'outil (optionnel)</Label>
                  <Input
                    id="video-tool-link"
                    placeholder="https://exemple.com/outil"
                    value={videoForm.toolUrl}
                    onChange={(e) => setVideoForm({ ...videoForm, toolUrl: e.target.value })}
                  />
                </div>
              </div>
              
              {/* Aperçu de l'outil si rempli */}
              {videoForm.tool && (
                <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{videoForm.tool}</p>
                    {videoForm.toolUrl && (
                      <a 
                        href={videoForm.toolUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline truncate block max-w-[250px]"
                      >
                        {videoForm.toolUrl}
                      </a>
                    )}
                  </div>
                  {videoForm.toolUrl && (
                    <a 
                      href={videoForm.toolUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                      Ouvrir
                    </a>
                  )}
                </div>
              )}
            </div>
            
            {/* Section Pièce jointe */}
            <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/20">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-emerald-600" />
                  Pièce jointe (optionnel)
                </Label>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="video-attachment-name" className="text-sm text-muted-foreground">Nom du fichier</Label>
                  <Input
                    id="video-attachment-name"
                    placeholder="Ex: Guide PDF, Checklist..."
                    value={videoForm.attachmentName}
                    onChange={(e) => setVideoForm({ ...videoForm, attachmentName: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="video-attachment-url-input" className="text-sm text-muted-foreground">Lien vers le fichier</Label>
                  <Input
                    id="video-attachment-url-input"
                    placeholder="https://drive.google.com/... ou autre lien"
                    value={videoForm.attachmentUrl}
                    onChange={(e) => setVideoForm({ ...videoForm, attachmentUrl: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    💡 Hébergez votre fichier sur Google Drive, Dropbox ou autre et collez le lien de partage
                  </p>
                </div>
              </div>
              
              {/* Aperçu de la pièce jointe si remplie */}
              {videoForm.attachmentName && (
                <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{videoForm.attachmentName}</p>
                    {videoForm.attachmentUrl && (
                      <a 
                        href={videoForm.attachmentUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-600 hover:underline truncate block max-w-[250px]"
                      >
                        {videoForm.attachmentUrl}
                      </a>
                    )}
                  </div>
                  {videoForm.attachmentUrl && (
                    <a 
                      href={videoForm.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                    >
                      Ouvrir
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button onClick={handleSaveVideo}>
              <Save className="w-4 h-4 mr-2" />
              {editingVideo?.video ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour envoyer un email */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Envoyer un email
            </DialogTitle>
          </DialogHeader>
          {emailRecipient && (
            <div className="space-y-4 py-4">
              {/* Destinataire */}
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {emailRecipient.firstName} {emailRecipient.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{emailRecipient.email}</p>
                </div>
              </div>

              {/* Objet */}
              <div className="space-y-2">
                <Label htmlFor="email-subject">Objet *</Label>
                <Input
                  id="email-subject"
                  placeholder="Ex: Suivi de votre accompagnement"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="email-message">Message *</Label>
                <Textarea
                  id="email-message"
                  placeholder="Écrivez votre message ici..."
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  rows={6}
                />
              </div>

              {/* Templates rapides */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Messages rapides</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEmailForm({
                      subject: "Suivi de votre accompagnement NousProprio",
                      message: `Bonjour ${emailRecipient.firstName},\n\nJ'espère que votre accompagnement se passe bien. Je voulais prendre de vos nouvelles et voir si vous aviez des questions.\n\nN'hésitez pas à me contacter si vous avez besoin d'aide.\n\nÀ bientôt,\nL'équipe NousProprio`
                    })}
                  >
                    Suivi général
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEmailForm({
                      subject: "Avez-vous besoin d'aide ?",
                      message: `Bonjour ${emailRecipient.firstName},\n\nJ'ai remarqué que vous n'avez pas progressé récemment dans votre formation. Y a-t-il quelque chose qui vous bloque ?\n\nJe suis disponible pour un appel si vous le souhaitez.\n\nÀ bientôt,\nL'équipe NousProprio`
                    })}
                  >
                    Relance
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEmailForm({
                      subject: "Félicitations pour votre progression !",
                      message: `Bonjour ${emailRecipient.firstName},\n\nJe tenais à vous féliciter pour votre progression dans l'accompagnement ! Vous êtes sur la bonne voie.\n\nContinuez comme ça !\n\nÀ bientôt,\nL'équipe NousProprio`
                    })}
                  >
                    Félicitations
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isSendingEmail}>Annuler</Button>
            </DialogClose>
            <Button onClick={handleSendEmail} disabled={isSendingEmail}>
              {isSendingEmail ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de suppression sécurisée */}
      <Dialog 
        open={deleteFormationDialog.isOpen} 
        onOpenChange={(open) => !open && closeDeleteFormationDialog()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Supprimer {deleteFormationDialog.formation?.type === 'direction' ? 'la direction' : 'le cours'}
            </DialogTitle>
          </DialogHeader>
          
          {deleteFormationDialog.confirmationStep === 'name' ? (
            <div className="space-y-4">
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-foreground">
                  Vous êtes sur le point de supprimer <strong>"{deleteFormationDialog.formation?.displayTitle}"</strong>.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Pour confirmer, veuillez entrer le nom complet de la formation :
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-name">Nom de la formation</Label>
                <Input
                  id="confirm-name"
                  placeholder={deleteFormationDialog.formation?.displayTitle}
                  value={deleteFormationDialog.typedName}
                  onChange={(e) => setDeleteFormationDialog(prev => ({ ...prev, typedName: e.target.value }))}
                  className="border-destructive/30 focus:border-destructive"
                />
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={closeDeleteFormationDialog}>
                  Annuler
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleCheckNameAndConfirm}
                  disabled={!deleteFormationDialog.typedName.trim()}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-3" />
                <p className="text-lg font-semibold text-foreground">
                  Êtes-vous sûr ?
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Cette action est irréversible. La formation <strong>"{deleteFormationDialog.formation?.displayTitle}"</strong> et tout son contenu seront définitivement supprimés.
                </p>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={closeDeleteFormationDialog}>
                  Non, annuler
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteFormation}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Oui, supprimer définitivement
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
