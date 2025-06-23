
import React from 'react';
import { User, Star, Clock } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  status: 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia' | 'finalizado';
  group?: string;
  favorite?: boolean;
}

interface StudentHeaderProps {
  student: Student;
  daysRemaining: number;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ student, daysRemaining }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'ativo':
        return { color: 'bg-green-100 text-green-800', label: 'Ativo' };
      case 'inativo':
        return { color: 'bg-gray-100 text-gray-800', label: 'Inativo' };
      case 'sob-revisao':
        return { color: 'bg-yellow-100 text-yellow-800', label: 'Sob Revisão' };
      case 'com-pendencia':
        return { color: 'bg-red-100 text-red-800', label: 'Com Pendência' };
      case 'finalizado':
        return { color: 'bg-purple-100 text-purple-800', label: 'Finalizado' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: status };
    }
  };

  const statusConfig = getStatusConfig(student.status);

  return (
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
        <User className="w-6 h-6 text-blue-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 truncate">{student.name}</h3>
          {student.favorite && (
            <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
          {student.group && (
            <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700 font-medium">
              {student.group}
            </span>
          )}
        </div>
        
        {/* Days Remaining */}
        {student.status === 'ativo' && (
          <div className="flex items-center gap-1 mt-2">
            <Clock className="w-3 h-3 text-gray-500 flex-shrink-0" />
            <span className={`text-xs font-medium ${
              daysRemaining <= 30 ? 'text-red-600' : 
              daysRemaining <= 60 ? 'text-orange-600' : 'text-gray-600'
            }`}>
              {daysRemaining} dias restantes
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
