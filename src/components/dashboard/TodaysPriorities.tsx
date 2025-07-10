
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
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Prioridades de Hoje</h2>
        <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
          {priorities.length} {priorities.length === 1 ? 'item' : 'itens'}
        </span>
      </div>
      
      <div className="space-y-3">
        {priorities.map((priority) => (
          <div
            key={priority.id}
            className={`p-3 rounded-lg border-l-4 ${getPriorityColor(priority.level)} transition-all hover:shadow-sm`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-foreground">{priority.title}</h3>
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 rounded-md text-sm transition-colors">
                Executar
              </button>
            </div>
            
            <p className="text-muted-foreground text-sm mb-2">{priority.description}</p>
            
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{priority.student}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{priority.estimatedTime}</span>
              </div>
              {priority.completed && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-3 h-3" />
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
