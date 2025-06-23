
import React from 'react';
import { Home, Users, Calendar, BookOpen, Video } from 'lucide-react';
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
    { icon: Video, label: 'Sessões', path: '/sessions' },
    { icon: Calendar, label: 'Agenda', path: '/calendar' },
    { icon: BookOpen, label: 'Biblioteca', path: '/knowledge' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">All Win</h1>
        <p className="text-sm text-gray-500 mt-1">Sistema de Mentoria</p>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.path)}
                    isActive={isActive(item.path)}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
