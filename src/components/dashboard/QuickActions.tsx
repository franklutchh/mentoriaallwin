
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Users, Settings, TrendingUp, UserPlus } from 'lucide-react';
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
      id: 'settings',
      label: 'Configurações',
      icon: Settings,
      description: 'Configurações do sistema e tema',
      action: () => {
        // Abrir modal de configurações
        const settingsModal = document.querySelector('[data-settings-modal]');
        if (settingsModal) {
          settingsModal.classList.remove('hidden');
        } else {
          // Criar e mostrar modal temporário
          const modal = document.createElement('div');
          modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
          modal.setAttribute('data-settings-modal', '');
          modal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-full max-w-md mx-4">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold text-gray-900">Configurações</h2>
                <button onclick="this.closest('[data-settings-modal]').remove()" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">Tema Escuro</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" onchange="document.documentElement.classList.toggle('dark')">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">Notificações</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-gray-700">Som de Alertas</span>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer" checked>
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              <div class="mt-6 pt-4 border-t border-gray-200">
                <button onclick="this.closest('[data-settings-modal]').remove()" class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Salvar Configurações
                </button>
              </div>
            </div>
          `;
          document.body.appendChild(modal);
        }
      },
      color: 'bg-gray-500 hover:bg-gray-600',
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
