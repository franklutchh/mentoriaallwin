
import { Student, Mentoring } from '../types/student';

export const getDaysRemaining = (student: Student): number => {
  const entryDate = new Date(student.entryDate);
  const endDate = new Date(entryDate);
  endDate.setMonth(endDate.getMonth() + 3);
  
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
};

export const getWeeklyPriorities = (
  students: Student[], 
  getStudentMentorias: (studentId: string) => Mentoring[]
) => {
  const today = new Date();
  const tenDaysAgo = new Date(today.getTime() - (10 * 24 * 60 * 60 * 1000));

  const lowProgress = students.filter(student => {
    const progressPercentage = student.totalTasks ? (student.tasksCompleted! / student.totalTasks) * 100 : 0;
    return progressPercentage < 50 && student.status === 'ativo';
  });

  const noRecentSession = students.filter(student => {
    const studentMentorias = getStudentMentorias(student.id);
    if (studentMentorias.length === 0) return true;
    
    const lastSession = studentMentorias
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
    return new Date(lastSession.date) < tenDaysAgo;
  });

  const lastMonth = students.filter(student => {
    const daysRemaining = getDaysRemaining(student);
    return daysRemaining <= 30 && daysRemaining > 0 && student.status === 'ativo';
  });

  return { lowProgress, noRecentSession, lastMonth };
};
