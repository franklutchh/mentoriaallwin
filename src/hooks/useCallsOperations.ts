
import { useState } from 'react';
import { Student, Call, ActionItem, FollowUpItem } from '../types/student';
import { mockStudents, mockMentorias, mockActionItems, mockFollowUpItems } from '../data/mockData';

export const useCallsOperations = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [calls, setCalls] = useState<Call[]>(mockMentorias.map(m => ({ ...m } as Call)));
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

  const addCall = (call: Call) => {
    setCalls(prev => [...prev, call]);
  };

  const updateCall = (id: string, updates: Partial<Call>) => {
    setCalls(prev => prev.map(call => 
      call.id === id ? { ...call, ...updates } : call
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

  return {
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
  };
};
