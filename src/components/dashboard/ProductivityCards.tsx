
import React from 'react';
import { Users, Calendar, AlertTriangle, Clock, Video, CalendarX } from 'lucide-react';

interface ProductivityCardsProps {
  totalStudents: number;
  activeStudents: number;
  totalSessions: number;
  completedSessions: number;
  pendingStudents: number;
  studentsWithDelayedTasks: number;
  weekSessions: number;
  pendingSessions: number;
}

export const ProductivityCards: React.FC<ProductivityCardsProps> = ({
  totalStudents,
  activeStudents,
  totalSessions,
  completedSessions,
  pendingStudents,
  studentsWithDelayedTasks,
  weekSessions,
  pendingSessions
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Total de Alunos</h3>
          <Users className="w-5 h-5 text-blue-500" />
        </div>
        <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
        <p className="text-sm text-gray-600 mt-1">{activeStudents} ativos</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Sessões da Semana</h3>
          <Video className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-green-600">{weekSessions}</p>
        <p className="text-sm text-gray-600 mt-1">Realizadas esta semana</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Sessões Pendentes</h3>
          <CalendarX className="w-5 h-5 text-purple-500" />
        </div>
        <p className="text-3xl font-bold text-purple-600">{pendingSessions}</p>
        <p className="text-sm text-gray-600 mt-1">Aguardando registro</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Sessões Realizadas</h3>
          <Calendar className="w-5 h-5 text-green-500" />
        </div>
        <p className="text-3xl font-bold text-green-600">{totalSessions}</p>
        <p className="text-sm text-gray-600 mt-1">{completedSessions} finalizadas</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Com Pendências</h3>
          <AlertTriangle className="w-5 h-5 text-orange-500" />
        </div>
        <p className="text-3xl font-bold text-orange-600">{pendingStudents}</p>
        <p className="text-sm text-gray-600 mt-1">Necessitam atenção</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Baixa Conclusão</h3>
          <Clock className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-3xl font-bold text-red-600">{studentsWithDelayedTasks}</p>
        <p className="text-sm text-gray-600 mt-1">Alunos com &lt; 70% conclusão</p>
      </div>
    </div>
  );
};
