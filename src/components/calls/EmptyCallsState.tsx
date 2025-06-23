
import React from 'react';
import { Plus, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmptyCallsState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-purple/10 to-brand-purple-medium/10 flex items-center justify-center mx-auto mb-4">
        <Phone className="w-10 h-10 text-brand-purple" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">Nenhuma call encontrada</h3>
      <p className="text-muted-foreground mb-6">Tente ajustar os filtros ou criar uma nova call</p>
      <button
        onClick={() => navigate('/calls/new')}
        className="bg-gradient-to-r from-brand-purple to-brand-purple-medium text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all"
      >
        <Plus className="w-4 h-4 inline mr-2" />
        Nova Call
      </button>
    </div>
  );
};
