import { Home, Mic, Music, Library, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "首页", path: "/" },
  { icon: Music, label: "AI音乐", path: "/create" },
  { icon: Mic, label: "声音克隆", path: "/voice-clone" },
  
  // { icon: Library, label: "模板库", path: "/templates" },
  // { icon: Volume2, label: "我的声音", path: "/my-voices" },
  // { icon: User, label: "我的音乐", path: "/works" },
];

// 导出导航路径列表，用于判断是否显示导航栏
export const navPaths = navItems.map(item => item.path);

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "relative p-1.5 rounded-xl transition-all duration-300",
                isActive && "bg-primary/20"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-all duration-300",
                  isActive && "drop-shadow-[0_0_8px_hsl(210,100%,60%,0.8)]"
                )} />
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-primary/10 animate-pulse" />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-all duration-300",
                isActive && "text-primary"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
