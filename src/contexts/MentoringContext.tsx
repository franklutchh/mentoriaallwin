
import React, { createContext, useContext, ReactNode } from 'react';
import { Student, Mentoring, Call, ActionItem, FollowUpItem } from '../types/student';
import { useSupabaseData } from '@/hooks/useSupabaseData';

interface MentoringContextType {
  students: Student[];
  mentorias: Mentoring[];
  actionItems: ActionItem[];
  followUpItems: FollowUpItem[];
  loading: boolean;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  getDaysRemaining: (studentId: string) => number;
  getStudentMentorias: (studentId: string) => Mentoring[];
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

  return (
    <MentoringContext.Provider value={{
      students,
      mentorias,
      actionItems,
      followUpItems,
      loading,
      addStudent,
      getDaysRemaining,
      getStudentMentorias,
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
