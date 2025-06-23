
export interface Student {
  id: string;
  name: string;
  whatsapp: string;
  instagram: string;
  status: 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia';
  entryDate: string;
  group?: string;
  tags?: string[];
  tasksCompleted?: number;
  totalTasks?: number;
}

export interface Mentoring {
  id: string;
  date: string;
  type: '1:1' | 'grupo';
  topics: string;
  actions: string;
  recordingUrl?: string;
  status: 'completa' | 'em-andamento' | 'precisa-revisao';
  tags: string[];
}

export interface ActionItem {
  id: string;
  description: string;
  status: 'pendente' | 'em-progresso' | 'concluido';
  dueDate?: string;
  priority: 'baixa' | 'media' | 'alta';
}

export interface FollowUpItem {
  id: string;
  description: string;
  completed: boolean;
  createdAt: string;
}
