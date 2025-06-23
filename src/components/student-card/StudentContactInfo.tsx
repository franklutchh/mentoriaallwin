
import React from 'react';
import { MessageCircle, Instagram, Calendar, Target } from 'lucide-react';

interface StudentContactInfoProps {
  whatsapp: string;
  instagram: string;
  entryDate: string;
  lastMentoriaDate?: string;
}

export const StudentContactInfo: React.FC<StudentContactInfoProps> = ({ 
  whatsapp, 
  instagram, 
  entryDate, 
  lastMentoriaDate 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-2 mb-4">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MessageCircle className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{whatsapp}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Instagram className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{instagram}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar className="w-4 h-4 flex-shrink-0" />
        <span>Entrada: {formatDate(entryDate)}</span>
      </div>
      {lastMentoriaDate && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Target className="w-4 h-4 flex-shrink-0" />
          <span>Última sessão: {formatDate(lastMentoriaDate)}</span>
        </div>
      )}
    </div>
  );
};
