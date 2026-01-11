import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import logoWhite from "@/assets/NousProprio-Blanc.png";
import logoDark from "@/assets/Logo_Nousproprio.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
}

const Logo = ({ className, variant = "dark", size = "sm" }: LogoProps) => {
  const navigate = useNavigate();
  const logoSrc = variant === "light" ? logoWhite : logoDark;
  
  const sizeClasses = {
    sm: "h-6 md:h-8",
    md: "h-8 md:h-10",
    lg: "h-10 md:h-12",
    xl: "h-12 md:h-14",
    xxl: "h-14 md:h-16"
  };
  
  return (
    <button
      onClick={() => navigate("/")}
      className={cn("cursor-pointer hover:opacity-80 transition-opacity", className)}
    >
      <img src={logoSrc} alt="NousProprio" className={sizeClasses[size]} />
    </button>
  );
};

export default Logo;
