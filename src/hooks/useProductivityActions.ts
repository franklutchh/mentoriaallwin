import { useMemo } from 'react';
import { useCallsContext } from '../contexts/CallsContext';
import { PriorityAction, SmartAlert, WeeklyGoal, ProductivityMetrics, Priority, Alert, Goal, ProductivityMetric } from '../types/productivity';

export const useProductivityActions = () => {
  const { students, calls, getStudentCalls } = useCallsContext();

  const todaysPriorities = useMemo((): Priority[] => {
    const today = new Date();
    const eightDaysAgo = new Date(today.getTime() - (8 * 24 * 60 * 60 * 1000));
    const priorities: Priority[] = [];

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
          level: !lastCall ? 'alta' : 'media',
          student: student.name,
          estimatedTime: '60 min'
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
          level: progressPercentage < 25 ? 'alta' : 'media',
          student: student.name,
          estimatedTime: '30 min'
        });
      }
    });

    return priorities
      .sort((a, b) => {
        const levelOrder = { alta: 3, media: 2, baixa: 1 };
        return levelOrder[b.level] - levelOrder[a.level];
      })
      .slice(0, 8);
  }, [students, calls, getStudentCalls]);

  const smartAlerts = useMemo((): Alert[] => {
    const alerts: Alert[] = [];
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
          details: 'Contato imediato necessário',
          type: 'urgent',
          severity: 'alta'
        });
      } else {
        const daysSinceCall = Math.floor((today.getTime() - new Date(lastCall.date).getTime()) / (24 * 60 * 60 * 1000));
        if (daysSinceCall >= 8) {
          alerts.push({
            id: `overdue-${student.id}`,
            title: 'Contato com Aluno em Atraso',
            message: `${student.name} não tem uma call há ${daysSinceCall} dias`,
            details: 'Agendar call urgente',
            type: 'student-delay',
            severity: 'alta'
          });
        }
      }
    });

    return alerts.slice(0, 5);
  }, [students, calls, getStudentCalls]);

  const weeklyGoals = useMemo((): Goal[] => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    
    const weekCalls = calls.filter(call => {
      const callDate = new Date(call.date);
      return callDate >= startOfWeek && callDate <= endOfWeek && call.status === 'completa';
    });

    const daysLeft = Math.ceil((endOfWeek.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000));

    return [
      {
        id: 'weekly-calls',
        title: 'Calls Semanais',
        description: 'Meta de calls da semana',
        target: 15,
        current: weekCalls.length,
        unit: 'calls',
        daysLeft
      },
      {
        id: 'follow-ups',
        title: 'Follow-ups Concluídos',
        description: 'Acompanhamentos realizados',
        target: 10,
        current: 7,
        unit: 'follow-ups',
        daysLeft
      },
      {
        id: 'student-progress',
        title: 'Alunos no Cronograma',
        description: 'Alunos com progresso adequado',
        target: students.filter(s => s.status === 'ativo').length,
        current: students.filter(s => s.status === 'ativo' && (s.tasksCompleted! / s.totalTasks!) > 0.7).length,
        unit: 'alunos',
        daysLeft
      }
    ];
  }, [students, calls]);

  const productivityMetrics = useMemo((): ProductivityMetric[] => {
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
      return daysSinceCall >= 8;
    }).length;

    return [
      {
        id: 'todays-calls',
        label: 'Calls Hoje',
        value: todaysCalls.toString(),
        change: '+12%',
        trend: 'up',
        type: 'calls',
        period: 'hoje'
      },
      {
        id: 'pending-followups',
        label: 'Follow-ups Pendentes',
        value: pendingFollowUps.toString(),
        change: '-5%',
        trend: 'down',
        type: 'general',
        period: 'esta semana'
      },
      {
        id: 'students-attention',
        label: 'Alunos Precisando Atenção',
        value: studentsNeedingAttention.toString(),
        change: 'estável',
        trend: 'stable',
        type: 'students',
        period: 'atual'
      }
    ];
  }, [students, calls, getStudentCalls]);

  return {
    todaysPriorities,
    smartAlerts,
    weeklyGoals,
    productivityMetrics
  };
};
