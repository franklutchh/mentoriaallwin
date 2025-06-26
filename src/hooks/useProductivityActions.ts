
import { useMentoringContext } from '../contexts/MentoringContext';
import { Priority, Alert, Goal, ProductivityMetric } from '../types/productivity';

export const useProductivityActions = () => {
  const { students, mentorias, actionItems, followUpItems } = useMentoringContext();

  // Prioridades de hoje baseadas em dados reais
  const todaysPriorities: Priority[] = [];

  // Adicionar prioridades baseadas em alunos reais
  students.forEach(student => {
    if (student.status === 'ativo') {
      // Alunos com progresso baixo
      if (student.totalTasks && student.tasksCompleted) {
        const progress = (student.tasksCompleted / student.totalTasks) * 100;
        if (progress < 50) {
          todaysPriorities.push({
            id: `progress-${student.id}`,
            title: 'Acompanhar Progresso Baixo',
            description: `${student.name} está com ${progress.toFixed(0)}% de conclusão das tarefas`,
            level: 'alta',
            student: student.name,
            estimatedTime: '30 min',
            completed: false
          });
        }
      }

      // Alunos com pagamento em atraso
      if (student.paymentStatus !== 'em-dia') {
        todaysPriorities.push({
          id: `payment-${student.id}`,
          title: 'Resolver Pendência de Pagamento',
          description: `${student.name} está com status: ${student.paymentStatus}`,
          level: 'alta',
          student: student.name,
          estimatedTime: '15 min',
          completed: false
        });
      }
    }
  });

  // Alertas inteligentes baseados em dados reais
  const smartAlerts: Alert[] = [];

  // Alerta para alunos sem sessão recente
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  students.filter(s => s.status === 'ativo').forEach(student => {
    const studentSessions = mentorias.filter(m => m.studentId === student.id);
    const lastSession = studentSessions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    if (!lastSession || new Date(lastSession.date) < tenDaysAgo) {
      smartAlerts.push({
        id: `no-session-${student.id}`,
        type: 'student-delay',
        severity: 'media',
        title: 'Aluno sem sessão recente',
        message: `${student.name} não tem sessões há mais de 10 dias`,
        details: lastSession 
          ? `Última sessão: ${new Date(lastSession.date).toLocaleDateString('pt-BR')}`
          : 'Nenhuma sessão registrada'
      });
    }
  });

  // Follow-ups pendentes
  const pendingFollowUps = followUpItems.filter(item => !item.completed);
  if (pendingFollowUps.length > 0) {
    smartAlerts.push({
      id: 'pending-followups',
      type: 'missing-followup',
      severity: 'media',
      title: 'Follow-ups Pendentes',
      message: `${pendingFollowUps.length} follow-ups aguardando conclusão`,
      details: 'Revise e atualize o status dos acompanhamentos'
    });
  }

  // Metas semanais baseadas em dados reais
  const weeklyGoals: Goal[] = [
    {
      id: 'weekly-sessions',
      title: 'Sessões Semanais',
      description: 'Meta de sessões para esta semana',
      current: mentorias.filter(m => {
        const sessionDate = new Date(m.date);
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        return sessionDate >= startOfWeek;
      }).length,
      target: Math.max(students.filter(s => s.status === 'ativo').length, 10),
      unit: 'sessões',
      daysLeft: 7 - new Date().getDay()
    },
    {
      id: 'followup-completion',
      title: 'Conclusão de Follow-ups',
      description: 'Follow-ups concluídos esta semana',
      current: followUpItems.filter(item => {
        if (!item.completed) return false;
        const createdDate = new Date(item.createdAt);
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        return createdDate >= startOfWeek;
      }).length,
      target: Math.max(followUpItems.length, 5),
      unit: 'follow-ups',
      daysLeft: 7 - new Date().getDay()
    }
  ];

  // Métricas de produtividade baseadas em dados reais
  const productivityMetrics: ProductivityMetric[] = [
    {
      id: 'total-students',
      type: 'students',
      label: 'Total de Alunos',
      value: students.length.toString(),
      change: '+0%', // TODO: Calcular mudança real
      trend: 'stable',
      period: 'Total'
    },
    {
      id: 'active-students',
      type: 'students',
      label: 'Alunos Ativos',
      value: students.filter(s => s.status === 'ativo').length.toString(),
      change: '+0%', // TODO: Calcular mudança real
      trend: 'stable',
      period: 'Atual'
    },
    {
      id: 'total-sessions',
      type: 'calls',
      label: 'Sessões Realizadas',
      value: mentorias.length.toString(),
      change: '+0%', // TODO: Calcular mudança real
      trend: 'stable',
      period: 'Total'
    }
  ];

  return {
    todaysPriorities,
    smartAlerts,
    weeklyGoals,
    productivityMetrics
  };
};
