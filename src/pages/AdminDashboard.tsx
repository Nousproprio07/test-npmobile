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
  ArrowLeft
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

  // Ajouter une formation
  const handleAddFormation = () => {
    if (!newFormationTitle.trim()) {
      toast.error("Veuillez entrer un titre pour la formation");
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
    toast.success("Formation créée avec succès");
  };

  // Supprimer une formation
  const handleDeleteFormation = (formationId: string) => {
    setFormations(formations.filter(f => f.id !== formationId));
    if (selectedFormation?.id === formationId) {
      setSelectedFormation(null);
    }
    toast.success("Formation supprimée");
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
                <p className="text-sm text-muted-foreground">Gérer les formations</p>
              </div>
            </div>
            <Link to="/" className="text-lg font-display font-bold text-primary">
              NousProprio
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar - Liste des formations */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Formations
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
                      placeholder="Titre de la formation"
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
                    <p className="text-sm">Aucune formation</p>
                    <p className="text-xs mt-1">Cliquez sur "Ajouter" pour créer</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal - Détails de la formation */}
          <div className="lg:col-span-8 xl:col-span-9">
            {selectedFormation ? (
              <div className="space-y-4">
                {/* Titre de la formation */}
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
                      Modules de la formation
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
                  <h3 className="text-lg font-medium mb-1">Sélectionnez une formation</h3>
                  <p className="text-sm">Choisissez une formation dans la liste pour la modifier</p>
                </div>
              </Card>
            )}
          </div>
        </div>
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
    </div>
  );
};

export default AdminDashboard;
