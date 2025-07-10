
import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { Goal } from '../../types/productivity';

interface WeeklyGoalsProps {
  goals: Goal[];
}

export const WeeklyGoals: React.FC<WeeklyGoalsProps> = ({ goals }) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
          <Target className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Metas Semanais</h2>
      </div>
      
      <div className="space-y-3">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground text-sm">{goal.title}</h3>
              <span className="text-xs font-medium text-muted-foreground">
                {goal.current}/{goal.target} {goal.unit}
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{goal.description}</span>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                <span>{Math.round((goal.current / goal.target) * 100)}%</span>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {goal.daysLeft} dias restantes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
