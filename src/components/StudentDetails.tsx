
import React, { useState } from 'react';
import { ArrowLeft, Plus, Star, Download, TrendingUp, Target, Clock, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Student, Mentoring, ActionItem, FollowUpItem } from '../types/student';
import { OverviewTab } from './student-details/OverviewTab';
import { MentoringTab } from './student-details/MentoringTab';
import { ActionPlanTab } from './student-details/ActionPlanTab';
import { FollowUpTab } from './student-details/FollowUpTab';
import { PerformanceOverview } from './student-details/PerformanceOverview';

export const StudentDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'resumo' | 'mentorias' | 'plano' | 'follow-up' | 'relatorio' | 'notas'>('resumo');

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
      date: '2024-01-20',
      type: '1:1',
      topics: 'Definição de objetivos, planejamento estratégico',
      actions: 'Criar plano de ação para próximos 30 dias',
      recordingUrl: 'https://example.com/recording1',
      status: 'completa',
      tags: ['planejamento', 'objetivos']
    },
    {
      id: '2',
      date: '2024-01-18',
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

  const tabs = [
    { id: 'resumo', label: 'Resumo' },
    { id: 'mentorias', label: 'Mentorias' },
    { id: 'plano', label: 'Plano de Ação' },
    { id: 'follow-up', label: 'Follow-up' },
    { id: 'relatorio', label: 'Relatório' },
    { id: 'notas', label: 'Notas' }
  ];

  const progressPercentage = student.totalTasks ? Math.round((student.tasksCompleted! / student.totalTasks) * 100) : 0;

  const exportReport = () => {
    // Logic to export comprehensive report
    console.log('Exportando relatório completo...');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Dashboard
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
                <Star className="w-6 h-6 text-yellow-500 cursor-pointer hover:scale-110 transition-transform" />
              </div>
              <p className="text-gray-600 mt-1">Mentoria individual - {student.group}</p>
              <div className="flex items-center gap-2 mt-2">
                {student.tags?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-700 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportReport}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar Relatório
            </button>
            <button
              onClick={() => navigate('/mentoring/new', { state: { studentId: student.id } })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nova Mentoria
            </button>
          </div>
        </div>
      </div>

      <PerformanceOverview 
        student={student} 
        mentorias={mentorias} 
        followUpItems={followUpItems} 
      />

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'resumo' && (
        <OverviewTab student={student} mentorias={mentorias} />
      )}

      {activeTab === 'mentorias' && (
        <MentoringTab mentorias={mentorias} />
      )}

      {activeTab === 'plano' && (
        <ActionPlanTab actionItems={actionItems} />
      )}

      {activeTab === 'follow-up' && (
        <FollowUpTab followUpItems={followUpItems} setFollowUpItems={setFollowUpItems} />
      )}

      {activeTab === 'relatorio' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Relatório Completo</h2>
            <button 
              onClick={exportReport}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar PDF
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{mentorias.length}</p>
              <p className="text-sm text-gray-600">Total de Sessões</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{progressPercentage}%</p>
              <p className="text-sm text-gray-600">Progresso Geral</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">{actionItems.filter(a => a.status === 'em-progresso').length}</p>
              <p className="text-sm text-gray-600">Tarefas em Andamento</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{followUpItems.filter(f => !f.completed).length}</p>
              <p className="text-sm text-gray-600">Follow-ups Pendentes</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumo de Performance</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  {student.name} está com performance {progressPercentage >= 80 ? 'excelente' : progressPercentage >= 60 ? 'boa' : 'que precisa de atenção'}.
                  Já participou de {mentorias.length} sessões de mentoria e completou {student.tasksCompleted} de {student.totalTasks} tarefas do plano de ação.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Próximos Passos Recomendados</h3>
              <ul className="space-y-2">
                {actionItems.filter(a => a.status === 'pendente').map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notas' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Anotações</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="Digite suas anotações aqui..."
          />
          <div className="flex justify-end mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Salvar Anotações
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
