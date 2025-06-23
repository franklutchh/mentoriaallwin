
import React from 'react';
import { Home, Users, Calendar, BookOpen, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Alunos', path: '/students' },
    { icon: Phone, label: 'Calls', path: '/calls' },
    { icon: Calendar, label: 'Agenda', path: '/calendar' },
    { icon: BookOpen, label: 'Biblioteca', path: '/knowledge' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border/60">
      <SidebarHeader className="p-8 border-b border-sidebar-border/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-purple-medium flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">All Win</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Sistema de Calls</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Navegação
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    isActive={isActive(item.path)}
                    className={`
                      w-full justify-start px-4 py-3 rounded-xl font-medium transition-all duration-200
                      ${isActive(item.path) 
                        ? 'bg-gradient-to-r from-brand-purple/10 to-brand-purple-medium/10 text-brand-purple-medium border border-brand-purple/20 shadow-apple' 
                        : 'hover:bg-sidebar-accent text-sidebar-foreground hover:scale-[1.02] hover:shadow-apple-lg'
                      }
                    `}
                  >
                    <item.icon className={`w-5 h-5 mr-4 ${isActive(item.path) ? 'text-brand-purple' : ''}`} />
                    <span className="text-base">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="mt-8 pt-6 border-t border-sidebar-border/40">
          <div className="bg-gradient-to-br from-brand-purple/5 to-brand-purple-medium/5 rounded-xl p-4 border border-brand-purple/10">
            <h3 className="text-sm font-semibold text-foreground mb-2">Quick Stats</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Calls Today</span>
                <span className="font-medium text-brand-purple">5</span>
              </div>
              <div className="flex justify-between">
                <span>Active Students</span>
                <span className="font-medium text-brand-purple-medium">24</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
