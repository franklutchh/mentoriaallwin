
import React, { useState } from 'react';
import { Home, Users, Calendar, Phone, Target, BookOpen, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Alunos",
    url: "/students",
    icon: Users,
  },
  {
    title: "Calendário",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Calls",
    url: "/calls",
    icon: Phone,
  },
  {
    title: "Prioridades",
    url: "/priorities",  
    icon: Target,
  },
  {
    title: "Base de Conhecimento",
    url: "/knowledge",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado com sucesso!",
        description: "Até a próxima!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível fazer logout.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Área de trigger invisível na borda esquerda */}
      <div 
        className="fixed left-0 top-0 w-2 h-full z-50 bg-transparent"
        onMouseEnter={() => setIsExpanded(true)}
      />
      
      {/* Sidebar principal */}
      <div 
        className={`fixed left-0 top-0 h-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-52' : 'w-10'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Header da sidebar */}
        <div className="p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div className={`transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
              <h2 className="font-bold text-lg whitespace-nowrap">Mentoria</h2>
              <p className="text-xs text-muted-foreground whitespace-nowrap">Sistema de Gestão</p>
            </div>
          </div>
        </div>
        
        {/* Navegação */}
        <div className="flex-1 py-4">
          <div className={`px-3 mb-2 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Navegação
            </p>
          </div>
          
          <nav className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-200 group ${
                  location.pathname === item.url
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title={!isExpanded ? item.title : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={`transition-all duration-300 whitespace-nowrap ${
                  isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer da sidebar */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-200">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-300 ${
              isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
            }`}>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate whitespace-nowrap">
                {user?.user_metadata?.name || user?.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate whitespace-nowrap">
                {user?.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className={`p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-200 flex-shrink-0 ${
                isExpanded ? 'opacity-100' : 'opacity-0'
              }`}
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
