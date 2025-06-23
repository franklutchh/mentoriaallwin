
import { useMemo } from 'react';
import { useCallsContext } from '../contexts/CallsContext';
import { PriorityAction, SmartAlert, WeeklyGoal, ProductivityMetrics } from '../types/productivity';

export const useProductivityActions = () => {
  const { students, calls, getStudentCalls } = useCallsContext();

  const todaysPriorities = useMemo((): PriorityAction[] => {
    const today = new Date();
    const eightDaysAgo = new Date(today.getTime() - (8 * 24 * 60 * 60 * 1000));
    const priorities: PriorityAction[] = [];

    // Alunos sem calls recentes (8 dias)
    students.forEach(student => {
      if (student.status !== 'ativo') return;
      
      const studentCalls = getStudentCalls(student.id);
      const lastCall = studentCalls
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      
      if (!lastCall || new Date(lastCall.date) < eightDaysAgo) {
        priorities.push({
          id: `no-call-${student.id}`,
          title: `Agendar call com ${student.name}`,
          description: lastCall 
            ? `Última call foi há ${Math.floor((today.getTime() - new Date(lastCall.date).getTime()) / (24 * 60 * 60 * 1000))} dias`
            : 'Nenhuma call registrada ainda',
          type: 'call',
          studentId: student.id,
          studentName: student.name,
          urgency: !lastCall ? 'critical' : 'high',
          estimatedTime: 60,
          actionUrl: `/calls/new?studentId=${student.id}`
        });
      }
    });

    // Alunos com baixo progresso
    students.forEach(student => {
      if (student.status !== 'ativo' || !student.totalTasks) return;
      
      const progressPercentage = (student.tasksCompleted! / student.totalTasks) * 100;
      if (progressPercentage < 50) {
        priorities.push({
          id: `low-progress-${student.id}`,
          title: `Revisar progresso com ${student.name}`,
          description: `Apenas ${Math.round(progressPercentage)}% das tarefas concluídas`,
          type: 'review',
          studentId: student.id,
          studentName: student.name,
          urgency: progressPercentage < 25 ? 'critical' : 'high',
          estimatedTime: 30,
          actionUrl: `/students/${student.id}?tab=plano`
        });
      }
    });

    // Calls que precisam de follow-up
    calls.forEach(call => {
      if (call.status === 'completa') {
        const callDate = new Date(call.date);
        const daysSinceCall = Math.floor((today.getTime() - callDate.getTime()) / (24 * 60 * 60 * 1000));
        
        if (daysSinceCall >= 3 && daysSinceCall <= 7) {
          const student = students.find(s => s.id === call.studentId);
          if (student) {
            priorities.push({
              id: `follow-up-${call.id}`,
              title: `Follow-up da call com ${student.name}`,
              description: `Verificar progresso em: ${call.actions}`,
              type: 'follow-up',
              studentId: student.id,
              studentName: student.name,
              urgency: 'medium',
              estimatedTime: 15,
              actionUrl: `/students/${student.id}?tab=follow-up`
            });
          }
        }
      }
    });

    return priorities
      .sort((a, b) => {
        const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      })
      .slice(0, 8);
  }, [students, calls, getStudentCalls]);

  const smartAlerts = useMemo((): SmartAlert[] => {
    const alerts: SmartAlert[] = [];
    const today = new Date();

    // Alunos críticos sem contato há 8 dias
    students.forEach(student => {
      if (student.status !== 'ativo') return;
      
      const studentCalls = getStudentCalls(student.id);
      const lastCall = studentCalls
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      
      if (!lastCall) {
        alerts.push({
          id: `critical-${student.id}`,
          title: 'Aluno Sem Calls Registradas',
          message: `${student.name} não possui nenhuma call registrada ainda`,
          type: 'error',
          studentId: student.id,
          actionRequired: true,
          quickActions: [
            {
              id: 'schedule-call',
              label: 'Agendar Call',
              icon: 'Calendar',
              action: () => window.location.href = `/calls/new?studentId=${student.id}`
            }
          ]
        });
      } else {
        const daysSinceCall = Math.floor((today.getTime() - new Date(lastCall.date).getTime()) / (24 * 60 * 60 * 1000));
        if (daysSinceCall >= 8) {
          alerts.push({
            id: `overdue-${student.id}`,
            title: 'Contato com Aluno em Atraso',
            message: `${student.name} não tem uma call há ${daysSinceCall} dias`,
            type: 'warning',
            studentId: student.id,
            actionRequired: true,
            daysOverdue: daysSinceCall,
            quickActions: [
              {
                id: 'urgent-call',
                label: 'Agendar Call Urgente',
                icon: 'Phone',
                action: () => window.location.href = `/calls/new?studentId=${student.id}&urgent=true`
              }
            ]
          });
        }
      }
    });

    return alerts.slice(0, 5);
  }, [students, calls, getStudentCalls]);

  const weeklyGoals = useMemo((): WeeklyGoal[] => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    
    const weekCalls = calls.filter(call => {
      const callDate = new Date(call.date);
      return callDate >= startOfWeek && callDate <= endOfWeek && call.status === 'completa';
    });

    return [
      {
        id: 'weekly-calls',
        title: 'Calls Semanais',
        target: 15,
        current: weekCalls.length,
        unit: 'calls',
        deadline: endOfWeek.toISOString(),
        progress: Math.min((weekCalls.length / 15) * 100, 100)
      },
      {
        id: 'follow-ups',
        title: 'Follow-ups Concluídos',
        target: 10,
        current: 7,
        unit: 'follow-ups',
        deadline: endOfWeek.toISOString(),
        progress: 70
      },
      {
        id: 'student-progress',
        title: 'Alunos no Cronograma',
        target: students.filter(s => s.status === 'ativo').length,
        current: students.filter(s => s.status === 'ativo' && (s.tasksCompleted! / s.totalTasks!) > 0.7).length,
        unit: 'alunos',
        deadline: endOfWeek.toISOString(),
        progress: Math.round((students.filter(s => s.status === 'ativo' && (s.tasksCompleted! / s.totalTasks!) > 0.7).length / students.filter(s => s.status === 'ativo').length) * 100)
      }
    ];
  }, [students, calls]);

  const productivityMetrics = useMemo((): ProductivityMetrics => {
    const today = new Date().toISOString().split('T')[0];
    const todaysCalls = calls.filter(call => call.date === today && call.status === 'completa').length;
    
    const pendingFollowUps = calls.filter(call => {
      if (call.status !== 'completa') return false;
      const callDate = new Date(call.date);
      const daysSince = Math.floor((new Date().getTime() - callDate.getTime()) / (24 * 60 * 60 * 1000));
      return daysSince >= 3 && daysSince <= 7;
    }).length;

    const studentsNeedingAttention = students.filter(student => {
      if (student.status !== 'ativo') return false;
      const studentCalls = getStudentCalls(student.id);
      const lastCall = studentCalls[studentCalls.length - 1];
      
      if (!lastCall) return true;
      
      const daysSinceCall = Math.floor((new Date().getTime() - new Date(lastCall.date).getTime()) / (24 * 60 * 60 * 1000));
      return daysSinceCall >= 8; // Mudado para 8 dias
    }).length;

    return {
      todaysCalls,
      pendingFollowUps,
      studentsNeedingAttention,
      weeklyProgress: weeklyGoals[0]?.progress || 0,
      avgResponseTime: 2.5
    };
  }, [students, calls, getStudentCalls, weeklyGoals]);

  return {
    todaysPriorities,
    smartAlerts,
    weeklyGoals,
    productivityMetrics
  };
};
