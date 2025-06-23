
import React from 'react';
import { Plus } from 'lucide-react';
import { ActionItem } from '../../types/student';
import { formatDate, getStatusColor, getPriorityColor, getStatusLabel } from '../../utils/studentUtils';

interface ActionPlanTabProps {
  actionItems: ActionItem[];
}

export const ActionPlanTab: React.FC<ActionPlanTabProps> = ({ actionItems }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Plano de Ação</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Nova Tarefa
        </button>
      </div>
      <div className="space-y-4">
        {actionItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <input
              type="checkbox"
              checked={item.status === 'concluido'}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <p className={`${item.status === 'concluido'? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {item.description}
              </p>
              {item.dueDate && (
                <p className="text-xs text-gray-500 mt-1">
                  Prazo: {formatDate(item.dueDate)}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(item.priority)}`}>
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(item.status)}`}>
                {getStatusLabel(item.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
