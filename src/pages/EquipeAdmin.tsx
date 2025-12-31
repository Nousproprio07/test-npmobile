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

// Prochain live
const prochainLive = {
  title: "FAQ Live - Questions clients",
  date: "Jeudi 2 Janvier",
  heure: "19h00",
  lienVisio: "https://meet.google.com/abc-defg-hij"
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

interface LiveSession {
  id: string;
  title: string;
  date: string;
  time: string;
  status: "upcoming" | "live" | "ended";
  isHost: boolean;
  link?: string;
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
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([
    {
      id: "1",
      title: "Live Q&A - Stratégies d'investissement",
      date: "2025-01-05",
      time: "14:00",
      status: "upcoming",
      isHost: true,
      link: "https://meet.example.com/live-1"
    },
    {
      id: "2",
      title: "Masterclass Patrimoine Actif",
      date: "2025-01-03",
      time: "18:00",
      status: "upcoming",
      isHost: false,
      link: "https://meet.example.com/live-2"
    }
  ]);

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
  }, []);

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
        {/* Notification prochain live */}
        <Card className="border-primary bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">Prochain live</span>
                </div>
                <h4 className="text-base font-semibold text-foreground">{prochainLive.title}</h4>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {prochainLive.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {prochainLive.heure}
                  </span>
                </div>
              </div>
              <Button 
                size="sm"
                onClick={() => window.open(prochainLive.lienVisio, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Rejoindre
              </Button>
            </div>
          </CardContent>
        </Card>

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
            <TabsTrigger value="lives" className="gap-2">
              <Video className="h-4 w-4" />
              Lives
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {liveSessions.map(session => (
                <Card key={session.id} className={session.status === "live" ? "border-red-500/50 bg-red-500/5" : ""}>
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
                    <div className="flex gap-2">
                      {session.isHost ? (
                        <Button className="flex-1 bg-red-600 hover:bg-red-700">
                          <Play className="h-4 w-4 mr-2" />
                          Démarrer le live
                        </Button>
                      ) : (
                        <Button variant="secondary" className="flex-1">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Accéder au live
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      {session.isHost ? "Vous êtes l'animateur de ce live" : "Vous participez à ce live"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {liveSessions.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <Video className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Aucun live programmé</p>
                </CardContent>
              </Card>
            )}
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
