
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PriorityAction } from '../../types/productivity';
import { Clock, User, Phone, FileText, AlertTriangle, CheckCircle } from 'lucide-react';

interface TodaysPrioritiesProps {
  priorities: PriorityAction[];
}

export const TodaysPriorities: React.FC<TodaysPrioritiesProps> = ({ priorities }) => {
  const navigate = useNavigate();

  const getTypeIcon = (type: PriorityAction['type']) => {
    switch (type) {
      case 'call': return Phone;
      case 'follow-up': return CheckCircle;
      case 'review': return FileText;
      case 'urgent': return AlertTriangle;
      default: return Clock;
    }
  };

  const getUrgencyColor = (urgency: PriorityAction['urgency']) => {
    switch (urgency) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getUrgencyBadge = (urgency: PriorityAction['urgency']) => {
    const labels = {
      critical: 'crítico',
      high: 'alto',
      medium: 'médio',
      low: 'baixo'
    };
    
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyLabel = (urgency: PriorityAction['urgency']) => {
    const labels = {
      critical: 'crítico',
      high: 'alto',
      medium: 'médio',
      low: 'baixo'
    };
    return labels[urgency] || urgency;
  };

  const handleActionClick = (priority: PriorityAction) => {
    if (priority.actionUrl) {
      navigate(priority.actionUrl);
    }
  };

  if (priorities.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Prioridades de Hoje</h2>
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tudo em dia!</h3>
          <p className="text-gray-600">Nenhuma prioridade urgente para hoje. Ótimo trabalho!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Prioridades de Hoje</h2>
        <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
          {priorities.length} itens
        </span>
      </div>

      <div className="space-y-4">
        {priorities.map((priority) => {
          const Icon = getTypeIcon(priority.type);
          return (
            <div
              key={priority.id}
              className={`border-l-4 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${getUrgencyColor(priority.urgency)}`}
              onClick={() => handleActionClick(priority)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{priority.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getUrgencyBadge(priority.urgency)}`}>
                        {getUrgencyLabel(priority.urgency)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{priority.description}</p>
                    {priority.studentName && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>{priority.studentName}</span>
                        <Clock className="w-4 h-4 ml-2" />
                        <span>{priority.estimatedTime}min</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActionClick(priority);
                  }}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-200"
                >
                  Executar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
