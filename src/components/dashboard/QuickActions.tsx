
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Users, TrendingUp, UserPlus, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const actions = [
    {
      id: 'new-student',
      label: 'Adicionar Aluno',
      icon: UserPlus,
      description: 'Cadastrar novo aluno na mentoria',
      action: () => navigate('/students/new'),
      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      urgent: false
    },
    {
      id: 'new-call',
      label: 'Agendar Call',
      icon: Plus,
      description: 'Marcar nova sessão de mentoria',
      action: () => navigate('/calls/new'),
      color: 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      urgent: false
    },
    {
      id: 'today-agenda',
      label: 'Agenda de Hoje',
      icon: Calendar,
      description: 'Ver e gerenciar agenda do dia',
      action: () => navigate('/calendar'),
      color: 'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      urgent: false
    },
    {
      id: 'student-overview',
      label: 'Visão dos Alunos',
      icon: Users,
      description: 'Revisão rápida do status dos alunos',
      action: () => navigate('/students'),
      color: 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      urgent: false
    },
    {
      id: 'productivity-stats',
      label: 'Estatísticas',
      icon: TrendingUp,
      description: 'Ver resumo de produtividade da semana',
      action: () => {
        toast({
          title: "Estatísticas de Produtividade",
          description: "Mostrando suas métricas de mentoria da semana atual.",
        });
        setTimeout(() => {
          const metricsSection = document.querySelector('[data-metrics-section]');
          if (metricsSection) {
            metricsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      },
      color: 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      urgent: false
    },
    {
      id: 'add-offer',
      label: 'Adicionar Oferta',
      icon: Gift,
      description: 'Criar nova oferta para mentorados',
      action: () => navigate('/offers'),
      color: 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      urgent: false
    }
  ];

  return (
    <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-lg border p-4 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
          <span className="text-primary-foreground text-sm">⚡</span>
        </div>
        <h2 className="text-xl font-bold text-foreground">Ações Rápidas</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group relative overflow-hidden`}
            >
              {action.urgent && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
              )}
              
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              <div className="relative flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold mb-1">{action.label}</span>
                <span className="text-xs opacity-90 leading-tight line-clamp-2">
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
