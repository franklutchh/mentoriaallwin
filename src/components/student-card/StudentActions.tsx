
import React from 'react';
import { Plus, Star, Video, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudentActionsProps {
  studentId: string;
}

export const StudentActions: React.FC<StudentActionsProps> = ({ studentId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0 ml-3 relative z-10">
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate('/calls/new', { state: { studentId } });
        }}
        className="p-2.5 hover:bg-brand-purple/10 rounded-xl transition-all duration-200 relative z-20 hover:scale-110 group/btn"
        title="Nova Call"
      >
        <Phone className="w-4 h-4 text-brand-purple group-hover/btn:text-brand-purple-medium transition-colors" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          // Toggle favorite logic would go here
        }}
        className="p-2.5 hover:bg-yellow-50 rounded-xl transition-all duration-200 relative z-20 hover:scale-110 group/btn"
        title="Favoritar"
      >
        <Star className="w-4 h-4 text-yellow-500 group-hover/btn:text-yellow-600 transition-colors" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate('/calendar');
        }}
        className="p-2.5 hover:bg-green-50 rounded-xl transition-all duration-200 relative z-20 hover:scale-110 group/btn"
        title="Ver Agenda"
      >
        <Video className="w-4 h-4 text-green-600 group-hover/btn:text-green-700 transition-colors" />
      </button>
    </div>
  );
};
