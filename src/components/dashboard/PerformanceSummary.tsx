
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface PerformanceSummaryProps {
  activeStudents: number;
  totalStudents: number;
  completedSessions: number;
  totalSessions: number;
}

export const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({
  activeStudents,
  totalStudents,
  completedSessions,
  totalSessions
}) => {
  const activityRate = totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;
  const completionRate = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;
  const sessionsPerStudent = activeStudents > 0 ? (totalSessions / activeStudents).toFixed(1) : '0.0';

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-100">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Resumo de Performance</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{activityRate}%</p>
          <p className="text-sm text-gray-600">Taxa de Atividade</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{completionRate}%</p>
          <p className="text-sm text-gray-600">Sessões Completas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">{sessionsPerStudent}</p>
          <p className="text-sm text-gray-600">Sessões/Aluno</p>
        </div>
      </div>
    </div>
  );
};
