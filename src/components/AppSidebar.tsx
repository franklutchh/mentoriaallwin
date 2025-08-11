import React from 'react';
import { Home, Users, Calendar as CalendarIcon, Phone, Target, BookOpen, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

const navigationItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Alunos', url: '/students', icon: Users },
  { title: 'Calendário', url: '/calendar', icon: CalendarIcon },
  { title: 'Calls', url: '/calls', icon: Phone },
  { title: 'Prioridades', url: '/priorities', icon: Target },
  { title: 'Base de Conhecimento', url: '/knowledge', icon: BookOpen },
  { title: 'Ofertas Escaladas', url: '/scaled-offers', icon: Target },
];

export function AppSidebar() {
  const location = useLocation();
  const { signOut, user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: 'Logout realizado com sucesso!', description: 'Até a próxima!' });
    } catch (error) {
      toast({ title: 'Erro', description: 'Não foi possível fazer logout.', variant: 'destructive' });
    }
  };

  return (
    <Sidebar side="left" collapsible="offcanvas" variant="sidebar" className="bg-sidebar text-sidebar-foreground">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="w-9 h-9 bg-gradient-to-r from-primary to-primary/80 rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground font-bold text-xs">M</span>
          </div>
          <div className="leading-tight">
            <h2 className="font-semibold text-sm text-foreground">Mentoria</h2>
            <p className="text-[10px] text-muted-foreground">Sistema de Gestão</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url} aria-label={item.title}>
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <div className="flex items-center gap-3 px-2 py-1.5">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-muted-foreground">
              {(user?.email?.[0] || 'U').toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.user_metadata?.name || user?.email || 'Usuário'}
            </p>
            {user?.email && (
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            )}
          </div>
          <button
            onClick={handleSignOut}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Sair"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
