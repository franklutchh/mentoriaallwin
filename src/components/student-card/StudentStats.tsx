
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StudentStatsProps {
  sessionCount: number;
  progressPercentage: number;
}

export const StudentStats: React.FC<StudentStatsProps> = ({ sessionCount, progressPercentage }) => {
  return (
    <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
      <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
      <span className="text-sm text-gray-700 flex-1">
        {sessionCount} sessões realizadas
      </span>
      <span className="text-xs text-gray-500">
        {progressPercentage >= 80 ? 'Excelente' : progressPercentage >= 60 ? 'Boa' : 'Atenção'}
      </span>
    </div>
  );
};
