
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Users, AlertTriangle, Target } from 'lucide-react';
import { FinancialMetrics } from '../../types/student';

interface FinancialMetricsProps {
  metrics: FinancialMetrics;
}

export const FinancialMetricsComponent: React.FC<FinancialMetricsProps> = ({ metrics }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 p-8 transition-all duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Controle Financeiro</h2>
          <p className="text-gray-600 dark:text-gray-300">Maximize sua receita e reduza a inadimplência</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Receita Total */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-100/50 dark:border-green-800/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-1">RECEITA TOTAL</h3>
          <p className="text-3xl font-bold text-green-900 dark:text-green-100">{formatCurrency(metrics.totalRevenue)}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">Valor acumulado</p>
        </div>

        {/* Receita Mensal */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100/50 dark:border-blue-800/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1">RECEITA MENSAL</h3>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{formatCurrency(metrics.monthlyRevenue)}</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Meta: {formatCurrency(metrics.monthlyRevenue * 1.2)}</p>
        </div>

        {/* Ticket Médio */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-6 border border-purple-100/50 dark:border-purple-800/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300 mb-1">TICKET MÉDIO</h3>
          <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{formatCurrency(metrics.averageTicket)}</p>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">Por aluno ativo</p>
        </div>

        {/* Taxa de Churn */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 border border-orange-100/50 dark:border-orange-800/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-1">TAXA DE CHURN</h3>
          <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{formatPercentage(metrics.churnRate)}</p>
          <p className="text-xs text-orange-600 dark:text-orange-400 mt-2">Meta: &lt; 5%</p>
        </div>

        {/* Inadimplência */}
        <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-6 border border-red-100/50 dark:border-red-800/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">INADIMPLÊNCIA</h3>
          <p className="text-3xl font-bold text-red-900 dark:text-red-100">{formatPercentage(metrics.paymentDelayRate)}</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-2">{metrics.paymentDelayRate > 10 ? 'Requer atenção' : 'Sob controle'}</p>
        </div>

        {/* Lifetime Value */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-teal-100/50 dark:border-teal-800/50">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-1">VALOR VITALÍCIO</h3>
          <p className="text-3xl font-bold text-teal-900 dark:text-teal-100">{formatCurrency(metrics.lifetimeValue)}</p>
          <p className="text-xs text-teal-600 dark:text-teal-400 mt-2">Por aluno médio</p>
        </div>
      </div>
    </div>
  );
};
