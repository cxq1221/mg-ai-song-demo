import { cn } from "@/lib/utils";

interface WaveAnimationProps {
  className?: string;
  bars?: number;
  active?: boolean;
}

export function WaveAnimation({ className, bars = 5, active = true }: WaveAnimationProps) {
  return (
    <div className={cn("flex items-end justify-center gap-1 h-8", className)}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-1 rounded-full bg-gradient-to-t from-primary to-secondary transition-all duration-300",
            active ? "animate-wave" : "h-1"
          )}
          style={{
            height: active ? `${Math.random() * 100}%` : "4px",
            animationDelay: `${i * 0.15}s`,
            minHeight: "4px",
          }}
        />
      ))}
    </div>
  );
}
