import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const FooterSection = () => {
  return (
    <footer className="py-8 md:py-12 bg-foreground">
      <div className="container">
        <div className="flex flex-col items-center gap-6">
          <Logo variant="light" />
          
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link 
              to="/equipe" 
              className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors"
            >
              Notre équipe
            </Link>
            <Link 
              to="/questionnaire" 
              className="text-primary-foreground/70 hover:text-primary-foreground text-sm font-medium transition-colors"
            >
              Questionnaire
            </Link>
          </nav>
          
          <p className="text-primary-foreground/60 text-sm text-center">
            © 2024 NousProprio. Conseils indépendants pour investisseurs ambitieux.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
