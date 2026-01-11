import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
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
  Home,
  Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

// Structure des phases de formation avec les vrais modules
interface PhaseType {
  id: number;
  title: string;
  subtitle: string;
  modules: ModuleType[];
}

// Module de financement conditionnel selon la situation professionnelle
const getFinancementModuleTitle = (situationPro: string): string => {
  switch (situationPro) {
    case "Étudiant(e)":
      return "Financer son premier bien locatif quand on est étudiant";
    case "Indépendant(e) / Freelance":
      return "Financer son premier bien locatif quand on est indépendant";
    case "Salarié(e)":
    default:
      return "Financer son premier bien locatif quand on est salarié";
  }
};

const getFinancementModuleDescription = (situationPro: string): string => {
  switch (situationPro) {
    case "Étudiant(e)":
      return "Stratégies de financement adaptées aux étudiants.";
    case "Indépendant(e) / Freelance":
      return "Stratégies de financement adaptées aux indépendants et freelances.";
    case "Salarié(e)":
    default:
      return "Stratégies de financement adaptées aux salariés.";
  }
};

const getFormationPhases = (situationPro: string): Record<string, PhaseType[]> => ({
  "Patrimoine Actif": [
    {
      id: 1,
      title: "Préparation & Fondations",
      subtitle: "Avant le financement",
      modules: [
        { id: 1, title: "On déconstruit les idées reçues sur l'immobilier", duration: "20 min", completed: true, description: "Démystifie les croyances limitantes et découvre la réalité de l'investissement immobilier.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Les mythes courants", "La réalité du marché", "Ce qui fonctionne vraiment"] },
        { id: 2, title: "Rechercher un bien pour se projeter", duration: "25 min", completed: false, current: true, description: "Apprends à chercher efficacement et à te projeter dans un investissement.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Où chercher", "Les critères essentiels", "Se projeter dans l'investissement"] },
        { id: 3, title: "Comprendre ce qu'on achète vraiment", duration: "30 min", completed: false, description: "Analyse approfondie de ce que représente un achat immobilier.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Au-delà du bien", "Les aspects juridiques", "Les implications à long terme"] },
        { id: 4, title: "Savoir ce qu'on regarde en visite d'appartement", duration: "35 min", completed: false, description: "Checklist complète pour ne rien manquer lors d'une visite d'appartement.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Les points clés", "Les signaux d'alerte", "Les questions à poser"] },
        { id: 5, title: "Savoir ce qu'on regarde en visite de maison", duration: "35 min", completed: false, description: "Checklist complète pour ne rien manquer lors d'une visite de maison.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Structure et gros œuvre", "Terrain et extérieurs", "Les diagnostics essentiels"] },
        { id: 6, title: "Acheter un bien locatif dans le neuf", duration: "25 min", completed: false, description: "Avantages et inconvénients de l'achat dans le neuf pour du locatif.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Le neuf vs l'ancien", "Les garanties", "La fiscalité du neuf"] },
        { id: 7, title: "Faire une offre d'achat sans se tromper", duration: "30 min", completed: false, description: "Rédige une offre d'achat percutante et négocie efficacement.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Préparer son offre", "Les clauses importantes", "La négociation"] },
        { id: 8, title: "Lire une annonce et comprendre le marché", duration: "20 min", completed: false, description: "Décrypte les annonces immobilières et analyse le marché local.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Décoder les annonces", "Analyser les prix", "Comprendre le marché local"] },
        { id: 9, title: "Comparateur d'annonces immobilières", duration: "15 min", completed: false, description: "Utilise notre outil pour comparer efficacement les annonces.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Présentation de l'outil", "Comparer les biens", "Prendre une décision"] },
        { id: 10, title: "Comprendre la fiscalité de son investissement", duration: "40 min", completed: false, description: "Maîtrise les bases de la fiscalité immobilière.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Les régimes fiscaux", "LMNP et LMP", "Optimiser sa fiscalité"] },
      ]
    },
    {
      id: 2,
      title: "Maîtrise du Financement & Concrétisation",
      subtitle: "Obtenir et sécuriser ton prêt",
      modules: [
        { id: 11, title: getFinancementModuleTitle(situationPro), duration: "35 min", completed: false, description: getFinancementModuleDescription(situationPro), videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Capacité d'emprunt", "Les banques qui financent", "Monter son dossier"] },
        { id: 12, title: "Comprendre tous les frais de son achat", duration: "25 min", completed: false, description: "Panorama complet de tous les frais liés à l'achat.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Frais de notaire", "Frais bancaires", "Frais annexes"] },
        { id: 13, title: "Emprunter quand on est en CDD", duration: "30 min", completed: false, description: "Solutions pour financer son projet en CDD.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Les critères bancaires", "Renforcer son dossier", "Les alternatives"] },
        { id: 14, title: "Gérer son compte bancaire pour son projet", duration: "20 min", completed: false, description: "Optimise la gestion de tes comptes pour ton projet immobilier.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Assainir ses comptes", "Épargner efficacement", "Les bons réflexes"] },
        { id: 15, title: "Préparer son rendez-vous bancaire", duration: "30 min", completed: false, description: "Tout pour réussir ton rendez-vous avec la banque.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Documents à préparer", "Les bonnes réponses", "Négocier les conditions"] },
        { id: 16, title: "Comprendre sa fiscalité avec des cas concrets", duration: "40 min", completed: false, description: "Cas pratiques pour maîtriser ta fiscalité.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Cas pratique #1", "Cas pratique #2", "Cas pratique #3"] },
        { id: 17, title: "Réduire ses impôts en toute légalité", duration: "35 min", completed: false, description: "Stratégies légales pour optimiser tes impôts.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Déficit foncier", "Amortissements", "Dispositifs fiscaux"] },
        { id: 18, title: "Préparer la signature chez le notaire", duration: "25 min", completed: false, description: "Tout ce qu'il faut savoir avant la signature.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Documents à vérifier", "Le jour J", "Après la signature"] },
      ]
    },
    {
      id: 3,
      title: "Après l'Achat & Optimisation",
      subtitle: "Gérer et valoriser ton bien",
      modules: [
        { id: 19, title: "La check-list du propriétaire bailleur", duration: "20 min", completed: false, description: "Tout ce que tu dois faire en tant que propriétaire.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Obligations légales", "Assurances", "Gestion courante"] },
        { id: 20, title: "Rénover un bien locatif sans mettre en danger sa rentabilité", duration: "35 min", completed: false, description: "Rénove intelligemment pour maximiser ton ROI.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Travaux essentiels", "Budget travaux", "Éviter les pièges"] },
        { id: 21, title: "Comprendre et améliorer la rentabilité de son bien", duration: "30 min", completed: false, description: "Analyse et optimise la rentabilité de ton investissement.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Calculer sa rentabilité", "Leviers d'amélioration", "Suivi dans le temps"] },
        { id: 22, title: "Choisir ses locataires avec méthode", duration: "25 min", completed: false, description: "Sélectionne les meilleurs locataires pour ton bien.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Les critères de sélection", "Vérifier un dossier", "Les garanties"] },
        { id: 23, title: "Choisir entre location courte et longue durée", duration: "30 min", completed: false, description: "Compare les deux modes de location pour ton bien.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Avantages et inconvénients", "Rentabilité comparée", "Aspects pratiques"] },
        { id: 24, title: "Réussir sa location saisonnière", duration: "35 min", completed: false, description: "Les clés pour une location saisonnière rentable.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Mise en place", "Optimiser son annonce", "Gérer les réservations"] },
        { id: 25, title: "Comprendre le permis de louer", duration: "20 min", completed: false, description: "Tout sur le permis de louer et ses implications.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Zones concernées", "Démarches", "Sanctions"] },
        { id: 26, title: "Déclarer ses revenus locatifs sans se tromper", duration: "30 min", completed: false, description: "Guide complet pour déclarer tes revenus locatifs.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Formulaires à remplir", "Régimes fiscaux", "Erreurs à éviter"] },
        { id: 27, title: "Préparer la revente de son bien", duration: "25 min", completed: false, description: "Optimise la revente de ton bien immobilier.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Quand revendre", "Valoriser son bien", "Fiscalité de la plus-value"] },
        { id: 28, title: "Anticiper la succession de son bien immobilier", duration: "30 min", completed: false, description: "Prépare la transmission de ton patrimoine.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Droits de succession", "SCI familiale", "Donation"] },
        { id: 29, title: "Les projets de demain dans l'immobilier", duration: "20 min", completed: false, description: "Les tendances et opportunités futures.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Tendances du marché", "Nouvelles opportunités", "Se préparer pour demain"] },
      ]
    }
  ],
  "Résidence Essentiel": [
    {
      id: 1,
      title: "Préparation & Fondations",
      subtitle: "Avant le financement",
      modules: [
        { id: 1, title: "On déconstruit les idées reçues sur l'immobilier", duration: "20 min", completed: true, description: "Démystifie les croyances limitantes et découvre la réalité de l'achat immobilier.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Les mythes courants", "La réalité du marché", "Ce qui fonctionne vraiment"] },
        { id: 2, title: "Rechercher un bien pour se projeter", duration: "25 min", completed: false, current: true, description: "Apprends à chercher efficacement et à te projeter dans ton futur chez-toi.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Où chercher", "Les critères essentiels", "Se projeter dans l'achat"] },
        { id: 3, title: "Comprendre ce qu'on achète vraiment", duration: "30 min", completed: false, description: "Analyse approfondie de ce que représente un achat immobilier.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Au-delà du bien", "Les aspects juridiques", "Les implications à long terme"] },
        { id: 4, title: "Savoir ce qu'on regarde en visite d'appartement", duration: "35 min", completed: false, description: "Checklist complète pour ne rien manquer lors d'une visite d'appartement.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Les points clés", "Les signaux d'alerte", "Les questions à poser"] },
        { id: 5, title: "Savoir ce qu'on regarde en visite de maison", duration: "35 min", completed: false, description: "Checklist complète pour ne rien manquer lors d'une visite de maison.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Structure et gros œuvre", "Terrain et extérieurs", "Les diagnostics essentiels"] },
        { id: 6, title: "Acheter un bien locatif dans le neuf", duration: "25 min", completed: false, description: "Avantages et inconvénients de l'achat dans le neuf.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Le neuf vs l'ancien", "Les garanties", "La fiscalité du neuf"] },
        { id: 7, title: "Faire une offre d'achat sans se tromper", duration: "30 min", completed: false, description: "Rédige une offre d'achat percutante et négocie efficacement.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Préparer son offre", "Les clauses importantes", "La négociation"] },
        { id: 8, title: "Lire une annonce et comprendre le marché", duration: "20 min", completed: false, description: "Décrypte les annonces immobilières et analyse le marché local.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Décoder les annonces", "Analyser les prix", "Comprendre le marché local"] },
        { id: 9, title: "Comparateur d'annonces immobilières", duration: "15 min", completed: false, description: "Utilise notre outil pour comparer efficacement les annonces.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Présentation de l'outil", "Comparer les biens", "Prendre une décision"] },
        { id: 10, title: "Comprendre la fiscalité de son investissement", duration: "40 min", completed: false, description: "Maîtrise les bases de la fiscalité immobilière.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Les régimes fiscaux", "Avantages fiscaux", "Optimiser sa fiscalité"] },
      ]
    },
    {
      id: 2,
      title: "Maîtrise du Financement & Concrétisation",
      subtitle: "Obtenir et sécuriser ton prêt",
      modules: [
        { id: 11, title: getFinancementModuleTitle(situationPro), duration: "35 min", completed: false, description: getFinancementModuleDescription(situationPro), videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Capacité d'emprunt", "Les banques qui financent", "Monter son dossier"] },
        { id: 12, title: "Comprendre tous les frais de son achat", duration: "25 min", completed: false, description: "Panorama complet de tous les frais liés à l'achat.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Frais de notaire", "Frais bancaires", "Frais annexes"] },
        { id: 13, title: "Emprunter quand on est en CDD", duration: "30 min", completed: false, description: "Solutions pour financer son projet en CDD.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Les critères bancaires", "Renforcer son dossier", "Les alternatives"] },
        { id: 14, title: "Gérer son compte bancaire pour son projet", duration: "20 min", completed: false, description: "Optimise la gestion de tes comptes pour ton projet immobilier.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Assainir ses comptes", "Épargner efficacement", "Les bons réflexes"] },
        { id: 15, title: "Préparer son rendez-vous bancaire", duration: "30 min", completed: false, description: "Tout pour réussir ton rendez-vous avec la banque.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Documents à préparer", "Les bonnes réponses", "Négocier les conditions"] },
        { id: 16, title: "Comprendre sa fiscalité avec des cas concrets", duration: "40 min", completed: false, description: "Cas pratiques pour maîtriser ta fiscalité.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Cas pratique #1", "Cas pratique #2", "Cas pratique #3"] },
        { id: 17, title: "Réduire ses impôts en toute légalité", duration: "35 min", completed: false, description: "Stratégies légales pour optimiser tes impôts.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Déficit foncier", "Amortissements", "Dispositifs fiscaux"] },
        { id: 18, title: "Préparer la signature chez le notaire", duration: "25 min", completed: false, description: "Tout ce qu'il faut savoir avant la signature.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Documents à vérifier", "Le jour J", "Après la signature"] },
      ]
    },
    {
      id: 3,
      title: "Après l'Achat & Optimisation",
      subtitle: "Gérer et valoriser ton bien",
      modules: [
        { id: 19, title: "La check-list du propriétaire bailleur", duration: "20 min", completed: false, description: "Tout ce que tu dois faire en tant que propriétaire.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Obligations légales", "Assurances", "Gestion courante"] },
        { id: 20, title: "Rénover un bien locatif sans mettre en danger sa rentabilité", duration: "35 min", completed: false, description: "Rénove intelligemment pour maximiser ton ROI.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Travaux essentiels", "Budget travaux", "Éviter les pièges"] },
        { id: 21, title: "Comprendre et améliorer la rentabilité de son bien", duration: "30 min", completed: false, description: "Analyse et optimise la rentabilité de ton investissement.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Calculer sa rentabilité", "Leviers d'amélioration", "Suivi dans le temps"] },
        { id: 22, title: "Choisir ses locataires avec méthode", duration: "25 min", completed: false, description: "Sélectionne les meilleurs locataires pour ton bien.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Les critères de sélection", "Vérifier un dossier", "Les garanties"] },
        { id: 23, title: "Choisir entre location courte et longue durée", duration: "30 min", completed: false, description: "Compare les deux modes de location pour ton bien.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Avantages et inconvénients", "Rentabilité comparée", "Aspects pratiques"] },
        { id: 24, title: "Réussir sa location saisonnière", duration: "35 min", completed: false, description: "Les clés pour une location saisonnière rentable.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Mise en place", "Optimiser son annonce", "Gérer les réservations"] },
        { id: 25, title: "Comprendre le permis de louer", duration: "20 min", completed: false, description: "Tout sur le permis de louer et ses implications.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Zones concernées", "Démarches", "Sanctions"] },
        { id: 26, title: "Déclarer ses revenus locatifs sans se tromper", duration: "30 min", completed: false, description: "Guide complet pour déclarer tes revenus locatifs.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Formulaires à remplir", "Régimes fiscaux", "Erreurs à éviter"] },
        { id: 27, title: "Préparer la revente de son bien", duration: "25 min", completed: false, description: "Optimise la revente de ton bien immobilier.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Quand revendre", "Valoriser son bien", "Fiscalité de la plus-value"] },
        { id: 28, title: "Anticiper la succession de son bien immobilier", duration: "30 min", completed: false, description: "Prépare la transmission de ton patrimoine.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Droits de succession", "SCI familiale", "Donation"] },
        { id: 29, title: "Les projets de demain dans l'immobilier", duration: "20 min", completed: false, description: "Les tendances et opportunités futures.", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", chapitres: ["Tendances du marché", "Nouvelles opportunités", "Se préparer pour demain"] },
      ]
    }
  ]
});

