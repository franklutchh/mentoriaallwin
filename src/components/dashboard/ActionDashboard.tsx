
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
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between p-1 bg-card rounded-md border">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Target className="w-3 h-3 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Dashboard de Produtividade</h1>
            <p className="text-xs text-muted-foreground">Seu centro de comando para mentoria orientada por ações</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-muted text-muted-foreground px-2 py-1 rounded-md">
          <Zap className="w-3 h-3" />
          <span className="font-medium text-xs">Modo Foco Ativo</span>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
        {/* Left Column - Priorities & Alerts */}
        <div className="lg:col-span-2 space-y-1">
          <TodaysPriorities priorities={todaysPriorities} />
          <SmartAlerts alerts={smartAlerts} />
        </div>

        {/* Right Column - Goals & Metrics */}
        <div className="space-y-1">
          <WeeklyGoals goals={weeklyGoals} />
          <ProductivityMetrics metrics={productivityMetrics} />
        </div>
      </div>
    </div>
  );
};
