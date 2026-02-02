import { Link } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import Logo from "@/components/Logo";
import FooterSection from "@/components/sections/FooterSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    category: "Général",
    questions: [
      {
        question: "Qu'est-ce que NousProprio ?",
        answer: "NousProprio est un service d'accompagnement personnalisé pour les primo-accédants et investisseurs immobiliers. Nous t'aidons à naviguer dans ton projet immobilier avec des conseils indépendants et sur-mesure."
      },
      {
        question: "À qui s'adresse NousProprio ?",
        answer: "NousProprio s'adresse à toute personne souhaitant acheter sa résidence principale ou réaliser un investissement locatif, que tu sois débutant ou que tu aies déjà de l'expérience dans l'immobilier."
      },
      {
        question: "Comment fonctionne l'accompagnement ?",
        answer: "Après avoir rempli notre questionnaire, tu reçois une recommandation personnalisée. Ensuite, tu bénéficies d'un accompagnement sur-mesure avec des modules adaptés à ton projet, des sessions de coaching et un suivi continu."
      }
    ]
  },
  {
    category: "Accompagnement NousProprio",
    questions: [
      {
        question: "Combien de temps ai-je accès à ta feuille de route ?",
        answer: "Tu as un accès illimité à vie à tous les modules et mises à jour. Une fois inscrit, tu fais partie de la communauté NousProprio pour toujours."
      },
      {
        question: "Les lives sont-ils enregistrés ?",
        answer: "Oui, tous les lives hebdomadaires sont enregistrés et disponibles en replay dans ton espace membre. Tu ne rates jamais rien."
      },
      {
        question: "Puis-je poser mes questions personnelles ?",
        answer: "Absolument ! Les lives privés sont faits pour ça. Tu peux aussi nous contacter directement via ton espace membre pour des questions spécifiques."
      },
      {
        question: "Est-ce adapté à ta situation ?",
        answer: "Notre questionnaire a analysé ton profil. L'accompagnement recommandé est spécifiquement conçu pour ta situation actuelle et tes objectifs."
      },
      {
        question: "Comment fonctionne l'accès aux contenus ?",
        answer: "Le contenu est régulièrement mis à jour. Dès ton achat, tu accèdes immédiatement à l'ensemble des modules et replays. C'est un accès instantané et illimité à vie."
      },
      {
        question: "Recevez-vous des commissions des banques ?",
        answer: "Non, jamais. Notre indépendance totale est notre force. Nous ne recevons aucune commission, ce qui garantit des conseils 100% dans ton intérêt."
      }
    ]
  },
  {
    category: "Prix & Paiement",
    questions: [
      {
        question: "Comment sont fixés les prix ?",
        answer: "Nos prix sont transparents et adaptés à chaque formule d'accompagnement. Tu peux consulter les détails après avoir complété le questionnaire pour recevoir une offre personnalisée."
      },
      {
        question: "Quels sont les moyens de paiement acceptés ?",
        answer: "Nous acceptons les paiements par carte bancaire et virement. Des facilités de paiement peuvent être proposées selon les formules."
      },
      {
        question: "Y a-t-il un engagement ?",
        answer: "Tu peux commencer par un appel découverte gratuit pour voir si notre accompagnement correspond à tes besoins. Aucun engagement avant de te décider."
      }
    ]
  },
  {
    category: "Rendez-vous",
    questions: [
      {
        question: "Comment réserver un appel ?",
        answer: "Tu peux réserver un appel directement depuis notre site en cliquant sur 'Réserver un appel'. Choisis le créneau qui te convient et nous te contacterons."
      },
      {
        question: "Les appels sont-ils gratuits ?",
        answer: "Le premier appel découverte est gratuit et sans engagement. C'est l'occasion de discuter de ton projet et de voir comment nous pouvons t'aider."
      },
      {
        question: "Puis-je annuler ou reporter un rendez-vous ?",
        answer: "Oui, tu peux modifier ou annuler ton rendez-vous jusqu'à 24h avant l'heure prévue via le lien reçu par email."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Retour</span>
            </Link>
            <Logo />
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/10 mb-6">
              <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Questions fréquentes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Retrouve ici les réponses aux questions les plus courantes sur NousProprio et notre accompagnement.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16 flex-grow">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 md:h-8 bg-primary rounded-full" />
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {category.questions.map((item, questionIndex) => (
                    <AccordionItem 
                      key={questionIndex} 
                      value={`${categoryIndex}-${questionIndex}`}
                      className="bg-card border border-border/50 rounded-xl px-4 md:px-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <AccordionTrigger className="text-left text-base md:text-lg font-medium text-foreground hover:no-underline py-4 md:py-5">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm md:text-base pb-4 md:pb-5 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="max-w-3xl mx-auto mt-12 md:mt-16">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 md:p-10 text-center border border-primary/20">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                Tu n'as pas trouvé ta réponse ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Notre équipe est là pour t'aider. Réserve un appel gratuit pour discuter de ton projet.
              </p>
              <Link
                to="/reserver-appel"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              >
                Réserver un appel gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default FAQ;
