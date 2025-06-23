
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Users, FileText, AlertTriangle, Clock } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

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
      id: 'weekly-review',
      label: 'Revisão Semanal',
      icon: FileText,
      description: 'Gerar relatório de progresso semanal',
      action: () => console.log('Revisão semanal'),
      color: 'bg-indigo-500 hover:bg-indigo-600',
      urgent: false
    },
    {
      id: 'urgent-items',
      label: 'Itens Urgentes',
      icon: AlertTriangle,
      description: 'Lidar com itens de prioridade crítica',
      action: () => console.log('Itens urgentes'),
      color: 'bg-red-500 hover:bg-red-600',
      urgent: true
    },
    {
      id: 'time-tracker',
      label: 'Controle de Tempo',
      icon: Clock,
      description: 'Acompanhar tempo e produtividade',
      action: () => console.log('Controle de tempo'),
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
