
import React from 'react';
import { Clock, Users, CheckCircle2, TrendingUp, Phone } from 'lucide-react';
import { ProductivityMetrics as ProductivityMetricsType } from '../../types/productivity';

interface Props {
  metrics: ProductivityMetricsType;
}

export const ProductivityMetrics: React.FC<Props> = ({ metrics }) => {
  const metricCards = [
    {
      id: 'todays-calls',
      title: 'Calls de Hoje',
      value: metrics.todaysCalls,
      unit: 'calls',
      icon: Phone,
      color: 'bg-blue-500',
      description: 'Sessões realizadas hoje'
    },
    {
      id: 'pending-followups',
      title: 'Follow-ups Pendentes',
      value: metrics.pendingFollowUps,
      unit: 'pendentes',
      icon: Clock,
      color: 'bg-orange-500',
      description: 'Acompanhamentos necessários'
    },
    {
      id: 'students-attention',
      title: 'Alunos Precisando Atenção',
      value: metrics.studentsNeedingAttention,
      unit: 'alunos',
      icon: Users,
      color: 'bg-red-500',
      description: 'Sem contato há 8+ dias'
    },
    {
      id: 'weekly-progress',
      title: 'Progresso Semanal',
      value: Math.round(metrics.weeklyProgress),
      unit: '%',
      icon: TrendingUp,
      color: 'bg-green-500',
      description: 'Meta de calls semanais'
    }
  ];

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
      data-metrics-section
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Métricas de Produtividade</h2>
      </div>

      <div className="space-y-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${metric.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{metric.title}</h3>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value}
                  <span className="text-sm font-normal text-gray-600 ml-1">
                    {metric.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">Tempo Médio de Resposta</span>
        </div>
        <div className="text-lg font-bold text-purple-600">
          {metrics.avgResponseTime} horas
        </div>
        <p className="text-xs text-purple-700 mt-1">
          Tempo médio para responder alunos
        </p>
      </div>
    </div>
  );
};
