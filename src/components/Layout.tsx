
import React from 'react';
import { AppSidebar } from './AppSidebar';
import { ThemeToggle } from './ui/theme-toggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
      <AppSidebar />
      
      {/* Conteúdo principal com margem esquerda para a sidebar */}
      <div className="flex-1 ml-10 transition-all duration-300">
        <header className="flex h-10 shrink-0 items-center gap-2 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl px-3">
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-xs font-medium">U</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 p-1 bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-300">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
