import { Session } from '../types/session';

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('pt-BR', { 
    month: 'long',
    year: 'numeric'
  });
};

export const getDaysInWeek = (date: Date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);

  const week = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    week.push(day);
  }
  return week;
};

export const getSessionsForDate = (sessions: Session[], date: Date) => {
  const dateStr = date.toISOString().split('T')[0];
  return sessions.filter(session => session.date === dateStr);
};

export const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
