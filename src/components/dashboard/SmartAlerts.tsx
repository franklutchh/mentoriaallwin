
import React from 'react';
import { SmartAlert } from '../../types/productivity';
import { AlertTriangle, Info, CheckCircle, X, Calendar, Phone } from 'lucide-react';

interface SmartAlertsProps {
  alerts: SmartAlert[];
}

export const SmartAlerts: React.FC<SmartAlertsProps> = ({ alerts }) => {
  const getAlertIcon = (type: SmartAlert['type']) => {
    switch (type) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      case 'success': return CheckCircle;
      default: return Info;
    }
  };

  const getAlertColor = (type: SmartAlert['type']) => {
    switch (type) {
      case 'error': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconColor = (type: SmartAlert['type']) => {
    switch (type) {
      case 'error': return 'text-red-500';
      case 'warning': return 'text-yellow-500';
      case 'info': return 'text-blue-500';
      case 'success': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const handleQuickAction = (action: any) => {
    action.action();
  };

  if (alerts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Alertas Inteligentes</h2>
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Tudo tranquilo!</h3>
          <p className="text-gray-600">Nenhum alerta requer sua atenção no momento.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Alertas Inteligentes</h2>
        <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
          {alerts.filter(a => a.actionRequired).length} precisam de atenção
        </span>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          return (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Icon className={`w-5 h-5 mt-0.5 ${getIconColor(alert.type)}`} />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{alert.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{alert.message}</p>
                    
                    {alert.daysOverdue && (
                      <div className="flex items-center gap-1 text-sm opacity-75 mb-3">
                        <span>{alert.daysOverdue} dias em atraso</span>
                      </div>
                    )}

                    {alert.quickActions && alert.quickActions.length > 0 && (
                      <div className="flex gap-2">
                        {alert.quickActions.map((action) => (
                          <button
                            key={action.id}
                            onClick={() => handleQuickAction(action)}
                            className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-1 rounded text-sm font-medium transition-colors border border-gray-200 flex items-center gap-1"
                          >
                            {action.icon === 'Calendar' && <Calendar className="w-4 h-4" />}
                            {action.icon === 'Phone' && <Phone className="w-4 h-4" />}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
