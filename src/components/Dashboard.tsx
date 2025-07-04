
import React from 'react';
import { ActionDashboard } from './dashboard/ActionDashboard';
import { ProductivityCards } from './dashboard/ProductivityCards';
import { FinancialMetricsComponent } from './dashboard/FinancialMetrics';
import { GamificationDashboard } from './dashboard/GamificationDashboard';
import { useMentoringContext } from '../contexts/MentoringContext';
import { FinancialMetrics } from '../types/student';

export const Dashboard: React.FC = () => {
  const { students, mentorias, loading } = useMentoringContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Calcular métricas reais
  const activeStudents = students.filter(s => s.status === 'ativo').length;
  const totalStudents = students.length;
  const totalSessions = mentorias.length;
  const completedSessions = mentorias.filter(m => m.status === 'completa').length;
  const pendingStudents = students.filter(s => s.status === 'com-pendencia').length;
  const studentsWithDelayedTasks = students.filter(s => {
    if (!s.totalTasks) return false;
    const progressPercentage = (s.tasksCompleted! / s.totalTasks) * 100;
    return progressPercentage < 70;
  }).length;

  // Sessões da semana atual
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const weekSessions = mentorias.filter(m => {
    const sessionDate = new Date(m.date);
    return sessionDate >= startOfWeek;
  }).length;

  const pendingSessions = mentorias.filter(m => 
    m.status === 'agendada' || m.status === 'em-andamento'
  ).length;

  // Métricas financeiras reais
  const financialMetrics: FinancialMetrics = {
    totalRevenue: students.reduce((sum, student) => sum + (student.lifetimeValue || 0), 0),
    monthlyRevenue: students
      .filter(s => s.status === 'ativo')
      .reduce((sum, student) => sum + student.monthlyValue, 0),
    averageTicket: activeStudents > 0 ? 
      students
        .filter(s => s.status === 'ativo')
        .reduce((sum, student) => sum + student.monthlyValue, 0) / activeStudents : 0,
    churnRate: totalStudents > 0 ? 
      (students.filter(s => s.status === 'finalizado').length / totalStudents) * 100 : 0,
    paymentDelayRate: activeStudents > 0 ? 
      (students.filter(s => s.paymentStatus !== 'em-dia' && s.status === 'ativo').length / activeStudents) * 100 : 0,
    lifetimeValue: students.length > 0 ? 
      students.reduce((sum, student) => sum + (student.lifetimeValue || 0), 0) / students.length : 0
  };

  return (
    <div className="w-full h-full transition-colors duration-300">
      <div className="w-full h-full">
        {/* Cards de Produtividade */}
        <ProductivityCards
          totalStudents={totalStudents}
          activeStudents={activeStudents}
          totalSessions={totalSessions}
          completedSessions={completedSessions}
          pendingStudents={pendingStudents}
          studentsWithDelayedTasks={studentsWithDelayedTasks}
          weekSessions={weekSessions}
          pendingSessions={pendingSessions}
        />

        {/* Métricas Financeiras - só mostra se há alunos ativos */}
        {activeStudents > 0 && (
          <FinancialMetricsComponent metrics={financialMetrics} />
        )}

        {/* Dashboard de Gamificação - só mostra se há alunos */}
        {students.length > 0 && (
          <GamificationDashboard students={students} />
        )}

        {/* Estado vazio quando não há alunos */}
        {students.length === 0 && (
          <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100/50 dark:border-gray-700/50">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Bem-vindo ao Sistema de Mentoria
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto text-sm">
              Comece adicionando seu primeiro aluno para ver métricas, sessões e acompanhar o progresso.
            </p>
            <button
              onClick={() => window.location.href = '/students'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-md"
            >
              Adicionar Primeiro Aluno
            </button>
          </div>
        )}

        {/* Dashboard de Ações */}
        <ActionDashboard />
      </div>
    </div>
  );
};
