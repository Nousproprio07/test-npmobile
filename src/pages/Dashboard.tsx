import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
  List
} from "lucide-react";

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

// Mock data
const mockUser = {
  firstName: "Jean",
  lastName: "Dupont",
  email: "jean.dupont@email.com",
  formation: "Patrimoine Actif", // ou "Résidence Essentiel"
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
  { id: 1, title: "Masterclass Négociation", type: "Vidéo", icon: Play },
  { id: 2, title: "Template offre d'achat", type: "PDF", icon: FileText },
  { id: 3, title: "Guide fiscal complet", type: "PDF", icon: FileText },
];

const coursSupplementaires = [
  { id: 1, title: "Investir en SCPI", duration: "30 min", new: true },
  { id: 2, title: "Le crowdfunding immobilier", duration: "25 min", new: true },
  { id: 3, title: "Optimiser sa fiscalité", duration: "45 min", new: false },
];

// Mock data pour la prochaine session FAQ
const prochaineFAQ = {
  date: "Jeudi 2 Janvier",
  heure: "19h00",
  lienVisio: "https://meet.google.com/abc-defg-hij"
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"formation" | "bloc1" | "bloc3" | "bonus" | "faq">("formation");
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const modules = formationModules[mockUser.formation] || [];
  const currentModuleData = modules.find(m => m.current);

  // Vue détaillée d'un module
  if (selectedModule) {
    const moduleIndex = modules.findIndex(m => m.id === selectedModule.id);
    
    return (
      <div className="min-h-screen bg-background">
        {/* Header simplifié */}
        <header className="bg-card border-b border-border sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedModule(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à ma feuille de route
              </Button>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{mockUser.firstName} {mockUser.lastName}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Colonne principale - Vidéo */}
            <div className="lg:col-span-2 space-y-6">
              {/* Player vidéo */}
              <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={selectedModule.videoUrl}
                  title={selectedModule.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Infos du module */}
              <div>
                <span className="text-sm text-primary font-medium">
                  Module {moduleIndex + 1} sur {modules.length}
                </span>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-1">
                  {selectedModule.title}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
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

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">À propos de ce module</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedModule.description}
                  </p>
                </CardContent>
              </Card>

              {/* Navigation entre modules */}
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  disabled={moduleIndex === 0}
                  onClick={() => {
                    const prevModule = modules[moduleIndex - 1];
                    if (prevModule && (prevModule.completed || prevModule.current)) {
                      setSelectedModule(prevModule);
                    }
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Module précédent
                </Button>
                <Button
                  disabled={moduleIndex === modules.length - 1 || (!modules[moduleIndex + 1]?.completed && !modules[moduleIndex + 1]?.current)}
                  onClick={() => {
                    const nextModule = modules[moduleIndex + 1];
                    if (nextModule) {
                      setSelectedModule(nextModule);
                    }
                  }}
                >
                  Module suivant
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Sidebar - Chapitres */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <List className="w-5 h-5 text-primary" />
                    Chapitres du module
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {selectedModule.chapitres.map((chapitre, idx) => (
                      <li 
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                          {idx + 1}
                        </div>
                        <span className="text-sm text-foreground">{chapitre}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Marquer comme terminé */}
              {!selectedModule.completed && (
                <Button className="w-full" size="lg">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Marquer comme terminé
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-display font-bold text-primary">
              NouveauPatrimoine
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{mockUser.firstName} {mockUser.lastName}</span>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </div>
          </div>
          
          {/* Notification prochaine session */}
          <div className="mt-3 flex items-center justify-end">
            <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 text-sm">
              <Bell className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-muted-foreground">Prochaine FAQ live :</span>
              <span className="font-semibold text-primary">{prochaineFAQ.date} à {prochaineFAQ.heure}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Bonjour {mockUser.firstName} 👋
          </h1>
          <p className="text-muted-foreground">
            Continuez votre progression dans <span className="text-primary font-semibold">{mockUser.formation}</span>
          </p>
        </div>

        {/* Progress Card */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground mb-1">{mockUser.formation}</h2>
                <p className="text-sm text-muted-foreground mb-3">
                  Module {mockUser.currentModule} sur {mockUser.totalModules} • {currentModuleData?.title}
                </p>
                <Progress value={mockUser.progress} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">{mockUser.progress}% complété</p>
              </div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => currentModuleData && setSelectedModule(currentModuleData)}
              >
                <Play className="w-5 h-5 mr-2" />
                Continuer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
          {[
            { id: "formation", label: "Ma feuille de route" },
            { id: "bloc1", label: "Ton point de départ" },
            { id: "bloc3", label: "Bloc 3 - Outils" },
            { id: "bonus", label: "Cours Bonus" },
            { id: "faq", label: "Session FAQ live" },
          ].map((tab) => (
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

        {/* Content based on active tab */}
        {activeTab === "formation" && (
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              Ma feuille de route — {mockUser.formation}
            </h3>
            <div className="grid gap-3">
              {modules.map((module, index) => (
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
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
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
                      <div>
                        <p className={`font-medium ${module.completed || module.current ? "text-foreground" : "text-muted-foreground"}`}>
                          Module {index + 1}: {module.title}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {module.duration}
                        </p>
                      </div>
                    </div>
                    {(module.completed || module.current) && (
                      <Button 
                        variant={module.current ? "default" : "outline"} 
                        size="sm"
                        className={module.current ? "bg-primary text-primary-foreground" : ""}
                        onClick={() => setSelectedModule(module)}
                      >
                        {module.current ? "Continuer" : "Revoir"}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "bloc1" && (
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              Ton point de départ
            </h3>
            <p className="text-muted-foreground mb-6">
              D'après tes réponses, tu n'es pas en train de "chercher un investissement".<br />
              <strong className="text-foreground">Tu cherches une trajectoire claire.</strong>
            </p>
            
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-3 pr-4 text-muted-foreground font-medium text-sm">Élément</th>
                        <th className="py-3 text-muted-foreground font-medium text-sm">Lecture NousProprio</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground">
                      <tr className="border-b border-border/50">
                        <td className="py-4 pr-4 font-bold text-primary">Ta situation actuelle</td>
                        <td className="py-4">
                          {pointDeDepartData.situation_actuelle} — <strong>{pointDeDepartData.situationReading}</strong>
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-4 pr-4 font-bold text-primary">Ton intention profonde</td>
                        <td className="py-4">
                          {pointDeDepartData.benefice.join(", ")}
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-4 pr-4 font-bold text-primary">Ton rapport à l'investissement</td>
                        <td className="py-4">
                          Tu ressens surtout {pointDeDepartData.ressenti.map(r => r.toLowerCase()).join(", ")}
                        </td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-4 pr-4 font-bold text-primary">Ton principal blocage</td>
                        <td className="py-4">
                          {pointDeDepartData.frein.join(", ")}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 pr-4 font-bold text-primary">Ton horizon de passage à l'action</td>
                        <td className="py-4">
                          {pointDeDepartData.horizon}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "bloc3" && (
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              Bloc 3 - Outils avancés
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bloc3Content.map((item) => (
                <Card key={item.id} className="hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.type}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "bonus" && (
          <div className="space-y-4">
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              Cours supplémentaires
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coursSupplementaires.map((cours) => (
                <Card key={cours.id} className="hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Play className="w-6 h-6 text-primary" />
                      </div>
                      {cours.new && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-600 rounded-full">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                      {cours.title}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {cours.duration}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-6">
            <h3 className="text-xl font-display font-semibold text-foreground mb-4">
              Sessions FAQ live
            </h3>
            
            {/* Prochaine session */}
            <Card className="border-primary bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                      <Video className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-500/20 text-green-600 rounded-full mb-2">
                        Prochaine session
                      </span>
                      <h4 className="text-lg font-semibold text-foreground">FAQ live avec l'équipe</h4>
                      <div className="flex items-center gap-4 text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {prochaineFAQ.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {prochaineFAQ.heure}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.open(prochaineFAQ.lienVisio, '_blank')}
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Rejoindre la session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informations sur les sessions */}
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">À propos des sessions FAQ</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Posez toutes vos questions en direct à notre équipe d'experts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Sessions hebdomadaires réservées aux membres</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Replays disponibles si vous ne pouvez pas assister en direct</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Replays */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Replays des sessions précédentes</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { id: 1, title: "FAQ #12 - Fiscalité et optimisation", date: "19 Dec 2024", duration: "1h 15" },
                  { id: 2, title: "FAQ #11 - Négociation immobilière", date: "12 Dec 2024", duration: "58 min" },
                  { id: 3, title: "FAQ #10 - Financement bancaire", date: "5 Dec 2024", duration: "1h 02" },
                ].map((replay) => (
                  <Card key={replay.id} className="hover:border-primary/50 transition-all cursor-pointer group">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Play className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {replay.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {replay.date} • {replay.duration}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
