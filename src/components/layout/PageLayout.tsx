import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { MobileNav, navPaths } from "./MobileNav";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  hideNav?: boolean;
  headerRightAction?: ReactNode;
}

export function PageLayout({ children, title, hideNav, headerRightAction }: PageLayoutProps) {
  const location = useLocation();
  
  // 如果 hideNav 未指定，则根据当前路径自动判断
  // 如果当前路径不在导航列表中，则隐藏导航栏
  const shouldHideNav = hideNav !== undefined 
    ? hideNav 
    : !navPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title={title} rightAction={headerRightAction} />
      <main className={cn("flex-1 overflow-y-auto scrollbar-hide", !shouldHideNav && "pb-20")}>
        {children}
      </main>
      {!shouldHideNav && <MobileNav />}
    </div>
  );
}
