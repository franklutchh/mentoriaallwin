import React from 'react';
import { User, Calendar, MessageCircle, Instagram, Plus, Star, Video, Target, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMentoringContext } from '../contexts/useMentoringContext';

interface Student {
  id: string;
  name: string;
  whatsapp: string;
  instagram: string;
  status: 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia' | 'finalizado';
  entryDate: string;
  lastSession?: string;
  group?: string;
  tags?: string[];
  tasksCompleted?: number;
  totalTasks?: number;
  favorite?: boolean;
}

interface StudentCardProps {
  student: Student;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const navigate = useNavigate();
  const { getDaysRemaining, getStudentMentorias } = useMentoringContext();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

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
  const progressPercentage = student.totalTasks ? Math.round((student.tasksCompleted! / student.totalTasks) * 100) : 0;
  const daysRemaining = getDaysRemaining(student.id);
  const studentMentorias = getStudentMentorias(student.id);
  const lastMentoria = studentMentorias.length > 0 
    ? studentMentorias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
      {/* Header with favorite and actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{student.name}</h3>
              {student.favorite && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
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
                <Clock className="w-3 h-3 text-gray-500" />
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

        {/* Quick Actions */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/mentoring/new', { state: { studentId: student.id } });
            }}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
            title="Nova Sessão"
          >
            <Plus className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Toggle favorite logic would go here
            }}
            className="p-2 hover:bg-yellow-50 rounded-lg transition-colors"
            title="Favoritar"
          >
            <Star className="w-4 h-4 text-yellow-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/calendar');
            }}
            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
            title="Ver Agenda"
          >
            <Video className="w-4 h-4 text-green-600" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      {student.totalTasks && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Progresso do Plano</span>
            <span className="font-medium text-gray-900">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                progressPercentage >= 80 ? 'bg-green-500' : 
                progressPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {student.tasksCompleted}/{student.totalTasks} tarefas concluídas
          </p>
        </div>
      )}

      {/* Tags */}
      {student.tags && student.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {student.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700 font-medium"
            >
              {tag}
            </span>
          ))}
          {student.tags.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-500">
              +{student.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MessageCircle className="w-4 h-4" />
          <span className="truncate">{student.whatsapp}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Instagram className="w-4 h-4" />
          <span className="truncate">{student.instagram}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Entrada: {formatDate(student.entryDate)}</span>
        </div>
        {lastMentoria && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="w-4 h-4" />
            <span>Última sessão: {formatDate(lastMentoria.date)}</span>
          </div>
        )}
      </div>

      {/* Session Stats */}
      <div className="flex items-center gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
        <TrendingUp className="w-4 h-4 text-blue-500" />
        <span className="text-sm text-gray-700 flex-1">
          {studentMentorias.length} sessões realizadas
        </span>
        <span className="text-xs text-gray-500">
          {progressPercentage >= 80 ? 'Excelente' : progressPercentage >= 60 ? 'Boa' : 'Atenção'}
        </span>
      </div>

      <button
        onClick={() => navigate(`/students/${student.id}`)}
        className="w-full bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 py-2 px-4 rounded-lg transition-colors font-medium border border-transparent hover:border-blue-200"
      >
        Ver Detalhes Completos
      </button>
    </div>
  );
};
