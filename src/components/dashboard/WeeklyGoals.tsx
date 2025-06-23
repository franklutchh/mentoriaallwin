
import React from 'react';
import { Target, TrendingUp } from 'lucide-react';
import { Goal } from '../../types/productivity';

interface WeeklyGoalsProps {
  goals: Goal[];
}

export const WeeklyGoals: React.FC<WeeklyGoalsProps> = ({ goals }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Metas Semanais</h2>
      </div>
      
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {goal.current}/{goal.target} {goal.unit}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{goal.description}</span>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span>{Math.round((goal.current / goal.target) * 100)}% concluído</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 dark:text-gray-500">
              {goal.daysLeft} dias restantes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
