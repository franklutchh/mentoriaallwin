
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
