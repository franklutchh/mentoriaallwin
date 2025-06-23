
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student, Mentoring, ActionItem, FollowUpItem } from '../types/student';

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
  // Mock data inicial expandido
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Ana Silva',
      whatsapp: '+55 11 99999-9999',
      instagram: '@ana.silva',
      status: 'ativo',
      entryDate: '2024-01-15',
      group: 'Turma A',
      tags: ['trafego', 'copy'],
      tasksCompleted: 8,
      totalTasks: 12
    },
    {
      id: '2',
      name: 'Carlos Santos',
      whatsapp: '+55 11 88888-8888',
      instagram: '@carlos.santos',
      status: 'com-pendencia',
      entryDate: '2024-01-10',
      group: 'Turma A',
      tags: ['mentalidade', 'funil'],
      tasksCompleted: 3,
      totalTasks: 10
    },
    {
      id: '3',
      name: 'Maria Oliveira',
      whatsapp: '+55 11 77777-7777',
      instagram: '@maria.oliveira',
      status: 'sob-revisao',
      entryDate: '2023-12-01',
      group: 'Turma B',
      tags: ['copy'],
      tasksCompleted: 15,
      totalTasks: 15
    }
  ]);

  const [mentorias, setMentorias] = useState<Mentoring[]>([
    {
      id: '1',
      studentId: '1',
      date: '2024-01-20',
      time: '14:00',
      type: '1:1',
      topics: 'Definição de objetivos, planejamento estratégico',
      actions: 'Criar plano de ação para próximos 30 dias',
      recordingUrl: 'https://example.com/recording1',
      status: 'completa',
      tags: ['planejamento', 'objetivos']
    },
    {
      id: '2',
      studentId: '2',
      date: '2024-01-18',
      time: '19:00',
      type: 'grupo',
      topics: 'Networking e relacionamentos profissionais',
      actions: 'Conectar com 5 pessoas do LinkedIn',
      status: 'em-andamento',
      tags: ['networking', 'relacionamentos']
    }
  ]);

  const [actionItems, setActionItems] = useState<Record<string, ActionItem[]>>({
    '1': [
      { id: '1', description: 'Criar plano de ação para próximos 30 dias', status: 'em-progresso', dueDate: '2024-02-01', priority: 'alta' },
      { id: '2', description: 'Conectar com 5 pessoas do LinkedIn', status: 'concluido', priority: 'media' },
      { id: '3', description: 'Revisar estratégia de marketing pessoal', status: 'pendente', dueDate: '2024-01-30', priority: 'alta' }
    ]
  });

  const [followUpItems, setFollowUpItems] = useState<Record<string, FollowUpItem[]>>({
    '1': [
      { id: '1', description: 'Verificar progresso nas conexões do LinkedIn', completed: false, createdAt: '2024-01-21' },
      { id: '2', description: 'Acompanhar implementação do funil de vendas', completed: true, createdAt: '2024-01-20' },
      { id: '3', description: 'Revisar métricas de tráfego pago', completed: false, createdAt: '2024-01-19' }
    ]
  });

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

  const getDaysRemaining = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return 0;
    
    const entryDate = new Date(student.entryDate);
    const endDate = new Date(entryDate);
    endDate.setMonth(endDate.getMonth() + 3);
    
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  const getWeeklyPriorities = () => {
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
      const daysRemaining = getDaysRemaining(student.id);
      return daysRemaining <= 30 && daysRemaining > 0 && student.status === 'ativo';
    });

    return { lowProgress, noRecentSession, lastMonth };
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
      getDaysRemaining,
      getWeeklyPriorities
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
