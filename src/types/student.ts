
export interface Student {
  id: string;
  name: string;
  whatsapp: string;
  instagram: string;
  status: 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia' | 'finalizado';
  entryDate: string;
  endDate?: string;
  group?: string;
  tags?: string[];
  tasksCompleted?: number;
  totalTasks?: number;
  favorite?: boolean;
}

export interface Mentoring {
  id: string;
  studentId: string;
  date: string;
  time: string;
  type: '1:1' | 'grupo';
  topics: string;
  actions: string;
  recordingUrl?: string;
  status: 'completa' | 'em-andamento' | 'precisa-revisao';
  tags: string[];
  sessionLink?: string;
}

export interface ActionItem {
  id: string;
  description: string;
  status: 'pendente' | 'em-progresso' | 'concluido';
  dueDate?: string;
  priority: 'baixa' | 'media' | 'alta';
  createdAt?: string;
}

export interface FollowUpItem {
  id: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface WeeklyPriorities {
  lowProgress: Student[];
  noRecentSession: Student[];
  lastMonth: Student[];
}
