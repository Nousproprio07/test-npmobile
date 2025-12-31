import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  MessageSquare, 
  Video, 
  Users, 
  Plus, 
  Send, 
  Play, 
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Calendar,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data pour le membre de l'équipe connecté
const teamMember = {
  id: "1",
  firstName: "Sophie",
  lastName: "Martin",
  role: "Coach immobilier"
};

interface CourseProposal {
  id: string;
  title: string;
  relevance: string;
  directions: string[];
  purpose: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  createdBy: string;
}

interface FaqQuestion {
  id: string;
  clientName: string;
  email: string;
  question: string;
  date: string;
  status: "pending" | "answered";
  response?: string;
  respondedBy?: string;
}

// Interface pour les lives de l'admin
interface AdminLiveSession {
  id: string;
  title: string;
  date: string;
  time: string;
  animator: string;
  meetLink: string;
  createdAt: string;
  notificationSent: boolean;
}

interface LiveSession {
  id: string;
  title: string;
  date: string;
  time: string;
  status: "upcoming" | "live" | "ended";
  isHost: boolean;
  link?: string;
  animator?: string;
}

const EquipeAdmin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Course proposals state
  const [courseProposals, setCourseProposals] = useState<CourseProposal[]>([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    relevance: "",
    directions: [] as string[],
    purpose: ""
  });

  // FAQ state
  const [faqQuestions, setFaqQuestions] = useState<FaqQuestion[]>([]);
  const [responseText, setResponseText] = useState<{ [key: string]: string }>({});

  // Lives state
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [hasNewHostLive, setHasNewHostLive] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedProposals = localStorage.getItem("equipe_course_proposals");
    if (savedProposals) {
      setCourseProposals(JSON.parse(savedProposals));
    }

    const savedQuestions = localStorage.getItem("faq_questions");
    if (savedQuestions) {
      setFaqQuestions(JSON.parse(savedQuestions));
    }

    // Charger les lives depuis l'admin
    loadLivesFromAdmin();
  }, []);

  // Charger et transformer les lives de l'admin
  const loadLivesFromAdmin = () => {
    const adminLives = localStorage.getItem('admin_live_sessions');
    if (adminLives) {
      const parsedLives: AdminLiveSession[] = JSON.parse(adminLives);
      const now = new Date();
      
      const transformedLives: LiveSession[] = parsedLives.map(live => {
        const liveDate = new Date(`${live.date}T${live.time}`);
        let status: "upcoming" | "live" | "ended" = "upcoming";
        
        // Déterminer le statut
        if (liveDate < now) {
          status = "ended";
        } else if (liveDate.getTime() - now.getTime() < 3600000) { // Dans l'heure
          status = "live";
        }
        
        // Vérifier si le membre de l'équipe est l'animateur
        const isHost = live.animator.toLowerCase() === teamMember.firstName.toLowerCase();
        
        return {
          id: live.id,
          title: live.title,
          date: live.date,
          time: live.time,
          status,
          isHost,
          link: live.meetLink,
          animator: live.animator
        };
      });

      // Trier : les lives où l'on est host en premier
      const sortedLives = transformedLives.sort((a, b) => {
        if (a.isHost && !b.isHost) return -1;
        if (!a.isHost && b.isHost) return 1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      setLiveSessions(sortedLives);
      
      // Vérifier s'il y a un nouveau live où l'on est host
      const hostLives = sortedLives.filter(l => l.isHost && l.status !== 'ended');
      if (hostLives.length > 0) {
        setHasNewHostLive(true);
      }
    }
  };

  // Save course proposals
  useEffect(() => {
    localStorage.setItem("equipe_course_proposals", JSON.stringify(courseProposals));
  }, [courseProposals]);

  const handleDirectionChange = (direction: string, checked: boolean) => {
    setNewCourse(prev => ({
      ...prev,
      directions: checked 
        ? [...prev.directions, direction]
        : prev.directions.filter(d => d !== direction)
    }));
  };

  const handleSubmitCourse = () => {
    if (!newCourse.title || !newCourse.relevance || !newCourse.purpose || newCourse.directions.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const proposal: CourseProposal = {
      id: Date.now().toString(),
      ...newCourse,
      status: "pending",
      createdAt: new Date().toISOString(),
      createdBy: teamMember.firstName
    };

    setCourseProposals(prev => [...prev, proposal]);
    setNewCourse({ title: "", relevance: "", directions: [], purpose: "" });

    toast({
      title: "Cours soumis",
      description: "Votre proposition de cours a été envoyée pour validation"
    });
  };

  const handleRespondToQuestion = (questionId: string) => {
    const response = responseText[questionId];
    if (!response?.trim()) return;

    const updatedQuestions = faqQuestions.map(q => 
      q.id === questionId 
        ? { ...q, status: "answered" as const, response, respondedBy: teamMember.firstName }
        : q
    );

    setFaqQuestions(updatedQuestions);
    localStorage.setItem("faq_questions", JSON.stringify(updatedQuestions));
    setResponseText(prev => ({ ...prev, [questionId]: "" }));

    toast({
      title: "Réponse envoyée",
      description: "Le client recevra votre réponse dans son espace"
    });
  };

  const getStatusBadge = (status: CourseProposal["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30"><CheckCircle className="w-3 h-3 mr-1" />Approuvé</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30"><AlertCircle className="w-3 h-3 mr-1" />Refusé</Badge>;
    }
  };

  const pendingQuestions = faqQuestions.filter(q => q.status === "pending");
  const answeredQuestions = faqQuestions.filter(q => q.status === "answered");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                Bonjour, {teamMember.firstName} <span className="text-2xl">👋</span>
              </h1>
              <p className="text-sm text-muted-foreground">{teamMember.role}</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Users className="w-3 h-3 mr-1" />
            Équipe
          </Badge>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Notification prochain live - Priorité aux lives où l'on est animateur */}
        {(() => {
          const hostLives = liveSessions.filter(l => l.isHost && l.status !== 'ended');
          const upcomingLives = liveSessions.filter(l => l.status !== 'ended');
          const nextLive = hostLives.length > 0 ? hostLives[0] : upcomingLives[0];
          
          if (!nextLive) return null;
          
          const isAnimator = nextLive.isHost;
          
          return (
            <Card className={`${isAnimator 
              ? 'border-red-500 bg-gradient-to-r from-red-500/10 to-red-500/5 ring-2 ring-red-500/30' 
              : 'border-primary bg-gradient-to-r from-primary/10 to-primary/5'}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${isAnimator ? 'bg-red-500' : 'bg-primary'} flex items-center justify-center flex-shrink-0`}>
                    <Video className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Bell className={`w-4 h-4 ${isAnimator ? 'text-red-500 animate-pulse' : 'text-primary'}`} />
                      <span className={`text-xs font-medium ${isAnimator ? 'text-red-500' : 'text-primary'}`}>
                        {isAnimator ? '🎙️ Vous animez ce live !' : 'Prochain live'}
                      </span>
                      {isAnimator && (
                        <Badge variant="destructive" className="text-xs">
                          Animateur
                        </Badge>
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-foreground">{nextLive.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(nextLive.date).toLocaleDateString("fr-FR", { 
                          weekday: "long", 
                          day: "numeric", 
                          month: "long" 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {nextLive.time}
                      </span>
                      {!isAnimator && nextLive.animator && (
                        <span className="text-xs">
                          Animé par {nextLive.animator}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className={isAnimator ? 'bg-red-600 hover:bg-red-700' : ''}
                    onClick={() => nextLive.link && window.open(nextLive.link, '_blank')}
                  >
                    {isAnimator ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Démarrer
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Rejoindre
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })()}

        <Tabs defaultValue="cours" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="cours" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Proposer un Cours</span>
              <span className="sm:hidden">Cours</span>
            </TabsTrigger>
            <TabsTrigger value="questions" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Questions Clients</span>
              <span className="sm:hidden">Questions</span>
              {pendingQuestions.length > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 justify-center">
                  {pendingQuestions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="lives" className="gap-2 relative">
              <Video className="h-4 w-4" />
              Lives
              {liveSessions.filter(l => l.isHost && l.status !== 'ended').length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {liveSessions.filter(l => l.isHost && l.status !== 'ended').length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="accompagnements" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Accompagnements</span>
              <span className="sm:hidden">Accomp.</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab: Proposer un Cours */}
          <TabsContent value="cours" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Formulaire de proposition */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Proposer un nouveau cours
                  </CardTitle>
                  <CardDescription>
                    Soumettez votre proposition pour validation par l'administrateur
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="course-title">Titre du cours *</Label>
                    <Input
                      id="course-title"
                      placeholder="Ex: Optimisation fiscale avancée"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course-relevance">Pourquoi ce cours est pertinent ? *</Label>
                    <Textarea
                      id="course-relevance"
                      placeholder="Expliquez en quoi ce cours apportera de la valeur aux participants..."
                      rows={3}
                      value={newCourse.relevance}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, relevance: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Pour quelles directions ? *</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="patrimoine-actif"
                          checked={newCourse.directions.includes("Patrimoine Actif")}
                          onCheckedChange={(checked) => handleDirectionChange("Patrimoine Actif", checked as boolean)}
                        />
                        <label htmlFor="patrimoine-actif" className="text-sm font-medium cursor-pointer">
                          Patrimoine Actif
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="residence-essentiel"
                          checked={newCourse.directions.includes("Résidence Essentiel")}
                          onCheckedChange={(checked) => handleDirectionChange("Résidence Essentiel", checked as boolean)}
                        />
                        <label htmlFor="residence-essentiel" className="text-sm font-medium cursor-pointer">
                          Résidence Essentiel
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="les-deux"
                          checked={newCourse.directions.includes("Patrimoine Actif") && newCourse.directions.includes("Résidence Essentiel")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewCourse(prev => ({ ...prev, directions: ["Patrimoine Actif", "Résidence Essentiel"] }));
                            } else {
                              setNewCourse(prev => ({ ...prev, directions: [] }));
                            }
                          }}
                        />
                        <label htmlFor="les-deux" className="text-sm font-medium cursor-pointer">
                          Les deux directions
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course-purpose">Dans quel but ? *</Label>
                    <Textarea
                      id="course-purpose"
                      placeholder="Quel est l'objectif pédagogique de ce cours ? Que les participants sauront-ils faire après ?"
                      rows={3}
                      value={newCourse.purpose}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, purpose: e.target.value }))}
                    />
                  </div>

                  <Button onClick={handleSubmitCourse} className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Soumettre pour validation
                  </Button>
                </CardContent>
              </Card>

              {/* Liste des propositions */}
              <Card>
                <CardHeader>
                  <CardTitle>Mes propositions</CardTitle>
                  <CardDescription>
                    Suivez le statut de vos propositions de cours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {courseProposals.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Aucune proposition de cours</p>
                      <p className="text-sm">Créez votre première proposition</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {courseProposals.map(proposal => (
                        <div key={proposal.id} className="p-4 rounded-lg border border-border/50 bg-card/50 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-medium">{proposal.title}</h4>
                            {getStatusBadge(proposal.status)}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {proposal.directions.map(dir => (
                              <Badge key={dir} variant="secondary" className="text-xs">
                                {dir}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {proposal.purpose}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Soumis le {new Date(proposal.createdAt).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Questions Clients */}
          <TabsContent value="questions" className="space-y-6">
            <Tabs defaultValue="pending" className="space-y-4">
              <TabsList>
                <TabsTrigger value="pending">
                  En attente
                  {pendingQuestions.length > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {pendingQuestions.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="answered">
                  Répondues ({answeredQuestions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {pendingQuestions.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Aucune question en attente</p>
                    </CardContent>
                  </Card>
                ) : (
                  pendingQuestions.map(question => (
                    <Card key={question.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{question.clientName}</CardTitle>
                            <CardDescription>{question.email}</CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                            En attente
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-foreground bg-muted/50 p-3 rounded-lg">
                          {question.question}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Posée le {new Date(question.date).toLocaleDateString("fr-FR")}
                        </p>
                        <div className="space-y-2">
                          <Label>Votre réponse</Label>
                          <Textarea
                            placeholder="Rédigez votre réponse..."
                            value={responseText[question.id] || ""}
                            onChange={(e) => setResponseText(prev => ({ ...prev, [question.id]: e.target.value }))}
                            rows={3}
                          />
                          <Button 
                            onClick={() => handleRespondToQuestion(question.id)}
                            disabled={!responseText[question.id]?.trim()}
                            className="w-full"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Envoyer la réponse
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="answered" className="space-y-4">
                {answeredQuestions.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Aucune question répondue</p>
                    </CardContent>
                  </Card>
                ) : (
                  answeredQuestions.map(question => (
                    <Card key={question.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{question.clientName}</CardTitle>
                            <CardDescription>{question.email}</CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">
                            Répondu
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm font-medium mb-1">Question:</p>
                          <p className="text-foreground">{question.question}</p>
                        </div>
                        {question.response && (
                          <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg">
                            <p className="text-sm font-medium mb-1 text-primary">
                              Réponse {question.respondedBy && `(${question.respondedBy})`}:
                            </p>
                            <p className="text-foreground">{question.response}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Tab: Lives */}
          <TabsContent value="lives" className="space-y-6">
            {/* Section Lives où je suis animateur */}
            {(() => {
              const hostLives = liveSessions.filter(l => l.isHost);
              const otherLives = liveSessions.filter(l => !l.isHost);
              
              return (
                <>
                  {hostLives.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <h3 className="text-lg font-semibold text-foreground">Mes lives à animer</h3>
                        <Badge variant="destructive">{hostLives.length}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {hostLives.map(session => (
                          <Card key={session.id} className="border-red-500/50 bg-gradient-to-br from-red-500/10 to-red-500/5 ring-1 ring-red-500/30">
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <CardTitle className="text-base">{session.title}</CardTitle>
                                <Badge variant="destructive">
                                  🎙️ Animateur
                                </Badge>
                              </div>
                              <CardDescription>
                                {new Date(session.date).toLocaleDateString("fr-FR", { 
                                  weekday: "long", 
                                  day: "numeric", 
                                  month: "long" 
                                })} à {session.time}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <Button 
                                className="w-full bg-red-600 hover:bg-red-700"
                                onClick={() => session.link && window.open(session.link, '_blank')}
                              >
                                <Play className="h-4 w-4 mr-2" />
                                Démarrer le live
                              </Button>
                              <p className="text-xs text-center text-red-600 font-medium">
                                Vous êtes l'animateur de ce live
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {otherLives.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Video className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Autres lives programmés</h3>
                        <Badge variant="secondary">{otherLives.length}</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {otherLives.map(session => (
                          <Card key={session.id} className={session.status === "live" ? "border-primary/50 bg-primary/5" : ""}>
                            <CardHeader>
                              <div className="flex items-start justify-between">
                                <CardTitle className="text-base">{session.title}</CardTitle>
                                {session.status === "live" && (
                                  <Badge variant="destructive" className="animate-pulse">
                                    🔴 EN DIRECT
                                  </Badge>
                                )}
                                {session.status === "upcoming" && (
                                  <Badge variant="outline">À venir</Badge>
                                )}
                                {session.status === "ended" && (
                                  <Badge variant="secondary">Terminé</Badge>
                                )}
                              </div>
                              <CardDescription>
                                {new Date(session.date).toLocaleDateString("fr-FR", { 
                                  weekday: "long", 
                                  day: "numeric", 
                                  month: "long" 
                                })} à {session.time}
                                {session.animator && (
                                  <span className="block mt-1">Animé par {session.animator}</span>
                                )}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <Button 
                                variant="secondary" 
                                className="w-full"
                                onClick={() => session.link && window.open(session.link, '_blank')}
                                disabled={session.status === "ended"}
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {session.status === "ended" ? "Live terminé" : "Accéder au live"}
                              </Button>
                              <p className="text-xs text-muted-foreground text-center">
                                Vous participez à ce live
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {liveSessions.length === 0 && (
                    <Card>
                      <CardContent className="py-12 text-center text-muted-foreground">
                        <Video className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Aucun live programmé</p>
                        <p className="text-sm mt-1">Les lives seront affichés ici une fois créés par l'administrateur</p>
                      </CardContent>
                    </Card>
                  )}
                </>
              );
            })()}
          </TabsContent>

          {/* Tab: Accompagnements */}
          <TabsContent value="accompagnements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Accompagnements Personnels
                </CardTitle>
                <CardDescription>
                  Gérez vos sessions d'accompagnement individuel avec les clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
                  <Users className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Fonctionnalité à venir
                  </h3>
                  <p className="max-w-md mx-auto">
                    Cette section permettra de gérer les accompagnements personnalisés avec les clients : 
                    planification des rendez-vous, suivi des sessions, notes et objectifs.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <Badge variant="secondary">Planification RDV</Badge>
                    <Badge variant="secondary">Suivi client</Badge>
                    <Badge variant="secondary">Notes de session</Badge>
                    <Badge variant="secondary">Objectifs</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default EquipeAdmin;
