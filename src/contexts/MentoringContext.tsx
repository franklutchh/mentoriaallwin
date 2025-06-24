
import React, { createContext, useContext, ReactNode } from 'react';
import { Student, Mentoring, Call, ActionItem, FollowUpItem, WeeklyPriorities } from '../types/student';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface MentoringContextType {
  students: Student[];
  mentorias: Mentoring[];
  actionItems: ActionItem[];
  followUpItems: FollowUpItem[];
  loading: boolean;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  addMentoring: (mentoring: Omit<Mentoring, 'id'>) => Promise<void>;
  getDaysRemaining: (studentId: string) => number;
  getStudentMentorias: (studentId: string) => Mentoring[];
  getWeeklyPriorities: () => WeeklyPriorities;
  refetch: {
    students: () => Promise<void>;
    mentorias: () => Promise<void>;
    actionItems: () => Promise<void>;
    followUpItems: () => Promise<void>;
  };
}

const MentoringContext = createContext<MentoringContextType | undefined>(undefined);

export const MentoringProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    students,
    mentorias,
    actionItems,
    followUpItems,
    loading,
    addStudent,
    addMentoring,
    refetch,
  } = useSupabaseData();

  const getDaysRemaining = (studentId: string): number => {
    const student = students.find(s => s.id === studentId);
    if (!student || !student.dueDate) return 0;
    
    const dueDate = new Date(student.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  const getStudentMentorias = (studentId: string): Mentoring[] => {
    return mentorias.filter(mentoria => mentoria.studentId === studentId);
  };

  const getWeeklyPriorities = (): WeeklyPriorities => {
    const today = new Date();
    const tenDaysAgo = new Date(today.getTime() - (10 * 24 * 60 * 60 * 1000));
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));

    // Alunos com progresso baixo (< 50%)
    const lowProgress = students.filter(student => {
      if (student.status !== 'ativo' || !student.totalTasks) return false;
      const progressPercentage = (student.tasksCompleted! / student.totalTasks) * 100;
      return progressPercentage < 50;
    });

    // Alunos sem sessão recente (mais de 10 dias)
    const noRecentSession = students.filter(student => {
      if (student.status !== 'ativo') return false;
      const studentMentorias = getStudentMentorias(student.id);
      if (studentMentorias.length === 0) return true;
      
      const lastSession = studentMentorias
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      
      return new Date(lastSession.date) < tenDaysAgo;
    });

    // Alunos no último mês (próximo do vencimento)
    const lastMonth = students.filter(student => {
      if (student.status !== 'ativo' || !student.dueDate) return false;
      const dueDate = new Date(student.dueDate);
      return dueDate <= thirtyDaysFromNow && dueDate >= today;
    });

    // Alunos com problemas de pagamento
    const paymentIssues = students.filter(student => 
      student.status === 'ativo' && 
      ['pendente', 'atrasado', 'inadimplente'].includes(student.paymentStatus)
    );

    // Alunos com alto risco de churn
    const highChurnRisk = students.filter(student => 
      student.status === 'ativo' && student.churnRisk === 'alto'
    );

    return {
      lowProgress,
      noRecentSession,
      lastMonth,
      paymentIssues,
      highChurnRisk
    };
  };

  return (
    <MentoringContext.Provider value={{
      students,
      mentorias,
      actionItems,
      followUpItems,
      loading,
      addStudent,
      addMentoring,
      getDaysRemaining,
      getStudentMentorias,
      getWeeklyPriorities,
      refetch,
    }}>
      {children}
    </MentoringContext.Provider>
  );
};

export const useMentoringContext = () => {
  const context = useContext(MentoringContext);
  if (context === undefined) {
    throw new Error('useMentoringContext must be used within a MentoringProvider');
  }
  return context;
};
