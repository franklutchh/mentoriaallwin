
export interface PriorityAction {
  id: string;
  title: string;
  description: string;
  type: 'call' | 'follow-up' | 'review' | 'urgent';
  studentId?: string;
  studentName?: string;
  dueDate?: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime: number; // in minutes
  actionUrl?: string;
}

export interface SmartAlert {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'error' | 'info' | 'success';
  studentId?: string;
  actionRequired: boolean;
  daysOverdue?: number;
  quickActions?: QuickAction[];
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface WeeklyGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  progress: number; // 0-100
}

export interface ProductivityMetrics {
  todaysCalls: number;
  pendingFollowUps: number;
  studentsNeedingAttention: number;
  weeklyProgress: number;
  avgResponseTime: number;
}

// Aliases for component compatibility
export interface Priority {
  id: string;
  title: string;
  description: string;
  level: 'baixa' | 'media' | 'alta';
  student: string;
  estimatedTime: string;
  completed?: boolean;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  details: string;
  type: 'student-delay' | 'missing-followup' | 'urgent';
  severity: 'baixa' | 'media' | 'alta';
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  daysLeft: number;
}

export interface ProductivityMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  type: 'calls' | 'students' | 'hours' | 'general';
  period: string;
}
