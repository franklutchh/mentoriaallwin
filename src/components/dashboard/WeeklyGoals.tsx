
import React from 'react';
import { WeeklyGoal } from '../../types/productivity';
import { Target, Calendar } from 'lucide-react';

interface WeeklyGoalsProps {
  goals: WeeklyGoal[];
}

export const WeeklyGoals: React.FC<WeeklyGoalsProps> = ({ goals }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressBg = (progress: number) => {
    if (progress >= 80) return 'bg-green-100';
    if (progress >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">Metas Semanais</h2>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className={`p-4 rounded-lg border-2 ${getProgressBg(goal.progress)}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{goal.title}</h3>
              <span className="text-sm text-gray-600">
                {goal.current}/{goal.target} {goal.unit}
              </span>
            </div>
            
            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal.progress)}`}
                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={`font-medium ${goal.progress >= 80 ? 'text-green-700' : goal.progress >= 60 ? 'text-yellow-700' : 'text-red-700'}`}>
                {Math.round(goal.progress)}% completo
              </span>
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date(goal.deadline).toLocaleDateString('pt-BR', { 
                  day: 'numeric', 
                  month: 'short' 
                })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
