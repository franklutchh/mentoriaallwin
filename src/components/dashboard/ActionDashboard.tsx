
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard de Produtividade</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Seu centro de comando para mentoria orientada por ações</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-xl">
          <Zap className="w-5 h-5" />
          <span className="font-semibold">Modo Foco Ativo</span>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Priorities & Alerts */}
        <div className="lg:col-span-2 space-y-8">
          <TodaysPriorities priorities={todaysPriorities} />
          <SmartAlerts alerts={smartAlerts} />
        </div>

        {/* Right Column - Goals & Metrics */}
        <div className="space-y-8">
          <WeeklyGoals goals={weeklyGoals} />
          <ProductivityMetrics metrics={productivityMetrics} />
        </div>
      </div>
    </div>
  );
};
