
import React from 'react';
import { Plus, Star, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudentActionsProps {
  studentId: string;
}

export const StudentActions: React.FC<StudentActionsProps> = ({ studentId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-3 relative z-10">
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate('/mentoring/new', { state: { studentId } });
        }}
        className="p-2 hover:bg-blue-50 rounded-lg transition-colors relative z-20"
        title="Nova Sessão"
      >
        <Plus className="w-4 h-4 text-blue-600" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          // Toggle favorite logic would go here
        }}
        className="p-2 hover:bg-yellow-50 rounded-lg transition-colors relative z-20"
        title="Favoritar"
      >
        <Star className="w-4 h-4 text-yellow-600" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          navigate('/calendar');
        }}
        className="p-2 hover:bg-green-50 rounded-lg transition-colors relative z-20"
        title="Ver Agenda"
      >
        <Video className="w-4 h-4 text-green-600" />
      </button>
    </div>
  );
};
