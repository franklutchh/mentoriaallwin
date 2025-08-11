
import React from 'react';
import { AppSidebar } from './AppSidebar';
import { ThemeToggle } from './ui/theme-toggle';
import { SidebarProvider, SidebarTrigger, SidebarInset } from './ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border bg-background/95 backdrop-blur-sm px-2 md:px-4">
            <SidebarTrigger className="ml-1" />
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-medium">U</span>
              </div>
            </div>
          </header>

          <main className="flex-1 bg-background overflow-auto">
            <div className="w-full h-full">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
