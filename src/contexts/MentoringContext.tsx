
import React, { createContext, useState, ReactNode } from 'react';
import { Student, Mentoring, ActionItem, FollowUpItem } from '../types/student';
import { MentoringContextData } from './types';
import { mockStudents, mockMentorias, mockActionItems, mockFollowUpItems } from './mockData';
import { getDaysRemaining, getWeeklyPriorities } from './mentoringUtils';

export const MentoringContext = createContext<MentoringContextData | undefined>(undefined);

interface MentoringProviderProps {
  children: ReactNode;
}

export const MentoringProvider: React.FC<MentoringProviderProps> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [mentorias, setMentorias] = useState<Mentoring[]>(mockMentorias);
  const [actionItems, setActionItems] = useState<Record<string, ActionItem[]>>(mockActionItems);
  const [followUpItems, setFollowUpItems] = useState<Record<string, FollowUpItem[]>>(mockFollowUpItems);

  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, ...updates } : student
    ));
  };

  const addMentoring = (mentoring: Mentoring) => {
    setMentorias(prev => [...prev, mentoring]);
  };

  const updateMentoring = (id: string, updates: Partial<Mentoring>) => {
    setMentorias(prev => prev.map(mentoring => 
      mentoring.id === id ? { ...mentoring, ...updates } : mentoring
    ));
  };

  const addActionItem = (studentId: string, item: ActionItem) => {
    setActionItems(prev => ({
      ...prev,
      [studentId]: [...(prev[studentId] || []), item]
    }));
  };

  const updateActionItem = (studentId: string, itemId: string, updates: Partial<ActionItem>) => {
    setActionItems(prev => ({
      ...prev,
      [studentId]: (prev[studentId] || []).map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
  };

  const addFollowUpItem = (studentId: string, item: FollowUpItem) => {
    setFollowUpItems(prev => ({
      ...prev,
      [studentId]: [...(prev[studentId] || []), item]
    }));
  };

  const updateFollowUpItem = (studentId: string, itemId: string, updates: Partial<FollowUpItem>) => {
    setFollowUpItems(prev => ({
      ...prev,
      [studentId]: (prev[studentId] || []).map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
  };

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
    return student ? getDaysRemaining(student) : 0;
  };

  const getWeeklyPrioritiesData = () => {
    return getWeeklyPriorities(students, getStudentMentorias);
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
      getWeeklyPriorities: getWeeklyPrioritiesData
    }}>
      {children}
    </MentoringContext.Provider>
  );
};
