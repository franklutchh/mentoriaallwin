
import React from 'react';
import { WeeklyPriorities } from './WeeklyPriorities';
import { ProductivityCards } from './dashboard/ProductivityCards';
import { PerformanceSummary } from './dashboard/PerformanceSummary';
import { useMentoringContext } from '../contexts/MentoringContext';

export const Dashboard: React.FC = () => {
  const { students, mentorias } = useMentoringContext();

  const activeStudents = students.filter(s => s.status === 'ativo').length;
  const totalStudents = students.length;
  const pendingStudents = students.filter(s => s.status === 'com-pendencia').length;
  const studentsWithDelayedTasks = students.filter(s => s.tasksCompleted! < s.totalTasks! * 0.7).length;
  const totalSessions = mentorias.length;
  const completedSessions = mentorias.filter(m => m.status === 'completa').length;
  const trafficSessions = mentorias.filter(m => m.tags.includes('trafego')).length;

  // Calcular sessões da semana atual
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
  
  const weekSessions = mentorias.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
  });

  const pendingSessions = mentorias.filter(m => m.status === 'agendada').length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Produtividade</h1>
        <p className="text-gray-600">Visão estratégica da operação de mentoria</p>
      </div>

      <ProductivityCards
        totalStudents={totalStudents}
        activeStudents={activeStudents}
        totalSessions={totalSessions}
        completedSessions={completedSessions}
        pendingStudents={pendingStudents}
        studentsWithDelayedTasks={studentsWithDelayedTasks}
        weekSessions={weekSessions.length}
        pendingSessions={pendingSessions}
      />

      <WeeklyPriorities />

      <PerformanceSummary
        activeStudents={activeStudents}
        totalStudents={totalStudents}
        completedSessions={completedSessions}
        totalSessions={totalSessions}
        trafficSessions={trafficSessions}
      />
    </div>
  );
};
