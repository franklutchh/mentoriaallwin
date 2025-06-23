
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
