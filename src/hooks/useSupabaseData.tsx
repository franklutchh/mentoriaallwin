
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Student, Mentoring, ActionItem, FollowUpItem } from '@/types/student';
import { useToast } from '@/hooks/use-toast';

interface SupabaseStudent {
  id: string;
  name: string;
  whatsapp: string;
  instagram: string | null;
  status: string;
  entry_date: string;
  end_date: string | null;
  group_name: string | null;
  tags: string[] | null;
  tasks_completed: number;
  total_tasks: number;
  favorite: boolean;
  payment_status: string;
  monthly_value: number;
  due_date: string | null;
  last_payment_date: string | null;
  level: string;
  points: number;
  engagement_score: number;
  churn_risk: string;
  lifetime_value: number;
}

interface SupabaseMentoring {
  id: string;
  student_id: string;
  date: string;
  time: string;
  type: string;
  topics: string;
  actions: string | null;
  recording_url: string | null;
  status: string;
  tags: string[] | null;
  session_link: string | null;
  satisfaction_score: number | null;
  follow_up_required: boolean;
}

export const useSupabaseData = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [mentorias, setMentorias] = useState<Mentoring[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [followUpItems, setFollowUpItems] = useState<FollowUpItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const transformStudent = (data: SupabaseStudent): Student => ({
    id: data.id,
    name: data.name,
    whatsapp: data.whatsapp,
    instagram: data.instagram || '',
    status: data.status as Student['status'],
    entryDate: data.entry_date,
    endDate: data.end_date || undefined,
    group: data.group_name || undefined,
    tags: data.tags || undefined,
    tasksCompleted: data.tasks_completed,
    totalTasks: data.total_tasks,
    favorite: data.favorite,
    paymentStatus: data.payment_status as Student['paymentStatus'],
    monthlyValue: Number(data.monthly_value),
    dueDate: data.due_date || '',
    lastPaymentDate: data.last_payment_date || undefined,
    paymentHistory: [],
    level: data.level as Student['level'],
    points: data.points,
    badges: [],
    engagementScore: data.engagement_score,
    churnRisk: data.churn_risk as Student['churnRisk'],
    lifetimeValue: Number(data.lifetime_value),
  });

  const transformMentoring = (data: SupabaseMentoring): Mentoring => ({
    id: data.id,
    studentId: data.student_id,
    date: data.date,
    time: data.time,
    type: data.type as Mentoring['type'],
    topics: data.topics,
    actions: data.actions || '',
    recordingUrl: data.recording_url || undefined,
    status: data.status as Mentoring['status'],
    tags: data.tags || [],
    sessionLink: data.session_link || undefined,
    satisfactionScore: data.satisfaction_score || undefined,
    followUpRequired: data.follow_up_required || undefined,
  });

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedStudents = data.map(transformStudent);
      setStudents(transformedStudents);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os alunos.",
        variant: "destructive",
      });
    }
  };

  const fetchMentorias = async () => {
    try {
      const { data, error } = await supabase
        .from('mentoring_sessions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      const transformedMentorias = data.map(transformMentoring);
      setMentorias(transformedMentorias);
    } catch (error) {
      console.error('Erro ao buscar mentorias:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as mentorias.",
        variant: "destructive",
      });
    }
  };

  const fetchActionItems = async () => {
    try {
      const { data, error } = await supabase
        .from('action_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedActionItems: ActionItem[] = data.map(item => ({
        id: item.id,
        description: item.description,
        status: item.status as ActionItem['status'],
        dueDate: item.due_date || undefined,
        priority: item.priority as ActionItem['priority'],
        createdAt: item.created_at,
        points: item.points || undefined,
      }));

      setActionItems(transformedActionItems);
    } catch (error) {
      console.error('Erro ao buscar itens de ação:', error);
    }
  };

  const fetchFollowUpItems = async () => {
    try {
      const { data, error } = await supabase
        .from('follow_up_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedFollowUpItems: FollowUpItem[] = data.map(item => ({
        id: item.id,
        description: item.description,
        completed: item.completed,
        createdAt: item.created_at,
        priority: item.priority as FollowUpItem['priority'],
      }));

      setFollowUpItems(transformedFollowUpItems);
    } catch (error) {
      console.error('Erro ao buscar follow-ups:', error);
    }
  };

  const addStudent = async (studentData: Omit<Student, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('students')
        .insert({
          name: studentData.name,
          whatsapp: studentData.whatsapp,
          instagram: studentData.instagram,
          status: studentData.status,
          entry_date: studentData.entryDate,
          group_name: studentData.group,
          tags: studentData.tags,
          tasks_completed: studentData.tasksCompleted,
          total_tasks: studentData.totalTasks,
          favorite: studentData.favorite,
          payment_status: studentData.paymentStatus,
          monthly_value: studentData.monthlyValue,
          due_date: studentData.dueDate,
          last_payment_date: studentData.lastPaymentDate,
          level: studentData.level,
          points: studentData.points,
          engagement_score: studentData.engagementScore,
          churn_risk: studentData.churnRisk,
          lifetime_value: studentData.lifetimeValue,
        })
        .select()
        .single();

      if (error) throw error;

      const newStudent = transformStudent(data);
      setStudents(prev => [newStudent, ...prev]);
      
      toast({
        title: "Sucesso!",
        description: "Aluno adicionado com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o aluno.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchStudents(),
        fetchMentorias(),
        fetchActionItems(),
        fetchFollowUpItems(),
      ]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    students,
    mentorias,
    actionItems,
    followUpItems,
    loading,
    addStudent,
    refetch: {
      students: fetchStudents,
      mentorias: fetchMentorias,
      actionItems: fetchActionItems,
      followUpItems: fetchFollowUpItems,
    },
  };
};
