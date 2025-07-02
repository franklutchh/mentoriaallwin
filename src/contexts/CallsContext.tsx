
import React, { createContext, useContext, ReactNode } from 'react';
import { Student, Call, ActionItem, FollowUpItem } from '../types/student';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { getDaysRemaining, getWeeklyPriorities } from '../utils/callsUtils';

interface CallsContextData {
  students: Student[];
  calls: Call[];
  actionItems: ActionItem[];
  followUpItems: FollowUpItem[];
  loading: boolean;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  addCall: (call: Omit<Call, 'id'>) => Promise<void>;
  getStudentCalls: (studentId: string) => Call[];
  getStudentActions: (studentId: string) => ActionItem[];
  getStudentFollowUps: (studentId: string) => FollowUpItem[];
  getDaysRemaining: (studentId: string) => number;
  getWeeklyPriorities: () => {
    lowProgress: Student[];
    noRecentSession: Student[];
    lastMonth: Student[];
  };
}

const CallsContext = createContext<CallsContextData | undefined>(undefined);

interface CallsProviderProps {
  children: ReactNode;
}

export const CallsProvider: React.FC<CallsProviderProps> = ({ children }) => {
  const {
    students,
    mentorias: calls,
    actionItems,
    followUpItems,
    loading,
    addStudent,
    addMentoring: addCall
  } = useSupabaseData();

  const getStudentCalls = (studentId: string) => {
    return calls.filter(c => c.studentId === studentId);
  };

  const getStudentActions = (studentId: string) => {
    return actionItems.filter(item => item.studentId === studentId);
  };

  const getStudentFollowUps = (studentId: string) => {
    return followUpItems.filter(item => item.studentId === studentId);
  };

  const getStudentDaysRemaining = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return 0;
    return getDaysRemaining(student);
  };

  const getStudentWeeklyPriorities = () => {
    return getWeeklyPriorities(students, calls);
  };

  return (
    <CallsContext.Provider value={{
      students,
      calls,
      actionItems,
      followUpItems,
      loading,
      addStudent,
      addCall,
      getStudentCalls,
      getStudentActions,
      getStudentFollowUps,
      getDaysRemaining: getStudentDaysRemaining,
      getWeeklyPriorities: getStudentWeeklyPriorities
    }}>
      {children}
    </CallsContext.Provider>
  );
};

export const useCallsContext = () => {
  const context = useContext(CallsContext);
  if (context === undefined) {
    throw new Error('useCallsContext must be used within a CallsProvider');
  }
  return context;
};
