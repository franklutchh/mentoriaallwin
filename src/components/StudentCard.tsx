
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMentoringContext } from '../contexts/MentoringContext';
import { StudentHeader } from './student-card/StudentHeader';
import { StudentActions } from './student-card/StudentActions';
import { StudentProgress } from './student-card/StudentProgress';
import { StudentContactInfo } from './student-card/StudentContactInfo';
import { StudentStats } from './student-card/StudentStats';
import { StudentTags } from './student-card/StudentTags';

interface Student {
  id: string;
  name: string;
  whatsapp: string;
  instagram: string;
  status: 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia' | 'finalizado';
  entryDate: string;
  lastSession?: string;
  group?: string;
  tags?: string[];
  tasksCompleted?: number;
  totalTasks?: number;
  favorite?: boolean;
}

interface StudentCardProps {
  student: Student;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const navigate = useNavigate();
  const { getDaysRemaining, getStudentMentorias } = useMentoringContext();

  const progressPercentage = student.totalTasks ? Math.round((student.tasksCompleted! / student.totalTasks) * 100) : 0;
  const daysRemaining = getDaysRemaining(student.id);
  const studentMentorias = getStudentMentorias(student.id);
  const lastMentoria = studentMentorias.length > 0 
    ? studentMentorias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group relative">
      {/* Header with favorite and actions */}
      <div className="flex items-start justify-between mb-4">
        <StudentHeader student={student} daysRemaining={daysRemaining} />
        <StudentActions studentId={student.id} />
      </div>

      {/* Progress Bar */}
      <StudentProgress 
        tasksCompleted={student.tasksCompleted} 
        totalTasks={student.totalTasks} 
      />

      {/* Tags */}
      <StudentTags tags={student.tags} />

      {/* Contact Info */}
      <StudentContactInfo
        whatsapp={student.whatsapp}
        instagram={student.instagram}
        entryDate={student.entryDate}
        lastMentoriaDate={lastMentoria?.date}
      />

      {/* Session Stats */}
      <StudentStats 
        sessionCount={studentMentorias.length}
        progressPercentage={progressPercentage}
      />

      <button
        onClick={() => navigate(`/students/${student.id}`)}
        className="w-full bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 py-2 px-4 rounded-lg transition-colors font-medium border border-transparent hover:border-blue-200"
      >
        Ver Detalhes Completos
      </button>
    </div>
  );
};
