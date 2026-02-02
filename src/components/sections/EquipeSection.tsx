import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


const EquipeSection = () => {
  return (
    <section className="relative py-14 md:py-20 bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-glacier/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Une équipe qui a déjà{" "}
            <span className="text-primary">fait le chemin</span>
          </h2>
        </div>

        {/* Main card */}
        <div className="max-w-4xl mx-auto">
          <div className="p-6 md:p-10 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-glacier/30 transition-all duration-500 hover:shadow-[0_8px_30px_-10px_hsl(var(--glacier)/0.3)]">

            {/* Highlight message */}
            <div className="relative p-6 md:p-8 rounded-2xl bg-glacier/10 border border-glacier/20 mb-8">
              <div className="absolute -top-3 left-6 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                Le plus important
              </div>
              <p className="text-xl md:text-2xl font-bold text-foreground text-center pt-2">
                Chacun de nous a déjà investi dans l'immobilier.
              </p>
            </div>

            {/* Double expertise */}
            <div className="text-center mb-8">
              <p className="text-lg md:text-xl text-foreground mb-2">
                Nous t'accompagnons avec une double expertise :
              </p>
              <p className="text-xl md:text-2xl font-bold">
                <span className="text-[hsl(var(--np-blue))]">terrain</span>
                <span className="text-muted-foreground mx-2">et</span>
                <span className="text-glacier-foreground bg-glacier/30 px-2 py-1 rounded-lg">bancaire</span>
              </p>
            </div>

          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/equipe">
            <Button 
              variant="outline" 
              size="xl"
              className="group"
            >
              Découvrir l'équipe
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EquipeSection;
