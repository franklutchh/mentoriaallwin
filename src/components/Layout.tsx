
import React from 'react';
import { AppSidebar } from './AppSidebar';
import { ThemeToggle } from './ui/theme-toggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex w-full bg-background transition-colors duration-300">
      <AppSidebar />
      
      <div className="flex-1 transition-all duration-300">
        <header className="flex h-8 shrink-0 items-center gap-2 border-b border-border bg-background/95 backdrop-blur-sm px-2">
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-medium">U</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 bg-background transition-colors duration-300">
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