// Mock data pour "Ton point de départ" basé sur les réponses utilisateur
const pointDeDepartData = {
  situation_actuelle: "J'ai repéré quelques annonces mais je ne sais pas par où commencer",
  situationReading: "Tu explores activement le marché mais manques de méthodologie",
  benefice: ["Développer un patrimoine sur le long terme", "Investir pour générer un patrimoine et des revenus"],
  ressenti: ["De l'excitation", "Du doute"],
  frein: ["Je ne sais pas par où commencer", "Je manque de temps pour m'en occuper"],
  horizon: "Dans les 6 prochains mois",
  situation_pro: "Salarié(e)",
  logement_actuel: "Locataire",
  logementReading: "Charges locatives actuelles convertibles en mensualités"
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
  { id: "formation", label: "Ma feuille de route", shortLabel: "Feuille de route" },
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
  
  const [activeTab, setActiveTab] = useState<"formation" | "faq">("formation");
  const [selectedModule, setSelectedModule] = useState<ModuleType | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasInteractedWithDropdown, setHasInteractedWithDropdown] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [showAvailableCourses, setShowAvailableCourses] = useState(false);
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
  
  // Phases de la direction principale
  const formationPhases = getFormationPhases(pointDeDepartData.situation_pro);
  const phases = formationPhases[mockUser.formation] || [];
  
  // Tous les modules à plat pour retrouver le module en cours
  const allModules = phases.flatMap(phase => phase.modules);
  const currentModuleData = allModules.find(m => m.current);
  
  // Détermine quel bloc contient le module en cours
  const getInitialOpenBlocs = () => {
    for (let i = 0; i < phases.length; i++) {
      if (phases[i].modules.some(m => m.current)) {
        return { 
          bloc1: i === 0, 
          bloc2: i === 1, 
          bloc3: i === 2 
        };
      }
    }
    return { bloc1: true, bloc2: false, bloc3: false };
  };
  
  const [openBlocs, setOpenBlocs] = useState<{ bloc1: boolean; bloc2: boolean; bloc3: boolean }>(getInitialOpenBlocs);

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
      return allModules;
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
      <div className="min-h-screen bg-white">
        {/* Header Premium - épuré */}
        <header className="bg-white border-b border-primary/10 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <Logo size="xxxl" />
              
              <div className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{mockUser.firstName} {mockUser.lastName}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout} 
                  className="text-muted-foreground hover:text-primary hover:bg-primary/5"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
              
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="hover:bg-primary/5">
                    <Menu className="w-6 h-6 text-primary" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-white">
                  <SheetHeader className="text-left pb-6 border-b border-primary/10">
                    <SheetTitle className="text-lg font-display text-primary">Mon compte</SheetTitle>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
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
                      className="w-full justify-start text-muted-foreground border-primary/20 hover:bg-primary/5 hover:text-primary" 
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
          </div>
        </header>

        {/* Contenu principal - Fond blanc, centré */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Welcome - Plus espacé et premium */}
          <div className="mb-10 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary mb-2">
              Bonjour {mockUser.firstName} 👋
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Ton espace adapté à ton objectif
            </p>
            
            {/* Notification FAQ - Mobile optimisé */}
            <div className="mt-4 bg-primary rounded-2xl p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Bell className="w-5 h-5 text-white flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-xs sm:text-sm text-white/90">Prochaine session FAQ : </span>
                  <span className="text-xs sm:text-sm font-bold text-white block sm:inline">{prochaineFAQData.date} à {prochaineFAQData.heure}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deux grandes cartes empilées */}
          <div className="space-y-4 sm:space-y-6">
            
            {/* CARTE 1: Ma Feuille de Route - Mobile optimisé */}
            <div 
              className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg"
              onClick={() => setCurrentView("direction")}
            >
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 md:gap-6">
                  {/* Icône + Titre sur mobile */}
                  <div className="flex items-center gap-3 sm:block">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    {/* Titre visible uniquement sur mobile */}
                    <div className="sm:hidden flex-1">
                      <h2 className="text-lg font-display font-bold text-primary">
                        Ma Feuille de Route
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {mockUser.formation}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 sm:hidden text-primary/40 group-hover:text-primary flex-shrink-0" />
                  </div>
                  
                  {/* Contenu */}
                  <div className="flex-1 min-w-0">
                    {/* Titre desktop uniquement */}
                    <div className="hidden sm:flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-display font-bold text-primary mb-1">
                          Ma Feuille de Route
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {mockUser.formation}
                        </p>
                      </div>
                      <ChevronRight className="w-6 h-6 text-primary/40 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                    
                    {/* Progression - Mobile optimisé */}
                    <div className="space-y-2 sm:space-y-3 sm:mt-4">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground font-medium">Progression globale</span>
                        <span className="font-bold text-primary text-base sm:text-lg">{mockUser.progress}%</span>
                      </div>
                      <div className="h-2 sm:h-3 bg-green-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                          style={{ width: `${mockUser.progress}%` }}
                        />
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground flex items-start sm:items-center gap-2">
                        <Play className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                        <span className="line-clamp-2 sm:line-clamp-1">Module en cours : <span className="font-medium text-foreground">{currentModuleData?.title}</span></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARTE 2: Mes Cours */}
            <div className="bg-white rounded-3xl border-2 border-primary/20 overflow-hidden shadow-sm">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-primary">
                    Mes Cours
                  </h2>
                </div>
                
                {/* Cours bonus achetés */}
                {purchasedBonusCourses.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Cours débloqués
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {purchasedBonusCourses.map((cours) => {
                        const courseModules = cours.modules || [];
                        const completedModules = courseModules.filter(m => m.completed).length;
                        const courseProgress = courseModules.length > 0 ? Math.round((completedModules / courseModules.length) * 100) : 0;
                        
                        return (
                          <div 
                            key={cours.id}
                            className="group/card cursor-pointer bg-primary/5 hover:bg-primary/10 rounded-2xl p-4 border border-primary/10 hover:border-primary/30 transition-all"
                            onClick={() => {
                              setSelectedBonusCourse(cours);
                              setCurrentView("bonus-course");
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white border border-primary/20 flex items-center justify-center flex-shrink-0">
                                <Play className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{cours.title}</h4>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                                  <span>{courseProgress}% complété</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {cours.duration}
                                  </span>
                                </div>
                                <div className="h-1.5 bg-white rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${courseProgress}%` }}
                                  />
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-primary/40 group-hover/card:text-primary transition-colors flex-shrink-0" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* CTA pour découvrir les cours disponibles */}
                {coursSupplementaires.filter(c => !c.purchased).length > 0 && !showAvailableCourses && (
                  <button
                    onClick={() => setShowAvailableCourses(true)}
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 rounded-2xl border border-dashed border-primary/30 hover:border-primary/50 transition-all flex items-center justify-center gap-3 group"
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span className="font-medium text-primary">Découvrir nos cours bonus</span>
                    <ChevronRight className="w-5 h-5 text-primary/50 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                
                {/* Cours disponibles à l'achat - affichés après clic */}
                {coursSupplementaires.filter(c => !c.purchased).length > 0 && showAvailableCourses && (
                  <div className="animate-fade-up">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Cours disponibles
                      </h3>
                      <button 
                        onClick={() => setShowAvailableCourses(false)}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        Masquer
                      </button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {coursSupplementaires.filter(c => !c.purchased).map((cours) => (
                        <div 
                          key={cours.id} 
                          className="bg-muted/30 rounded-2xl p-4 border border-border hover:border-primary/20 transition-all"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                              <Lock className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <span className="text-lg font-bold text-primary">{cours.price}€</span>
                          </div>
                          <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{cours.title}</h4>
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{cours.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {cours.duration}
                            </span>
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white text-xs h-8">
                              Débloquer
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Message si aucun cours */}
                {purchasedBonusCourses.length === 0 && coursSupplementaires.filter(c => !c.purchased).length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    Aucun cours bonus disponible pour le moment.
                  </p>
                )}
              </div>
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
  const displayModules = isDirectionView ? allModules : (selectedBonusCourse?.modules || []);
  const displayTitle = isDirectionView ? mockUser.formation : (selectedBonusCourse?.title || "");
  const completedCount = displayModules.filter(m => m.completed).length;
  const displayProgress = displayModules.length > 0 ? Math.round((completedCount / displayModules.length) * 100) : 0;
  const displayCurrentModule = displayModules.find(m => m.current);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Premium - style cohérent avec home */}
      <header className="bg-white border-b border-primary/10 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleBackFromCourseView}
                className="text-primary hover:bg-primary/10 -ml-1 sm:-ml-2 w-8 h-8 sm:w-10 sm:h-10"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Logo size="xl" className="sm:hidden" />
              <Logo size="xxxl" className="hidden sm:block" />
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium">{mockUser.firstName} {mockUser.lastName}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout} 
                className="text-muted-foreground hover:text-primary hover:bg-primary/5"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-primary/5">
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-80 bg-white">
                <SheetHeader className="text-left pb-4 sm:pb-6 border-b border-primary/10">
                  <SheetTitle className="text-base sm:text-lg font-display text-primary">Mon compte</SheetTitle>
                </SheetHeader>
                <div className="py-4 sm:py-6 space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 p-3 sm:p-4 bg-primary/5 rounded-xl sm:rounded-2xl border border-primary/10">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm sm:text-base text-foreground">{mockUser.firstName} {mockUser.lastName}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{mockUser.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-muted-foreground border-primary/20 hover:bg-primary/5 text-sm sm:text-base" 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleBackFromCourseView();
                    }}
                  >
                    <Home className="w-4 h-4 mr-3" />
                    Retour à l'accueil
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-muted-foreground border-primary/20 hover:bg-primary/5 text-sm sm:text-base" 
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
        </div>
      </header>

      {/* Contenu principal - Fond blanc, centré */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        {/* Welcome Section - Mobile optimisé */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-1 sm:mb-2">
            {displayTitle}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            {isDirectionView ? "Ta feuille de route personnalisée" : "Cours bonus"}
          </p>
          
          {/* Notification FAQ - Mobile optimisé */}
          {isDirectionView && (
            <div className="mt-3 sm:mt-4 bg-primary rounded-xl sm:rounded-2xl p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-xs sm:text-sm text-white/90">Prochaine session FAQ : </span>
                  <span className="text-xs sm:text-sm font-bold text-white block sm:inline">{prochaineFAQData.date} à {prochaineFAQData.heure}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Progress Card - Mobile optimisé */}
        <div className="mb-6 sm:mb-8 bg-white rounded-2xl sm:rounded-3xl border-2 border-primary/20 p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 md:gap-6">
            {/* Icône + titre sur mobile */}
            <div className="flex items-center gap-3 sm:block">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>
              {/* Titre visible uniquement sur mobile */}
              <div className="sm:hidden flex-1">
                <h2 className="text-lg font-display font-bold text-primary">
                  Progression
                </h2>
                <p className="text-xs text-muted-foreground">
                  Module {completedCount + 1}/{displayModules.length}
                </p>
              </div>
              <span className="sm:hidden text-xl font-bold text-primary">{displayProgress}%</span>
            </div>
            
            <div className="flex-1 min-w-0">
              {/* Titre desktop uniquement */}
              <div className="hidden sm:flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-primary">
                    Progression
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Module {completedCount + 1}/{displayModules.length}
                  </p>
                </div>
                <span className="text-2xl sm:text-3xl font-bold text-primary">{displayProgress}%</span>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="h-2 sm:h-3 bg-green-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                    style={{ width: `${displayProgress}%` }}
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                  <p className="text-xs sm:text-sm text-muted-foreground flex items-start sm:items-center gap-2">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="line-clamp-2 sm:line-clamp-1">En cours : <span className="font-medium text-foreground">{displayCurrentModule?.title || displayModules[0]?.title}</span></span>
                  </p>
                  <Button 
                    size="default"
                    className="bg-primary hover:bg-primary/90 text-white flex-shrink-0 w-full sm:w-auto"
                    onClick={() => displayCurrentModule && setSelectedModule(displayCurrentModule)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    <span>Continuer</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Mobile optimisé */}
        {isDirectionView && (
          <div className="mb-6 sm:mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-3 px-3 sm:mx-0 sm:px-0 scrollbar-hide">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                    activeTab === tab.id 
                      ? "bg-primary text-white" 
                      : "bg-primary/5 text-primary hover:bg-primary/10 border border-primary/20"
                  }`}
                >
                  {tab.label}
                </button>
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
          <div className="space-y-8">
            {/* Section Modules */}
            <div>
              <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-4">
                Tes modules
              </h3>
              
              {/* Les 3 blocs principaux - dynamiques depuis les phases */}
              <div className="space-y-6">
                {phases.map((phase, phaseIndex) => {
                  const blocKey = `bloc${phaseIndex + 1}` as 'bloc1' | 'bloc2' | 'bloc3';
                  return (
                    <Collapsible 
                      key={phase.id}
                      open={openBlocs[blocKey]} 
                      onOpenChange={(open) => setOpenBlocs(prev => ({ ...prev, [blocKey]: open }))}
                    >
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {phaseIndex + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-display font-semibold text-foreground">{phase.title}</h4>
                              {phase.modules.every(m => m.completed) && (
                                <Badge className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-0 gap-1">
                                  <Award className="w-3 h-3" />
                                  Complété
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{phase.subtitle}</p>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openBlocs[blocKey] ? 'rotate-180' : ''}`} />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="ml-4 border-l-2 border-primary/20 pl-6 space-y-3 mt-3">
                          {phase.modules.map((module) => (
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
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </div>
            </div>

            {/* Section Bibliothèque d'outils */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-2">
                Ta bibliothèque d'outils
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Tous les outils et ressources de ta formation, accessibles rapidement.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
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
