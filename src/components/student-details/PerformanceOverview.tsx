
import React from 'react';
import { Student, Mentoring, FollowUpItem } from '../../types/student';

interface PerformanceOverviewProps {
  student: Student;
  mentorias: Mentoring[];
  followUpItems: FollowUpItem[];
}

export const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({ 
  student, 
  mentorias, 
  followUpItems 
}) => {
  const progressPercentage = student.totalTasks ? Math.round((student.tasksCompleted! / student.totalTasks) * 100) : 0;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Geral</h3>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{mentorias.length}</p>
              <p className="text-sm text-gray-600">Sessões</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{progressPercentage}%</p>
              <p className="text-sm text-gray-600">Conclusão</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{followUpItems.filter(f => !f.completed).length}</p>
              <p className="text-sm text-gray-600">Follow-ups</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="w-24 h-24 relative">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${progressPercentage * 2.51} 251`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-900">{progressPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
