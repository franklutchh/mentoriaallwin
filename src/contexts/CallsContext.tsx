
import React, { createContext, useContext, ReactNode } from 'react';
import { Student, Call, ActionItem, FollowUpItem } from '../types/student';
import { useCallsOperations } from '../hooks/useCallsOperations';
import { getDaysRemaining, getWeeklyPriorities } from '../utils/callsUtils';

interface CallsContextData {
  students: Student[];
  calls: Call[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  addCall: (call: Call) => void;
  updateCall: (id: string, updates: Partial<Call>) => void;
  addActionItem: (studentId: string, item: ActionItem) => void;
  updateActionItem: (studentId: string, itemId: string, updates: Partial<ActionItem>) => void;
  addFollowUpItem: (studentId: string, item: FollowUpItem) => void;
  updateFollowUpItem: (studentId: string, itemId: string, updates: Partial<FollowUpItem>) => void;
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
    calls,
    actionItems,
    followUpItems,
    addStudent,
    updateStudent,
    addCall,
    updateCall,
    addActionItem,
    updateActionItem,
    addFollowUpItem,
    updateFollowUpItem
  } = useCallsOperations();

  const getStudentCalls = (studentId: string) => {
    return calls.filter(c => c.studentId === studentId);
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
    return getWeeklyPriorities(students, calls);
  };

  return (
    <CallsContext.Provider value={{
      students,
      calls,
      addStudent,
      updateStudent,
      addCall,
      updateCall,
      addActionItem,
      updateActionItem,
      addFollowUpItem,
      updateFollowUpItem,
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
