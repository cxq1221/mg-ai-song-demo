import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  path: string;
  variant?: "primary" | "accent";
}

export function QuickAction({ icon: Icon, label, path, variant = "primary" }: QuickActionProps) {
  return (
    <Link
      to={path}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300",
        "hover:scale-105 active:scale-95",
        variant === "primary" 
          ? "bg-primary/10 hover:bg-primary/20" 
          : "bg-accent/10 hover:bg-accent/20"
      )}
    >
      <div className={cn(
        "w-14 h-14 rounded-full flex items-center justify-center",
        variant === "primary"
          ? "bg-gradient-to-br from-primary to-secondary shadow-glow"
          : "bg-gradient-to-br from-accent to-[hsl(340,80%,55%)] shadow-glow-accent"
      )}>
        <Icon className="w-7 h-7 text-foreground" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </Link>
  );
}
