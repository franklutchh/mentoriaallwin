
import React from 'react';
import { Plus, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CallsHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-purple-medium flex items-center justify-center">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Calls</h1>
            <p className="text-muted-foreground mt-1">Gerencie todas as calls realizadas e agendadas</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate('/calls/new')}
        className="bg-gradient-to-r from-brand-purple to-brand-purple-medium hover:from-brand-purple-medium hover:to-brand-purple-dark text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all hover:scale-105 shadow-apple-lg font-semibold"
      >
        <Plus className="w-5 h-5" />
        Nova Call
      </button>
    </div>
  );
};
