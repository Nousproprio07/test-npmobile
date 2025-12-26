import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const Logo = ({ className, variant = "dark" }: LogoProps) => {
  const navigate = useNavigate();
  const textColor = variant === "light" ? "text-primary-foreground" : "text-primary";
  
  return (
    <button
      onClick={() => navigate("/")}
      className={cn("font-display font-bold text-2xl tracking-tight cursor-pointer hover:opacity-80 transition-opacity", textColor, className)}
    >
      NousProprio<span className="text-accent">.</span>
    </button>
  );
};

export default Logo;
