
import React from 'react';
import { Home, Users, Calendar, BookOpen, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Alunos', path: '/students' },
    { icon: Calendar, label: 'Agenda', path: '/calendar' },
    { icon: BookOpen, label: 'Biblioteca', path: '/knowledge' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">All Win</h1>
        <p className="text-sm text-gray-500 mt-1">Sistema de Mentoria</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                : 'text-gray-700'
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
