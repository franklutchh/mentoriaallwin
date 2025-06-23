
import React from 'react';
import { ProductivityMetrics as Metrics } from '../../types/productivity';
import { Phone, Clock, AlertTriangle, TrendingUp, Target, Users } from 'lucide-react';

interface ProductivityMetricsProps {
  metrics: Metrics;
}

export const ProductivityMetrics: React.FC<ProductivityMetricsProps> = ({ metrics }) => {
  const metricCards = [
    {
      id: 'todays-calls',
      title: 'Calls de Hoje',
      value: metrics.todaysCalls,
      unit: 'calls',
      icon: Phone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'pending-followups',
      title: 'Follow-ups Pendentes',
      value: metrics.pendingFollowUps,
      unit: 'itens',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'students-attention',
      title: 'Precisam de Atenção',
      value: metrics.studentsNeedingAttention,
      unit: 'alunos',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'weekly-progress',
      title: 'Progresso Semanal',
      value: Math.round(metrics.weeklyProgress),
      unit: '%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">Métricas de Produtividade</h2>
      </div>

      <div className="space-y-4">
        {metricCards.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className={`p-4 rounded-lg ${metric.bgColor}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.value}{metric.unit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Average Response Time */}
        <div className="p-4 rounded-lg bg-purple-50 border-t-4 border-purple-500">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tempo Médio de Resposta</p>
              <p className="text-2xl font-bold text-gray-900">
                {metrics.avgResponseTime} dias
              </p>
              <p className="text-xs text-purple-700 mt-1">
                {metrics.avgResponseTime <= 3 ? '🟢 Excelente' : 
                 metrics.avgResponseTime <= 7 ? '🟡 Bom' : '🔴 Precisa melhorar'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
