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
  Bell
} from "lucide-react";

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

const formationModules = {
  "Patrimoine Actif": [
    { id: 1, title: "Introduction au patrimoine actif", duration: "45 min", completed: true },
    { id: 2, title: "Stratégies d'investissement locatif", duration: "1h 20", completed: false, current: true },
    { id: 3, title: "Analyse de rentabilité", duration: "55 min", completed: false },
    { id: 4, title: "Fiscalité immobilière avancée", duration: "1h 10", completed: false },
    { id: 5, title: "Montage financier optimisé", duration: "1h 30", completed: false },
    { id: 6, title: "Gestion locative efficace", duration: "50 min", completed: false },
    { id: 7, title: "Développer son patrimoine", duration: "1h 15", completed: false },
    { id: 8, title: "Cas pratiques et mise en action", duration: "2h", completed: false },
  ],
  "Résidence Essentiel": [
    { id: 1, title: "Définir son projet résidentiel", duration: "40 min", completed: true },
    { id: 2, title: "Budget et capacité d'emprunt", duration: "55 min", completed: false, current: true },
    { id: 3, title: "Recherche et sélection de biens", duration: "1h", completed: false },
    { id: 4, title: "Négociation et offre d'achat", duration: "45 min", completed: false },
    { id: 5, title: "Le financement de A à Z", duration: "1h 20", completed: false },
    { id: 6, title: "Les étapes jusqu'à la signature", duration: "1h", completed: false },
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
  const modules = formationModules[mockUser.formation as keyof typeof formationModules] || [];
  const currentModuleData = modules.find(m => m.current);

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
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
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
