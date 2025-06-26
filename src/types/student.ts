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
  
  // Dados Financeiros
  paymentStatus: 'em-dia' | 'pendente' | 'atrasado' | 'inadimplente';
  monthlyValue: number;
  dueDate: string;
  lastPaymentDate?: string;
  paymentHistory: PaymentRecord[];
  
  // Gamificação
  level: 'iniciante' | 'intermediario' | 'avancado' | 'expert';
  points: number;
  badges: Badge[];
  engagementScore: number;
  churnRisk: 'baixo' | 'medio' | 'alto';
  lifetimeValue: number;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  status: 'pago' | 'pendente' | 'atrasado';
  method?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'progresso' | 'engagement' | 'pagamento' | 'milestone';
}

export interface Call {
  id: string;
  studentId: string;
  date: string;
  time: string;
  type: '1:1' | 'grupo';
  topics: string;
  actions: string;
  recordingUrl?: string;
  status: 'agendada' | 'completa' | 'em-andamento' | 'precisa-revisao';
  tags: string[];
  sessionLink?: string;
  satisfactionScore?: number;
  followUpRequired?: boolean;
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
  status: 'agendada' | 'completa' | 'em-andamento' | 'precisa-revisao';
  tags: string[];
  sessionLink?: string;
  satisfactionScore?: number;
  followUpRequired?: boolean;
}

export interface ActionItem {
  id: string;
  studentId?: string;
  description: string;
  status: 'pendente' | 'em-progresso' | 'concluido';
  dueDate?: string;
  priority: 'baixa' | 'media' | 'alta';
  createdAt?: string;
  points?: number;
}

export interface FollowUpItem {
  id: string;
  studentId?: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority?: 'baixa' | 'media' | 'alta';
}

export interface WeeklyPriorities {
  lowProgress: Student[];
  noRecentSession: Student[];
  lastMonth: Student[];
  paymentIssues: Student[];
  highChurnRisk: Student[];
}

export interface FinancialMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  averageTicket: number;
  churnRate: number;
  paymentDelayRate: number;
  lifetimeValue: number;
}
