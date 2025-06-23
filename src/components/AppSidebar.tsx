
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
    { icon: Phone, label: 'Chamadas', path: '/calls' },
    { icon: Calendar, label: 'Agenda', path: '/calendar' },
    { icon: BookOpen, label: 'Biblioteca', path: '/knowledge' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 backdrop-blur-xl transition-colors duration-300">
      <SidebarHeader className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Win</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Sistema de Mentoria</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">
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
                        ? 'bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 shadow-sm' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-[1.02] hover:shadow-sm'
                      }
                    `}
                  >
                    <item.icon className={`w-5 h-5 mr-4 ${isActive(item.path) ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`} />
                    <span className="text-base">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-br from-purple-50 via-purple-25 to-indigo-50 dark:from-purple-900/30 dark:via-purple-800/20 dark:to-indigo-900/30 rounded-2xl p-5 border border-purple-100 dark:border-purple-800/50 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-purple-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">📊</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Estatísticas Rápidas</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Calls Hoje</span>
                </div>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">5</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Alunos Ativos</span>
                </div>
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">24</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
