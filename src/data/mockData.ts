import { Student, Mentoring, ActionItem, FollowUpItem } from '../types/student';

export const mockStudents: Student[] = [
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
    totalTasks: 12,
    favorite: true,
    
    // Dados Financeiros
    paymentStatus: 'em-dia',
    monthlyValue: 497,
    dueDate: '2024-02-15',
    lastPaymentDate: '2024-01-15',
    paymentHistory: [
      {
        id: '1',
        amount: 497,
        date: '2024-01-15',
        status: 'pago',
        method: 'PIX'
      }
    ],
    
    // Gamificação
    level: 'intermediario',
    points: 850,
    badges: [
      {
        id: '1',
        name: 'Primeira Call',
        description: 'Completou a primeira call de mentoria',
        icon: '🎯',
        earnedDate: '2024-01-16',
        category: 'milestone'
      }
    ],
    engagementScore: 85,
    churnRisk: 'baixo',
    lifetimeValue: 2485
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
    totalTasks: 10,
    favorite: false,
    
    // Dados Financeiros
    paymentStatus: 'atrasado',
    monthlyValue: 497,
    dueDate: '2024-02-10',
    lastPaymentDate: '2024-01-10',
    paymentHistory: [
      {
        id: '2',
        amount: 497,
        date: '2024-01-10',
        status: 'pago',
        method: 'Cartão'
      }
    ],
    
    // Gamificação
    level: 'iniciante',
    points: 320,
    badges: [],
    engagementScore: 45,
    churnRisk: 'alto',
    lifetimeValue: 997
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
    totalTasks: 15,
    favorite: false,
    
    // Dados Financeiros
    paymentStatus: 'em-dia',
    monthlyValue: 497,
    dueDate: '2024-02-01',
    lastPaymentDate: '2024-01-01',
    paymentHistory: [
      {
        id: '3',
        amount: 497,
        date: '2024-01-01',
        status: 'pago',
        method: 'PIX'
      },
      {
        id: '4',
        amount: 497,
        date: '2023-12-01',
        status: 'pago',
        method: 'PIX'
      }
    ],
    
    // Gamificação
    level: 'avancado',
    points: 1250,
    badges: [
      {
        id: '2',
        name: 'Dedicado',
        description: 'Completou todas as tarefas',
        icon: '🏆',
        earnedDate: '2024-01-20',
        category: 'progresso'
      }
    ],
    engagementScore: 95,
    churnRisk: 'baixo',
    lifetimeValue: 3482
  }
];

export const mockMentorias: Mentoring[] = [
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
  },
  {
    id: '3',
    studentId: '1',
    date: '2024-01-25',
    time: '15:00',
    type: '1:1',
    topics: 'Revisão de estratégias de tráfego pago',
    actions: 'Implementar nova campanha no Facebook Ads',
    status: 'agendada',
    tags: ['trafego', 'facebook-ads']
  },
  {
    id: '4',
    studentId: '3',
    date: '2024-01-26',
    time: '10:00',
    type: 'grupo',
    topics: 'Workshop de copywriting',
    actions: 'Criar 3 headlines para teste A/B',
    status: 'agendada',
    tags: ['copy', 'workshop']
  }
];

export const mockActionItems: Record<string, ActionItem[]> = {
  '1': [
    { id: '1', description: 'Criar plano de ação para próximos 30 dias', status: 'em-progresso', dueDate: '2024-02-01', priority: 'alta' },
    { id: '2', description: 'Conectar com 5 pessoas do LinkedIn', status: 'concluido', priority: 'media' },
    { id: '3', description: 'Revisar estratégia de marketing pessoal', status: 'pendente', dueDate: '2024-01-30', priority: 'alta' }
  ]
};

export const mockFollowUpItems: Record<string, FollowUpItem[]> = {
  '1': [
    { id: '1', description: 'Verificar progresso nas conexões do LinkedIn', completed: false, createdAt: '2024-01-21' },
    { id: '2', description: 'Acompanhar implementação do funil de vendas', completed: true, createdAt: '2024-01-20' },
    { id: '3', description: 'Revisar métricas de tráfego pago', completed: false, createdAt: '2024-01-19' }
  ]
};
