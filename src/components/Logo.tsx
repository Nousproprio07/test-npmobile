import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const Logo = ({ className, variant = "dark" }: LogoProps) => {
  const textColor = variant === "light" ? "text-primary-foreground" : "text-primary";
  
  return (
    <span className={cn("font-display font-bold text-2xl tracking-tight", textColor, className)}>
      NousProprio<span className="text-accent">.</span>
    </span>
  );
};

export default Logo;
