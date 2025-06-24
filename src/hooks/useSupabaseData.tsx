
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Student, Mentoring, ActionItem, FollowUpItem } from '@/types/student';

export const useSupabaseData = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [mentorias, setMentorias] = useState<Mentoring[]>([]);
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [followUpItems, setFollowUpItems] = useState<FollowUpItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch students
  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedStudents: Student[] = data?.map(student => ({
        id: student.id,
        name: student.name,
        whatsapp: student.whatsapp,
        instagram: student.instagram || '',
        status: student.status as Student['status'],
        entryDate: student.entry_date,
        endDate: student.end_date || undefined,
        group: student.group_name || undefined,
        tags: student.tags || [],
        tasksCompleted: student.tasks_completed || 0,
        totalTasks: student.total_tasks || 10,
        favorite: student.favorite || false,
        paymentStatus: student.payment_status as Student['paymentStatus'],
        monthlyValue: Number(student.monthly_value) || 0,
        dueDate: student.due_date || '',
        lastPaymentDate: student.last_payment_date || undefined,
        paymentHistory: [], // Will be populated separately if needed
        level: student.level as Student['level'],
        points: student.points || 0,
        badges: [], // Will be populated separately if needed
        engagementScore: student.engagement_score || 50,
        churnRisk: student.churn_risk as Student['churnRisk'],
        lifetimeValue: Number(student.lifetime_value) || 0
      })) || [];

      setStudents(formattedStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch mentoring sessions
  const fetchMentorias = async () => {
    try {
      const { data, error } = await supabase
        .from('mentoring_sessions')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      const formattedMentorias: Mentoring[] = data?.map(session => ({
        id: session.id,
        studentId: session.student_id,
        date: session.date,
        time: session.time,
        type: session.type as Mentoring['type'],
        topics: session.topics,
        actions: session.actions || '',
        recordingUrl: session.recording_url || undefined,
        status: session.status as Mentoring['status'],
        tags: session.tags || [],
        sessionLink: session.session_link || undefined,
        satisfactionScore: session.satisfaction_score || undefined,
        followUpRequired: session.follow_up_required || false
      })) || [];

      setMentorias(formattedMentorias);
    } catch (error) {
      console.error('Error fetching mentoring sessions:', error);
    }
  };

  // Fetch action items
  const fetchActionItems = async () => {
    try {
      const { data, error } = await supabase
        .from('action_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedActionItems: ActionItem[] = data?.map(item => ({
        id: item.id,
        description: item.description,
        status: item.status as ActionItem['status'],
        dueDate: item.due_date || undefined,
        priority: item.priority as ActionItem['priority'],
        createdAt: item.created_at || undefined,
        points: item.points || 0
      })) || [];

      setActionItems(formattedActionItems);
    } catch (error) {
      console.error('Error fetching action items:', error);
    }
  };

  // Fetch follow-up items
  const fetchFollowUpItems = async () => {
    try {
      const { data, error } = await supabase
        .from('follow_up_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedFollowUpItems: FollowUpItem[] = data?.map(item => ({
        id: item.id,
        description: item.description,
        completed: item.completed || false,
        createdAt: item.created_at,
        priority: item.priority as FollowUpItem['priority']
      })) || [];

      setFollowUpItems(formattedFollowUpItems);
    } catch (error) {
      console.error('Error fetching follow-up items:', error);
    }
  };

  // Add student
  const addStudent = async (studentData: Omit<Student, 'id'>) => {
    try {
      const { error } = await supabase
        .from('students')
        .insert({
          name: studentData.name,
          whatsapp: studentData.whatsapp,
          instagram: studentData.instagram,
          status: studentData.status,
          entry_date: studentData.entryDate,
          end_date: studentData.endDate,
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
          lifetime_value: studentData.lifetimeValue
        });

      if (error) throw error;
      await fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  };

  // Add mentoring session
  const addMentoring = async (mentoringData: Omit<Mentoring, 'id'>) => {
    try {
      const { error } = await supabase
        .from('mentoring_sessions')
        .insert({
          student_id: mentoringData.studentId,
          date: mentoringData.date,
          time: mentoringData.time,
          type: mentoringData.type,
          topics: mentoringData.topics,
          actions: mentoringData.actions,
          recording_url: mentoringData.recordingUrl,
          status: mentoringData.status,
          tags: mentoringData.tags,
          session_link: mentoringData.sessionLink,
          satisfaction_score: mentoringData.satisfactionScore,
          follow_up_required: mentoringData.followUpRequired
        });

      if (error) throw error;
      await fetchMentorias();
    } catch (error) {
      console.error('Error adding mentoring session:', error);
      throw error;
    }
  };

  // Initial data fetch
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchStudents(),
        fetchMentorias(),
        fetchActionItems(),
        fetchFollowUpItems()
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const refetch = {
    students: fetchStudents,
    mentorias: fetchMentorias,
    actionItems: fetchActionItems,
    followUpItems: fetchFollowUpItems
  };

  return {
    students,
    mentorias,
    actionItems,
    followUpItems,
    loading,
    addStudent,
    addMentoring,
    refetch
  };
};
