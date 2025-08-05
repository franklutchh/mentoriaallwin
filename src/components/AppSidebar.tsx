
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
  {
    title: "Ofertas Escaladas",
    url: "/scaled-offers",
    icon: Target,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

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
      {/* Sidebar principal */}
      <div 
        className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-border z-40 transition-all duration-200 ease-in-out ${
          isHovered ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header da sidebar */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <div className={`transition-all duration-200 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
              <h2 className="font-bold text-lg whitespace-nowrap text-foreground">Mentoria</h2>
              <p className="text-xs text-muted-foreground whitespace-nowrap">Sistema de Gestão</p>
            </div>
          </div>
        </div>
        
        {/* Navegação */}
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                  location.pathname === item.url
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title={!isHovered ? item.title : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className={`transition-all duration-200 whitespace-nowrap ${
                  isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`}>
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer da sidebar */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-medium text-muted-foreground">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className={`flex-1 min-w-0 transition-all duration-200 ${
              isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
            }`}>
              <p className="text-sm font-medium text-foreground truncate whitespace-nowrap">
                {user?.user_metadata?.name || user?.email}
              </p>
              <p className="text-xs text-muted-foreground truncate whitespace-nowrap">
                {user?.email}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className={`p-2 text-muted-foreground hover:text-foreground transition-all duration-200 flex-shrink-0 rounded-md hover:bg-muted ${
                isHovered ? 'opacity-100' : 'opacity-0'
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
