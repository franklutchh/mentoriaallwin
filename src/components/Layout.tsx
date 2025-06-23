
import React from 'react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { ThemeToggle } from './ui/theme-toggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 bg-background/80 backdrop-blur-xl px-6">
            <SidebarTrigger className="-ml-1 hover:bg-sidebar-accent hover:scale-105 transition-all duration-200 rounded-lg p-2" />
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-medium flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 lg:p-8 bg-background transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
