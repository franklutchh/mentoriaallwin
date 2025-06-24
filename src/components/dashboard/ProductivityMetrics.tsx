
import React from 'react';
import { BarChart3, Users, Calendar, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ProductivityMetric } from '../../types/productivity';

interface ProductivityMetricsProps {
  metrics: ProductivityMetric[];
}

export const ProductivityMetrics: React.FC<ProductivityMetricsProps> = ({ metrics }) => {
  const getMetricIcon = (type: ProductivityMetric['type']) => {
    switch (type) {
      case 'calls': return Calendar;
      case 'students': return Users;
      case 'hours': return Clock;
      default: return BarChart3;
    }
  };

  const getMetricColor = (trend: ProductivityMetric['trend']) => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400';
      case 'down': return 'text-red-600 dark:text-red-400';
      case 'stable': return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getTrendIcon = (trend: ProductivityMetric['trend']) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'stable': return Minus;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300" data-metrics-section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Métricas de Produtividade</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = getMetricIcon(metric.type);
          const TrendIcon = getTrendIcon(metric.trend);
          
          return (
            <div key={metric.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-100 dark:border-gray-600 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">{metric.label}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{metric.period}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg bg-white dark:bg-gray-800 ${getMetricColor(metric.trend)}`}>
                  <TrendIcon className="w-3 h-3" />
                  <span className="text-xs font-medium">{metric.change}</span>
                </div>
              </div>
              
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
