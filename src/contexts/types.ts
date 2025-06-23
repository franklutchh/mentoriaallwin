
import { Student, Mentoring, ActionItem, FollowUpItem } from '../types/student';

export interface MentoringContextData {
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
