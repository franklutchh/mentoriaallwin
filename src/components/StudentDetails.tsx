
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Student, Mentoring, ActionItem, FollowUpItem, Call } from '../types/student';
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
  const { getStudentCalls } = useCallsContext();
  const [activeTab, setActiveTab] = useState<'resumo' | 'calls' | 'plano' | 'follow-up' | 'relatorio' | 'notas'>('resumo');

  // Mock data expandido
  const student: Student = {
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
  };

  const [mentorias] = useState<Mentoring[]>([
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
      studentId: '1',
      date: '2024-01-18',
      time: '19:00',
      type: 'grupo',
      topics: 'Networking e relacionamentos profissionais',
      actions: 'Conectar com 5 pessoas do LinkedIn',
      status: 'em-andamento',
      tags: ['networking', 'relacionamentos']
    }
  ]);

  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { id: '1', description: 'Criar plano de ação para próximos 30 dias', status: 'em-progresso', dueDate: '2024-02-01', priority: 'alta' },
    { id: '2', description: 'Conectar com 5 pessoas do LinkedIn', status: 'concluido', priority: 'media' },
    { id: '3', description: 'Revisar estratégia de marketing pessoal', status: 'pendente', dueDate: '2024-01-30', priority: 'alta' }
  ]);

  const [followUpItems, setFollowUpItems] = useState<FollowUpItem[]>([
    { id: '1', description: 'Verificar progresso nas conexões do LinkedIn', completed: false, createdAt: '2024-01-21' },
    { id: '2', description: 'Acompanhar implementação do funil de vendas', completed: true, createdAt: '2024-01-20' },
    { id: '3', description: 'Revisar métricas de tráfego pago', completed: false, createdAt: '2024-01-19' }
  ]);

  const [notes, setNotes] = useState(`# Anotações - ${student.name}

## Objetivos Principais
- Crescimento profissional na área de tecnologia
- Melhoria das habilidades de liderança
- Expansão da rede de contatos

## Pontos de Atenção
- Dificuldade com gestão de tempo
- Necessita de maior confiança em apresentações

## Progressos Observados
- Melhoria significativa na comunicação
- Maior proatividade nas ações definidas`);

  // Get calls for this student
  const calls = id ? getStudentCalls(id) : [];

  const exportReport = () => {
    // Logic to export comprehensive report
    console.log('Exportando relatório completo...');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as 'resumo' | 'calls' | 'plano' | 'follow-up' | 'relatorio' | 'notas');
  };

  return (
    <div className="p-8">
      <StudentHeader student={student} onExportReport={exportReport} />

      <PerformanceOverview 
        student={student} 
        mentorias={mentorias} 
        followUpItems={followUpItems} 
      />

      <StudentTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Tab Content */}
      {activeTab === 'resumo' && (
        <OverviewTab student={student} mentorias={mentorias} />
      )}

      {activeTab === 'calls' && (
        <CallsTab calls={calls} />
      )}

      {activeTab === 'plano' && (
        <ActionPlanTab actionItems={actionItems} />
      )}

      {activeTab === 'follow-up' && (
        <FollowUpTab followUpItems={followUpItems} setFollowUpItems={setFollowUpItems} />
      )}

      {activeTab === 'relatorio' && (
        <ReportTab 
          student={student} 
          mentorias={mentorias} 
          actionItems={actionItems} 
          followUpItems={followUpItems} 
          onExportReport={exportReport} 
        />
      )}

      {activeTab === 'notas' && (
        <NotesTab notes={notes} onNotesChange={setNotes} />
      )}
    </div>
  );
};
