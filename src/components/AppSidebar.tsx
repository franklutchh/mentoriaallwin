
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
    <Sidebar className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 backdrop-blur-xl transition-colors duration-300">
      <SidebarHeader className="p-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">All Win</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Sistema de Calls</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
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
                        ? 'bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 shadow-sm' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-[1.02] hover:shadow-sm'
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
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gradient-to-br from-purple-50 to-purple-25 dark:from-purple-900/20 dark:to-purple-800/10 rounded-xl p-4 border border-purple-100 dark:border-purple-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Quick Stats</h3>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Calls Today</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">5</span>
              </div>
              <div className="flex justify-between">
                <span>Active Students</span>
                <span className="font-medium text-purple-600 dark:text-purple-400">24</span>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
