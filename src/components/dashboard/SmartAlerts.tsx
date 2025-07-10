
import React from 'react';
import { AlertTriangle, Clock, Users, X } from 'lucide-react';
import { Alert } from '../../types/productivity';

interface SmartAlertsProps {
  alerts: Alert[];
}

export const SmartAlerts: React.FC<SmartAlertsProps> = ({ alerts }) => {
  const getAlertColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'alta': return 'border-l-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200';
      case 'media': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200';
      case 'baixa': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200';
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'student-delay': return Clock;
      case 'missing-followup': return Users;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Alertas Inteligentes</h2>
        <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-md text-sm font-medium">
          {alerts.filter(a => a.severity === 'alta').length} precisam de atenção
        </span>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border-l-4 ${getAlertColor(alert.severity)} transition-all hover:shadow-sm`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1">
                  <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-medium mb-1 text-sm">{alert.title}</h3>
                    <p className="text-xs opacity-90 mb-1">{alert.message}</p>
                    <p className="text-xs opacity-75">{alert.details}</p>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground p-1">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
