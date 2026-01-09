import { ReactNode } from "react";
import { Music2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  rightAction?: ReactNode;
}

export function Header({ title = "AI音乐工坊", rightAction }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass safe-top">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Music2 className="w-6 h-6 text-primary" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
          </div>
          <h1 className="text-lg font-bold gradient-text">{title}</h1>
        </div>
        {rightAction || (
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="w-5 h-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
