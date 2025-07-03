
import React, { useState } from 'react';
import { Plus, Folder, FileText, Edit3, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  category: string;
  content: string;
  lastModified: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

export const KnowledgeBase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const categories: Category[] = [
    { id: 'estrategias', name: 'Estratégias', icon: '🎯' },
    { id: 'checklists', name: 'Checklists', icon: '✅' },
    { id: 'ferramentas', name: 'Ferramentas', icon: '🛠️' },
    { id: 'roteiros', name: 'Roteiros', icon: '📋' },
    { id: 'templates', name: 'Templates', icon: '📄' }
  ];

  const [documents] = useState<Document[]>([
    {
      id: '1',
      title: 'Estratégia de Networking Profissional',
      category: 'estrategias',
      content: `# Estratégia de Networking Profissional

## Objetivos
- Expandir rede de contatos
- Criar relacionamentos duradouros
- Gerar oportunidades de negócio

## Passos
1. **Definir objetivos claros**
   - Que tipo de pessoas você quer conhecer?
   - Qual seu objetivo com cada conexão?

2. **Identificar eventos e plataformas**
   - LinkedIn
   - Eventos da área
   - Meetups
   - Conferências

3. **Preparar sua apresentação pessoal**
   - Elevator pitch de 30 segundos
   - História profissional concisa
   - Valor que você oferece

## Dicas Importantes
- Sempre ofereça valor primeiro
- Mantenha contato regular
- Seja autêntico nas interações`,
      lastModified: '2024-01-20'
    },
    {
      id: '2',
      title: 'Checklist: Preparação para Entrevista',
      category: 'checklists',
      content: `# Checklist: Preparação para Entrevista

## Antes da Entrevista
- [ ] Pesquisar sobre a empresa
- [ ] Revisar a descrição da vaga
- [ ] Preparar respostas para perguntas comuns
- [ ] Escolher roupa adequada
- [ ] Testar conexão (se for online)
- [ ] Separar documentos necessários

## Durante a Entrevista
- [ ] Chegar 10 minutos antes
- [ ] Cumprimentar com firmeza
- [ ] Manter contato visual
- [ ] Fazer perguntas sobre a empresa
- [ ] Demonstrar interesse genuíno

## Após a Entrevista
- [ ] Enviar email de agradecimento
- [ ] Fazer follow-up em 1 semana
- [ ] Anotar impressões e feedbacks`,
      lastModified: '2024-01-18'
    },
    {
      id: '3',
      title: 'Ferramentas de Produtividade',
      category: 'ferramentas',
      content: `# Ferramentas de Produtividade

## Gestão de Tempo
- **Toggl Track** - Controle de tempo
- **RescueTime** - Análise de produtividade
- **Pomodoro Timer** - Técnica pomodoro

## Organização
- **Notion** - Workspace all-in-one
- **Trello** - Gestão de projetos
- **Todoist** - Lista de tarefas

## Comunicação
- **Slack** - Comunicação em equipe
- **Zoom** - Videoconferências
- **Calendly** - Agendamento`,
      lastModified: '2024-01-15'
    }
  ]);

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  const handleEditDocument = (document: Document) => {
    setSelectedDocument(document);
    setEditContent(document.content);
    setIsEditing(true);
  };

  const handleSaveDocument = () => {
    if (selectedDocument) {
      // Aqui seria salvo no Supabase
      console.log('Salvando documento:', { ...selectedDocument, content: editContent });
      setSelectedDocument({ ...selectedDocument, content: editContent });
      setIsEditing(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Biblioteca de Conhecimento</h1>
            <p className="text-gray-600 mt-1">Organize e acesse todos os materiais da mentoria</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Novo Documento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar com categorias */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Categorias</h3>
            <nav className="space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedDocument(null);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Folder className="w-4 h-4" />
                Todos os Documentos
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedDocument(null);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="lg:col-span-3">
          {!selectedDocument ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedCategory === 'all' 
                  ? 'Todos os Documentos' 
                  : categories.find(c => c.id === selectedCategory)?.name}
              </h3>
              <div className="grid gap-4">
                {filteredDocuments.map((document) => (
                  <div
                    key={document.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                    onClick={() => setSelectedDocument(document)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <h4 className="font-medium text-gray-900">{document.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {document.content.substring(0, 120)}...
                        </p>
                        <p className="text-xs text-gray-500">
                          Modificado em {new Date(document.lastModified).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditDocument(document);
                          }}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Implementar exclusão
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredDocuments.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhum documento encontrado nesta categoria</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedDocument.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Modificado em {new Date(selectedDocument.lastModified).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSaveDocument}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Salvar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => setSelectedDocument(null)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          Voltar
                        </button>
                        <button
                          onClick={() => handleEditDocument(selectedDocument)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          Editar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6">
                {isEditing ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    placeholder="Digite o conteúdo do documento..."
                  />
                ) : (
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
                      {selectedDocument.content}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
