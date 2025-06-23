
import React, { createContext, useContext, ReactNode } from 'react';
import { Student, Mentoring, ActionItem, FollowUpItem } from '../types/student';
import { useMentoringOperations } from '../hooks/useMentoringOperations';
import { getDaysRemaining, getWeeklyPriorities } from '../utils/mentoringUtils';

interface MentoringContextData {
  students: Student[];
  mentorias: Mentoring[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  addMentoring: (mentoring: Mentoring) => void;
  updateMentoring: (id: string, updates: Partial<Mentoring>) => void;
  addActionItem: (studentId: string, item: ActionItem) => void;
  updateActionItem: (studentId: string, itemId: string, updates: Partial<ActionItem>) => void;
  addFollowUpItem: (studentId: string, item: FollowUpItem) => void;
  updateFollowUpItem: (studentId: string, itemId: string, updates: Partial<FollowUpItem>) => void;
  getStudentMentorias: (studentId: string) => Mentoring[];
  getStudentActions: (studentId: string) => ActionItem[];
  getStudentFollowUps: (studentId: string) => FollowUpItem[];
  getDaysRemaining: (studentId: string) => number;
  getWeeklyPriorities: () => {
    lowProgress: Student[];
    noRecentSession: Student[];
    lastMonth: Student[];
  };
}

const MentoringContext = createContext<MentoringContextData | undefined>(undefined);

interface MentoringProviderProps {
  children: ReactNode;
}

export const MentoringProvider: React.FC<MentoringProviderProps> = ({ children }) => {
  const {
    students,
    mentorias,
    actionItems,
    followUpItems,
    addStudent,
    updateStudent,
    addMentoring,
    updateMentoring,
    addActionItem,
    updateActionItem,
    addFollowUpItem,
    updateFollowUpItem
  } = useMentoringOperations();

  const getStudentMentorias = (studentId: string) => {
    return mentorias.filter(m => m.studentId === studentId);
  };

  const getStudentActions = (studentId: string) => {
    return actionItems[studentId] || [];
  };

  const getStudentFollowUps = (studentId: string) => {
    return followUpItems[studentId] || [];
  };

  const getStudentDaysRemaining = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return 0;
    return getDaysRemaining(student);
  };

  const getStudentWeeklyPriorities = () => {
    return getWeeklyPriorities(students, mentorias);
  };

  return (
    <MentoringContext.Provider value={{
      students,
      mentorias,
      addStudent,
      updateStudent,
      addMentoring,
      updateMentoring,
      addActionItem,
      updateActionItem,
      addFollowUpItem,
      updateFollowUpItem,
      getStudentMentorias,
      getStudentActions,
      getStudentFollowUps,
      getDaysRemaining: getStudentDaysRemaining,
      getWeeklyPriorities: getStudentWeeklyPriorities
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
