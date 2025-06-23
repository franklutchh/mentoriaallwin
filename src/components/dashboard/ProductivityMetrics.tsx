
import React from 'react';
import { ProductivityMetrics } from '../../types/productivity';
import { Phone, Clock, Users, TrendingUp, AlertCircle } from 'lucide-react';

interface ProductivityMetricsProps {
  metrics: ProductivityMetrics;
}

export const ProductivityMetrics: React.FC<ProductivityMetricsProps> = ({ metrics }) => {
  const metricsData = [
    {
      id: 'today-calls',
      label: 'Calls Hoje',
      value: metrics.todaysCalls,
      icon: Phone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'pending-followups',
      label: 'Follow-ups Pendentes',
      value: metrics.pendingFollowUps,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      id: 'students-attention',
      label: 'Alunos Precisam Atenção',
      value: metrics.studentsNeedingAttention,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 'weekly-progress',
      label: 'Progresso Semanal',
      value: `${Math.round(metrics.weeklyProgress)}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">Métricas de Produtividade</h2>
      </div>

      <div className="space-y-4">
        {metricsData.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <span className="font-medium text-gray-900">{metric.label}</span>
              </div>
              <span className={`text-xl font-bold ${metric.color}`}>
                {metric.value}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <span className="font-semibold text-gray-900">Tempo Médio de Resposta</span>
        </div>
        <div className="text-2xl font-bold text-purple-600">
          {metrics.avgResponseTime.toFixed(1)} horas
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Meta: menos de 24 horas
        </p>
      </div>
    </div>
  );
};
