
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

  // Só mostra se há dados para exibir
  const hasPriorities = todaysPriorities.length > 0;
  const hasAlerts = smartAlerts.length > 0;
  const hasGoals = weeklyGoals.length > 0;
  const hasAnyData = hasPriorities || hasAlerts || hasGoals;

  if (!hasAnyData) {
    return null; // Não mostra nada se não há dados
  }

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Dashboard de Produtividade</h1>
            <p className="text-sm text-muted-foreground">Seu centro de comando para mentoria orientada por ações</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-muted text-muted-foreground px-3 py-1.5 rounded-lg">
          <Zap className="w-4 h-4" />
          <span className="font-medium text-sm">Modo Foco Ativo</span>
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Priorities & Alerts */}
        <div className="lg:col-span-2 space-y-4">
          {hasPriorities && <TodaysPriorities priorities={todaysPriorities} />}
          {hasAlerts && <SmartAlerts alerts={smartAlerts} />}
        </div>

        {/* Right Column - Goals & Metrics */}
        <div className="space-y-4">
          {hasGoals && <WeeklyGoals goals={weeklyGoals} />}
          <ProductivityMetrics metrics={productivityMetrics} />
        </div>
      </div>
    </div>
  );
};
