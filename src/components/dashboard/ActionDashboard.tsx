
import React from 'react';
import { QuickActions } from './QuickActions';
import { TodaysPriorities } from './TodaysPriorities';
import { SmartAlerts } from './SmartAlerts';
import { WeeklyGoals } from './WeeklyGoals';
import { ProductivityMetrics } from './ProductivityMetrics';
import { useProductivityActions } from '../../hooks/useProductivityActions';
import { Target, Zap } from 'lucide-react';

export const ActionDashboard: React.FC = () => {
  const { todaysPriorities, smartAlerts, weeklyGoals, productivityMetrics } = useProductivityActions();

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard de Produtividade</h1>
            <p className="text-xs text-gray-600 dark:text-gray-300">Seu centro de comando para mentoria orientada por ações</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-md">
          <Zap className="w-3 h-3" />
          <span className="font-medium text-xs">Modo Foco Ativo</span>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Left Column - Priorities & Alerts */}
        <div className="lg:col-span-2 space-y-2">
          <TodaysPriorities priorities={todaysPriorities} />
          <SmartAlerts alerts={smartAlerts} />
        </div>

        {/* Right Column - Goals & Metrics */}
        <div className="space-y-2">
          <WeeklyGoals goals={weeklyGoals} />
          <ProductivityMetrics metrics={productivityMetrics} />
        </div>
      </div>
    </div>
  );
};
