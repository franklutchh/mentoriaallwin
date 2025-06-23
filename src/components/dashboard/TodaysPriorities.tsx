
import React from 'react';
import { Clock, User, CheckCircle2 } from 'lucide-react';
import { Priority } from '../../types/productivity';

interface TodaysPrioritiesProps {
  priorities: Priority[];
}

export const TodaysPriorities: React.FC<TodaysPrioritiesProps> = ({ priorities }) => {
  const getPriorityColor = (priority: Priority['level']) => {
    switch (priority) {
      case 'alta': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20';
      case 'media': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'baixa': return 'border-l-green-500 bg-green-50 dark:bg-green-900/20';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Prioridades de Hoje</h2>
        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
          {priorities.length} {priorities.length === 1 ? 'item' : 'itens'}
        </span>
      </div>
      
      <div className="space-y-4">
        {priorities.map((priority) => (
          <div
            key={priority.id}
            className={`p-4 rounded-xl border-l-4 ${getPriorityColor(priority.level)} transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{priority.title}</h3>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Executar Ação
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-3">{priority.description}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{priority.student}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{priority.estimatedTime}</span>
              </div>
              {priority.completed && (
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Concluído</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
