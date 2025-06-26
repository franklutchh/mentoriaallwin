
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMentoringContext } from '../contexts/MentoringContext';
import { Student, ActionItem, FollowUpItem } from '../types/student';
import { OverviewTab } from './student-details/OverviewTab';
import { MentoringTab } from './student-details/MentoringTab';
import { ActionPlanTab } from './student-details/ActionPlanTab';
import { FollowUpTab } from './student-details/FollowUpTab';
import { PerformanceOverview } from './student-details/PerformanceOverview';
import { StudentHeader } from './student-details/StudentHeader';
import { StudentTabs } from './student-details/StudentTabs';
import { ReportTab } from './student-details/ReportTab';
import { NotesTab } from './student-details/NotesTab';
import { CallsTab } from './student-details/CallsTab';
import { useCallsContext } from '../contexts/CallsContext';

export const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { students, mentorias, actionItems, followUpItems, loading } = useMentoringContext();
  const { getStudentCalls } = useCallsContext();
  const [activeTab, setActiveTab] = useState<'resumo' | 'calls' | 'plano' | 'follow-up' | 'relatorio' | 'notas'>('resumo');
  const [notes, setNotes] = useState('');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const student = students.find(s => s.id === id);

  if (!student) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Aluno não encontrado
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          O aluno que você está procurando não existe ou foi removido.
        </p>
      </div>
    );
  }

  // Filtrar dados reais do aluno
  const studentMentorias = mentorias.filter(m => m.studentId === id);
  const studentActionItems = actionItems.filter(item => 
    // Se não tiver student_id no banco, mostrar todos por enquanto
    !item.studentId || item.studentId === id
  );
  const studentFollowUpItems = followUpItems.filter(item => 
    // Se não tiver student_id no banco, mostrar todos por enquanto
    !item.studentId || item.studentId === id
  );

  // Get calls for this student
  const calls = id ? getStudentCalls(id) : [];

  const exportReport = () => {
    const reportData = {
      student,
      mentorias: studentMentorias,
      actionItems: studentActionItems,
      followUpItems: studentFollowUpItems,
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `relatorio-${student.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as 'resumo' | 'calls' | 'plano' | 'follow-up' | 'relatorio' | 'notas');
  };

  return (
    <div className="p-8">
      <StudentHeader student={student} onExportReport={exportReport} />

      <PerformanceOverview 
        student={student} 
        mentorias={studentMentorias} 
        followUpItems={studentFollowUpItems} 
      />

      <StudentTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Tab Content */}
      {activeTab === 'resumo' && (
        <OverviewTab student={student} mentorias={studentMentorias} />
      )}

      {activeTab === 'calls' && (
        <CallsTab calls={calls} />
      )}

      {activeTab === 'plano' && (
        <ActionPlanTab actionItems={studentActionItems} />
      )}

      {activeTab === 'follow-up' && (
        <FollowUpTab 
          followUpItems={studentFollowUpItems} 
          setFollowUpItems={() => {}} // TODO: Implementar atualização real
        />
      )}

      {activeTab === 'relatorio' && (
        <ReportTab 
          student={student} 
          mentorias={studentMentorias} 
          actionItems={studentActionItems} 
          followUpItems={studentFollowUpItems} 
          onExportReport={exportReport} 
        />
      )}

      {activeTab === 'notas' && (
        <NotesTab 
          notes={notes} 
          onNotesChange={setNotes} 
        />
      )}
    </div>
  );
};
