
import React from 'react';

interface StudentProgressProps {
  tasksCompleted?: number;
  totalTasks?: number;
}

export const StudentProgress: React.FC<StudentProgressProps> = ({ tasksCompleted, totalTasks }) => {
  if (!totalTasks) return null;

  const progressPercentage = Math.round((tasksCompleted! / totalTasks) * 100);

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-gray-600">Progresso do Plano</span>
        <span className="font-medium text-gray-900">{progressPercentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            progressPercentage >= 80 ? 'bg-green-500' : 
            progressPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {tasksCompleted}/{totalTasks} tarefas concluídas
      </p>
    </div>
  );
};
