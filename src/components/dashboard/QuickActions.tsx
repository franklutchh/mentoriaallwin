
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Users, FileText, MessageSquare, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const actions = [
    {
      id: 'new-call',
      label: 'Agendar Call',
      icon: Plus,
      description: 'Marcar nova sessão de mentoria',
      action: () => navigate('/calls/new'),
      color: 'bg-blue-500 hover:bg-blue-600',
      urgent: false
    },
    {
      id: 'today-agenda',
      label: 'Agenda de Hoje',
      icon: Calendar,
      description: 'Ver e gerenciar agenda do dia',
      action: () => navigate('/calendar'),
      color: 'bg-purple-500 hover:bg-purple-600',
      urgent: false
    },
    {
      id: 'student-overview',
      label: 'Visão dos Alunos',
      icon: Users,
      description: 'Revisão rápida do status dos alunos',
      action: () => navigate('/students'),
      color: 'bg-green-500 hover:bg-green-600',
      urgent: false
    },
    {
      id: 'weekly-report',
      label: 'Relatório Semanal',
      icon: FileText,
      description: 'Gerar relatório de progresso semanal',
      action: () => {
        toast({
          title: "Relatório Gerado",
          description: "Relatório semanal de produtividade foi gerado com sucesso!",
        });
      },
      color: 'bg-indigo-500 hover:bg-indigo-600',
      urgent: false
    },
    {
      id: 'student-feedback',
      label: 'Feedback Pendente',
      icon: MessageSquare,
      description: 'Gerenciar feedback pendente dos alunos',
      action: () => {
        toast({
          title: "Feedback",
          description: "Redirecionando para área de feedback dos alunos...",
        });
        navigate('/students');
      },
      color: 'bg-yellow-500 hover:bg-yellow-600',
      urgent: false
    },
    {
      id: 'productivity-analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'Ver métricas de produtividade detalhadas',
      action: () => {
        toast({
          title: "Analytics",
          description: "Visualizando métricas de produtividade...",
        });
      },
      color: 'bg-orange-500 hover:bg-orange-600',
      urgent: false
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-xl transition-all hover:scale-105 hover:shadow-lg group relative`}
            >
              {action.urgent && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
              <div className="flex flex-col items-center text-center">
                <Icon className="w-6 h-6 mb-2" />
                <span className="text-sm font-semibold">{action.label}</span>
                <span className="text-xs opacity-80 mt-1 hidden group-hover:block">
                  {action.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
