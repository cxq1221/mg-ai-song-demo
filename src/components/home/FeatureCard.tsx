import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  path: string;
  gradient?: "primary" | "accent" | "secondary";
  delay?: number;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  path,
  gradient = "primary",
  delay = 0
}: FeatureCardProps) {
  const gradientClasses = {
    primary: "from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30",
    accent: "from-accent/20 to-[hsl(340,80%,55%)]/20 hover:from-accent/30 hover:to-[hsl(340,80%,55%)]/30",
    secondary: "from-secondary/20 to-primary/20 hover:from-secondary/30 hover:to-primary/30",
  };

  const iconGradientClasses = {
    primary: "from-primary to-secondary",
    accent: "from-accent to-[hsl(340,80%,55%)]",
    secondary: "from-secondary to-primary",
  };

  return (
    <Link 
      to={path}
      className={cn(
        "block p-4 rounded-2xl bg-gradient-to-br transition-all duration-300",
        "border border-white/5 hover:border-white/10",
        "hover:scale-[1.02] hover:shadow-card",
        "animate-fade-in",
        gradientClasses[gradient]
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3",
        iconGradientClasses[gradient]
      )}>
        <Icon className="w-6 h-6 text-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
    </Link>
  );
}
