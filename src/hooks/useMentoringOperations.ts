
import { useState } from 'react';
import { Student, Mentoring, ActionItem, FollowUpItem } from '../types/student';
import { mockStudents, mockMentorias, mockActionItems, mockFollowUpItems } from '../data/mockData';

export const useMentoringOperations = () => {
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

  return {
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
  };
};
