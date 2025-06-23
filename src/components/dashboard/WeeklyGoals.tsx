
import React from 'react';
import { WeeklyGoal } from '../../types/productivity';
import { Target, TrendingUp, Calendar } from 'lucide-react';

interface WeeklyGoalsProps {
  goals: WeeklyGoal[];
}

export const WeeklyGoals: React.FC<WeeklyGoalsProps> = ({ goals }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-yellow-500';
    if (progress >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressBg = (progress: number) => {
    if (progress >= 90) return 'bg-green-50';
    if (progress >= 70) return 'bg-yellow-50';
    if (progress >= 50) return 'bg-orange-50';
    return 'bg-red-50';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">Metas Semanais</h2>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.id} className={`p-4 rounded-lg ${getProgressBg(goal.progress)}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{goal.title}</h3>
              <span className="text-sm text-gray-600">
                {goal.current}/{goal.target} {goal.unit}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal.progress)}`}
                style={{ width: `${Math.min(goal.progress, 100)}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>{Math.round(goal.progress)}% concluído</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  {Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))} dias restantes
                </span>
              </div>
            </div>

            {goal.progress >= 100 && (
              <div className="mt-2 text-sm text-green-700 font-medium">
                🎉 Meta alcançada!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
