import { useState } from "react";
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
  Check
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
  modules: Module[];
  bonus: VideoLesson[];
  replays: VideoLesson[];
}

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
    title: "Patrimoine Actif",
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
    tool: ""
  });

  // État pour la section clients
  const [adminView, setAdminView] = useState<'formations' | 'clients' | 'questions'>('formations');
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
  const [faqQuestions, setFaqQuestions] = useState<Array<{
    id: string;
    clientName: string;
    clientEmail: string;
    question: string;
    submittedAt: string;
    status: 'pending' | 'answered';
  }>>([]);
  const [questionTab, setQuestionTab] = useState<'pending' | 'answered'>('pending');

  // Charger les questions depuis localStorage
  const loadFaqQuestions = () => {
    const questions = JSON.parse(localStorage.getItem('faqQuestions') || '[]');
    setFaqQuestions(questions);
  };

  // Marquer une question comme répondue
  const markQuestionAsAnswered = (questionId: string) => {
    const updatedQuestions = faqQuestions.map(q => 
      q.id === questionId ? { ...q, status: 'answered' as const } : q
    );
    setFaqQuestions(updatedQuestions);
    localStorage.setItem('faqQuestions', JSON.stringify(updatedQuestions));
    toast.success("Question marquée comme répondue");
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

  // Ajouter une formation
  const handleAddFormation = () => {
    if (!newFormationTitle.trim()) {
      toast.error("Veuillez entrer un titre pour la direction / cours");
      return;
    }
    
    const newFormation: Formation = {
      id: Date.now().toString(),
      title: newFormationTitle,
      modules: defaultModules.map(m => ({ ...m, videos: [] })),
      bonus: [],
      replays: []
    };
    
    setFormations([...formations, newFormation]);
    setNewFormationTitle("");
    setIsAddingFormation(false);
    toast.success("Direction / Cours créé avec succès");
  };

  // Supprimer une formation
  const handleDeleteFormation = (formationId: string) => {
    setFormations(formations.filter(f => f.id !== formationId));
    if (selectedFormation?.id === formationId) {
      setSelectedFormation(null);
    }
    toast.success("Direction / Cours supprimé");
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
    setVideoForm({ title: "", vimeoUrl: "", description: "", tool: "" });
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
      tool: video.tool || ""
    } : { title: "", vimeoUrl: "", description: "", tool: "" });
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
            {video.tool}
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
                  {adminView === 'formations' ? 'Gérer les directions / cours' : 'Base de données clients'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Toggle entre Directions / Cours, Clients et Questions */}
              <div className="flex bg-muted rounded-lg p-1">
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
                  <span className="hidden sm:inline">Questions FAQ</span>
                  {faqQuestions.filter(q => q.status === 'pending').length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {faqQuestions.filter(q => q.status === 'pending').length}
                    </span>
                  )}
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
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {question.status === 'pending' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => markQuestionAsAnswered(question.id)}
                                  className="gap-1 text-green-600 border-green-500/30 hover:bg-green-500/10"
                                >
                                  <Check className="w-4 h-4" />
                                  Répondue
                                </Button>
                              )}
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
                  <div className="p-3 border border-primary/20 rounded-lg bg-primary/5 space-y-2">
                    <Input
                      placeholder="Titre de la direction / cours"
                      value={newFormationTitle}
                      onChange={(e) => setNewFormationTitle(e.target.value)}
                      className="h-9"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleAddFormation} className="flex-1">
                        <Save className="w-4 h-4 mr-1" />
                        Créer
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
                        <span className="font-medium text-sm">{formation.title}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFormation(formation.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{formation.modules.reduce((acc, m) => acc + m.videos.length, 0)} vidéos</span>
                      <span>{formation.bonus.length} bonus</span>
                      <span>{formation.replays.length} replays</span>
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
          </div>

          {/* Contenu principal - Détails de la direction / cours */}
          <div className="lg:col-span-8 xl:col-span-9">
            {selectedFormation ? (
              <div className="space-y-4">
                {/* Titre de la direction / cours */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">{selectedFormation.title}</CardTitle>
                  </CardHeader>
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
          <div className="space-y-4 py-4">
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
                placeholder="https://vimeo.com/..."
                value={videoForm.vimeoUrl}
                onChange={(e) => setVideoForm({ ...videoForm, vimeoUrl: e.target.value })}
              />
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
            <div className="space-y-2">
              <Label htmlFor="video-tool">Outil associé (optionnel)</Label>
              <Input
                id="video-tool"
                placeholder="Ex: Simulateur de prêt"
                value={videoForm.tool}
                onChange={(e) => setVideoForm({ ...videoForm, tool: e.target.value })}
              />
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
    </div>
  );
};

export default AdminDashboard;
