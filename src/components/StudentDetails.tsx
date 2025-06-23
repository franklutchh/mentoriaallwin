import React, { useState } from 'react';
import { ArrowLeft, Plus, User, MessageCircle, Instagram, Calendar, Target, TrendingUp, Download, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Student {
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

interface Mentoring {
  id: string;
  date: string;
  type: '1:1' | 'grupo';
  topics: string;
  actions: string;
  recordingUrl?: string;
  status: 'completa' | 'em-andamento' | 'precisa-revisao';
  tags: string[];
}

interface ActionItem {
  id: string;
  description: string;
  status: 'pendente' | 'em-progresso' | 'concluido';
  dueDate?: string;
  priority: 'baixa' | 'media' | 'alta';
}

interface FollowUpItem {
  id: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: ActionItem['status']) => {
    switch (status) {
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'em-progresso': return 'bg-yellow-100 text-yellow-800';
      case 'pendente': return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: ActionItem['priority']) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
    }
  };

  const getStatusLabel = (status: ActionItem['status']) => {
    switch (status) {
      case 'concluido': return 'Concluído';
      case 'em-progresso': return 'Em Progresso';
      case 'pendente': return 'Pendente';
    }
  };

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

      {/* Performance Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Geral</h3>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{mentorias.length}</p>
                <p className="text-sm text-gray-600">Sessões</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{progressPercentage}%</p>
                <p className="text-sm text-gray-600">Conclusão</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{followUpItems.filter(f => !f.completed).length}</p>
                <p className="text-sm text-gray-600">Follow-ups</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 relative">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${progressPercentage * 2.51} 251`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-900">{progressPercentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações do Aluno</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Nome Completo</p>
                  <p className="font-medium text-gray-900">{student.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">WhatsApp</p>
                  <p className="font-medium text-gray-900">{student.whatsapp}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Instagram</p>
                  <p className="font-medium text-gray-900">{student.instagram}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Data de Entrada</p>
                  <p className="font-medium text-gray-900">{formatDate(student.entryDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${student.status === 'ativo' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-gray-900 capitalize">{student.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Total de Mentorias</p>
                  <p className="font-medium text-gray-900">{mentorias.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mentorias' && (
        <div className="space-y-6">
          {mentorias.map((mentoria) => (
            <div key={mentoria.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{formatDate(mentoria.date)}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                      mentoria.type === '1:1' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {mentoria.type === '1:1' ? 'Mentoria Individual' : 'Mentoria em Grupo'}
                    </span>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                      mentoria.status === 'completa' ? 'bg-green-100 text-green-800' :
                      mentoria.status === 'em-andamento' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {mentoria.status === 'completa' ? 'Completa' :
                       mentoria.status === 'em-andamento' ? 'Em Andamento' : 'Precisa Revisão'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mentoria.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {mentoria.recordingUrl && (
                  <a
                    href={mentoria.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Ver Gravação
                  </a>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Tópicos Discutidos</h4>
                  <p className="text-gray-600">{mentoria.topics}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Ações Combinadas</h4>
                  <p className="text-gray-600">{mentoria.actions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'plano' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Plano de Ação</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Nova Tarefa
            </button>
          </div>
          <div className="space-y-4">
            {actionItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  checked={item.status === 'concluido'}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <p className={`${item.status === 'concluido'? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.description}
                  </p>
                  {item.dueDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      Prazo: {formatDate(item.dueDate)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'follow-up' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Follow-up Checklist</h2>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" />
              Novo Follow-up
            </button>
          </div>
          <div className="space-y-3">
            {followUpItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                <button
                  onClick={() => {
                    setFollowUpItems(items => 
                      items.map(i => i.id === item.id ? {...i, completed: !i.completed} : i)
                    );
                  }}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    item.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : 'border-gray-300 hover:border-green-400'
                  }`}
                >
                  {item.completed && <CheckCircle className="w-3 h-3" />}
                </button>
                <div className="flex-1">
                  <p className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Criado em: {formatDate(item.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {item.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-orange-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
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
