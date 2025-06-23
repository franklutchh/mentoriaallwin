
import React, { useState } from 'react';
import { ArrowLeft, Plus, User, MessageCircle, Instagram, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  whatsapp: string;
  instagram: string;
  status: 'ativo' | 'inativo';
  entryDate: string;
}

interface Mentoring {
  id: string;
  date: string;
  type: '1:1' | 'grupo';
  topics: string;
  actions: string;
  recordingUrl?: string;
}

interface ActionItem {
  id: string;
  description: string;
  status: 'pendente' | 'em-progresso' | 'concluido';
}

export const StudentDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'resumo' | 'mentorias' | 'plano' | 'notas'>('resumo');

  // Mock data - será substituído por dados reais do Supabase
  const student: Student = {
    id: '1',
    name: 'Ana Silva',
    whatsapp: '+55 11 99999-9999',
    instagram: '@ana.silva',
    status: 'ativo',
    entryDate: '2024-01-15'
  };

  const [mentorias] = useState<Mentoring[]>([
    {
      id: '1',
      date: '2024-01-20',
      type: '1:1',
      topics: 'Definição de objetivos, planejamento estratégico',
      actions: 'Criar plano de ação para próximos 30 dias',
      recordingUrl: 'https://example.com/recording1'
    },
    {
      id: '2',
      date: '2024-01-18',
      type: 'grupo',
      topics: 'Networking e relacionamentos profissionais',
      actions: 'Conectar com 5 pessoas do LinkedIn',
    }
  ]);

  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { id: '1', description: 'Criar plano de ação para próximos 30 dias', status: 'em-progresso' },
    { id: '2', description: 'Conectar com 5 pessoas do LinkedIn', status: 'concluido' },
    { id: '3', description: 'Revisar estratégia de marketing pessoal', status: 'pendente' }
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

  const getStatusLabel = (status: ActionItem['status']) => {
    switch (status) {
      case 'concluido': return 'Concluído';
      case 'em-progresso': return 'Em Progresso';
      case 'pendente': return 'Pendente';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Dashboard
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-gray-600 mt-1">Detalhes da mentoria individual</p>
          </div>
          <div className="flex gap-3">
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

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
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
                  <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium mt-2 ${
                    mentoria.type === '1:1' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {mentoria.type === '1:1' ? 'Mentoria Individual' : 'Mentoria em Grupo'}
                  </span>
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
                </div>
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(item.status)}`}>
                  {getStatusLabel(item.status)}
                </span>
              </div>
            ))}
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
