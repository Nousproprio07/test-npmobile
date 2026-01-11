import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import logoWhite from "@/assets/NousProprio-Blanc.png";
import logoDark from "@/assets/Logo_Nousproprio.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const Logo = ({ className, variant = "dark" }: LogoProps) => {
  const navigate = useNavigate();
  const logoSrc = variant === "light" ? logoWhite : logoDark;
  
  return (
    <button
      onClick={() => navigate("/")}
      className={cn("cursor-pointer hover:opacity-80 transition-opacity", className)}
    >
      <img src={logoSrc} alt="NousProprio" className="h-6 md:h-8" />
    </button>
  );
};

export default Logo;
