
import React from 'react';
import { Plus, CheckCircle, Clock } from 'lucide-react';
import { FollowUpItem } from '../../types/student';
import { formatDate } from '../../utils/studentUtils';

interface FollowUpTabProps {
  followUpItems: FollowUpItem[];
  setFollowUpItems: React.Dispatch<React.SetStateAction<FollowUpItem[]>>;
}

export const FollowUpTab: React.FC<FollowUpTabProps> = ({ followUpItems, setFollowUpItems }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Follow-up Checklist</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Novo Follow-up
        </button>
      </div>
      <div className="space-y-3">
        {followUpItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
            <button
              onClick={() => {
                setFollowUpItems(items => 
                  items.map(i => i.id === item.id ? {...i, completed: !i.completed} : i)
                );
              }}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                item.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-gray-300 hover:border-green-400'
              }`}
            >
              {item.completed && <CheckCircle className="w-3 h-3" />}
            </button>
            <div className="flex-1">
              <p className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {item.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Criado em: {formatDate(item.createdAt)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {item.completed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Clock className="w-4 h-4 text-orange-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
