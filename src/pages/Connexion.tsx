import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { ArrowLeft } from "lucide-react";

const Connexion = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - no action
  };

  return (
    <div className="min-h-screen bg-hero relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-foreground rounded-full blur-3xl opacity-20" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 md:p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <Logo variant="light" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-md animate-fade-up">
          {/* Card */}
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-card border border-border/50 p-6 md:p-8 space-y-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                {isLogin ? "S'identifier" : "Créez votre compte"}
              </h1>
              <p className="text-muted-foreground">
                pour continuer vers NousProprio
              </p>
            </div>

            {/* Google Button */}
            <Button
              variant="outline"
              className="w-full h-12 gap-3 text-foreground border-border hover:bg-muted/50 transition-all duration-300"
              onClick={() => {}}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuer avec Google
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground">ou</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Adresse e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-background/50 border-border focus:border-primary transition-colors"
                />
              </div>

              {!isLogin && (
                <div className="space-y-2 animate-fade-up">
                  <Label htmlFor="password" className="text-foreground">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-background/50 border-border focus:border-primary transition-colors"
                  />
                </div>
              )}

              <Button type="submit" className="w-full h-12 shadow-button hover:shadow-glow transition-all duration-300" variant="default">
                Continuer
              </Button>
            </form>

            {/* Toggle Link */}
            <div className="text-center text-sm pt-2">
              <span className="text-muted-foreground">
                {isLogin ? "Vous n'avez pas encore de compte ?" : "Vous avez déjà un compte ?"}
              </span>{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-semibold hover:underline transition-colors"
              >
                {isLogin ? "S'inscrire" : "S'identifier"}
              </button>
            </div>
          </div>

          {/* Trust indicator */}
          <div className="mt-6 text-center">
            <p className="text-primary-foreground/60 text-sm">
              🔒 Connexion sécurisée • Vos données sont protégées
            </p>
          </div>
        </div>
      </main>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </div>
  );
};

export default Connexion;
