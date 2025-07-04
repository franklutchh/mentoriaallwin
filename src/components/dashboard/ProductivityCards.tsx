
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-1 mb-1">
      <div className="bg-card rounded-md shadow-sm border p-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-medium text-muted-foreground">Total de Alunos</h3>
          <Users className="w-4 h-4 text-primary" />
        </div>
        <p className="text-lg font-bold text-foreground">{totalStudents}</p>
        <p className="text-xs text-muted-foreground">{activeStudents} ativos</p>
      </div>

      <div className="bg-card rounded-md shadow-sm border p-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-medium text-muted-foreground">Sessões da Semana</h3>
          <Video className="w-4 h-4 text-green-600" />
        </div>
        <p className="text-lg font-bold text-green-600">{weekSessions}</p>
        <p className="text-xs text-muted-foreground">Realizadas esta semana</p>
      </div>

      <div className="bg-card rounded-md shadow-sm border p-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-medium text-muted-foreground">Sessões Pendentes</h3>
          <CalendarX className="w-4 h-4 text-purple-600" />
        </div>
        <p className="text-lg font-bold text-purple-600">{pendingSessions}</p>
        <p className="text-xs text-muted-foreground">Aguardando registro</p>
      </div>

      <div className="bg-card rounded-md shadow-sm border p-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-medium text-muted-foreground">Sessões Realizadas</h3>
          <Calendar className="w-4 h-4 text-green-600" />
        </div>
        <p className="text-lg font-bold text-green-600">{totalSessions}</p>
        <p className="text-xs text-muted-foreground">{completedSessions} finalizadas</p>
      </div>

      <div className="bg-card rounded-md shadow-sm border p-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-medium text-muted-foreground">Com Pendências</h3>
          <AlertTriangle className="w-4 h-4 text-orange-600" />
        </div>
        <p className="text-lg font-bold text-orange-600">{pendingStudents}</p>
        <p className="text-xs text-muted-foreground">Necessitam atenção</p>
      </div>

      <div className="bg-card rounded-md shadow-sm border p-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xs font-medium text-muted-foreground">Baixa Conclusão</h3>
          <Clock className="w-4 h-4 text-red-600" />
        </div>
        <p className="text-lg font-bold text-red-600">{studentsWithDelayedTasks}</p>
        <p className="text-xs text-muted-foreground">Alunos com &lt; 70% conclusão</p>
      </div>
    </div>
  );
};
