
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Users, TrendingUp, UserPlus, Target } from 'lucide-react';
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
      color: 'bg-indigo-500 hover:bg-indigo-600',
      urgent: false
    },
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
      id: 'productivity-stats',
      label: 'Estatísticas',
      icon: TrendingUp,
      description: 'Ver resumo de produtividade da semana',
      action: () => {
        toast({
          title: "Estatísticas de Produtividade",
          description: "Mostrando suas métricas de mentoria da semana atual.",
        });
        // Scroll para a seção de métricas
        setTimeout(() => {
          const metricsSection = document.querySelector('[data-metrics-section]');
          if (metricsSection) {
            metricsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      },
      color: 'bg-orange-500 hover:bg-orange-600',
      urgent: false
    },
    {
      id: 'productivity-focus',
      label: 'Modo Foco',
      icon: Target,
      description: 'Ativar sessão de trabalho focado',
      action: () => {
        toast({
          title: "Modo Foco Ativado",
          description: "Sessão de 25 minutos iniciada. Concentre-se nas suas tarefas mais importantes!",
        });
        
        // Simular timer de foco
        let timeLeft = 25 * 60; // 25 minutos em segundos
        const focusTimer = setInterval(() => {
          timeLeft -= 1;
          if (timeLeft <= 0) {
            clearInterval(focusTimer);
            toast({
              title: "Sessão de Foco Concluída!",
              description: "Parabéns! Você completou 25 minutos de trabalho focado. Que tal uma pausa?",
            });
          }
        }, 1000);
      },
      color: 'bg-red-500 hover:bg-red-600',
      urgent: false
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Ações Rápidas</h2>
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
