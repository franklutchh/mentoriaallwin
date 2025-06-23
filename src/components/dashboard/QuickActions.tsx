
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, Users, FileText, AlertTriangle, Clock } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'new-call',
      label: 'Schedule Call',
      icon: Plus,
      description: 'Book a new mentoring session',
      action: () => navigate('/calls/new'),
      color: 'bg-blue-500 hover:bg-blue-600',
      urgent: false
    },
    {
      id: 'today-agenda',
      label: "Today's Agenda",
      icon: Calendar,
      description: 'View and manage today\'s schedule',
      action: () => navigate('/calendar'),
      color: 'bg-purple-500 hover:bg-purple-600',
      urgent: false
    },
    {
      id: 'student-overview',
      label: 'Student Overview',
      icon: Users,
      description: 'Quick student status review',
      action: () => navigate('/students'),
      color: 'bg-green-500 hover:bg-green-600',
      urgent: false
    },
    {
      id: 'weekly-review',
      label: 'Weekly Review',
      icon: FileText,
      description: 'Generate weekly progress report',
      action: () => console.log('Weekly review'),
      color: 'bg-indigo-500 hover:bg-indigo-600',
      urgent: false
    },
    {
      id: 'urgent-items',
      label: 'Urgent Items',
      icon: AlertTriangle,
      description: 'Handle critical priority items',
      action: () => console.log('Urgent items'),
      color: 'bg-red-500 hover:bg-red-600',
      urgent: true
    },
    {
      id: 'time-tracker',
      label: 'Time Tracker',
      icon: Clock,
      description: 'Track mentoring time and productivity',
      action: () => console.log('Time tracker'),
      color: 'bg-orange-500 hover:bg-orange-600',
      urgent: false
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.action}
              className={`${action.color} text-white p-4 rounded-xl transition-all hover:scale-105 hover:shadow-lg group relative`}
            >
              {action.urgent && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
              <div className="flex flex-col items-center text-center">
                <Icon className="w-6 h-6 mb-2" />
                <span className="text-sm font-semibold">{action.label}</span>
                <span className="text-xs opacity-80 mt-1 hidden group-hover:block">
                  {action.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
