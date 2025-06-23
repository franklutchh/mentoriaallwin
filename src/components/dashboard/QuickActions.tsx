
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
      id: 'productivity-focus',
      label: 'Modo Foco',
      icon: Target,
      description: 'Ativar sessão de trabalho focado',
      action: () => {
        toast({
          title: "Modo Foco Ativado",
          description: "Sessão de 25 minutos iniciada. Concentre-se nas suas tarefas mais importantes!",
        });
        
        let timeLeft = 25 * 60;
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
      color: 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      urgent: false
    }
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 p-8 transition-all duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-white text-lg">⚡</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ações Rápidas</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className={`${action.color} text-white p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden`}
            >
              {action.urgent && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
              )}
              
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              
              <div className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
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
