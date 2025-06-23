
import React from 'react';
import { User, Calendar, MessageCircle, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  whatsapp: string;
  instagram: string;
  status: 'ativo' | 'inativo';
  entryDate: string;
  lastSession?: string;
}

interface StudentCardProps {
  student: Student;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{student.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium ${
                  student.status === 'ativo'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {student.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MessageCircle className="w-4 h-4" />
          <span>{student.whatsapp}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Instagram className="w-4 h-4" />
          <span>{student.instagram}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Entrada: {formatDate(student.entryDate)}</span>
        </div>
        {student.lastSession && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Última sessão: {formatDate(student.lastSession)}</span>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate(`/students/${student.id}`)}
        className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg transition-colors font-medium"
      >
        Ver Detalhes
      </button>
    </div>
  );
};
