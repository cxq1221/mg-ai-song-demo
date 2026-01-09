import { ReactNode } from "react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  hideNav?: boolean;
  headerRightAction?: ReactNode;
}

export function PageLayout({ children, title, hideNav = false, headerRightAction }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title={title} rightAction={headerRightAction} />
      <main className="flex-1 pb-20 overflow-y-auto scrollbar-hide">
        {children}
      </main>
      {!hideNav && <MobileNav />}
    </div>
  );
}
