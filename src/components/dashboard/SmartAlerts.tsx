
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Alertas Inteligentes</h2>
        <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
          {alerts.filter(a => a.severity === 'alta').length} precisam de atenção
        </span>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border-l-4 ${getAlertColor(alert.severity)} transition-all hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{alert.title}</h3>
                    <p className="text-sm opacity-90 mb-2">{alert.message}</p>
                    <p className="text-xs opacity-75">{alert.details}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
