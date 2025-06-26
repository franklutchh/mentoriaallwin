
import React, { useState, useEffect } from 'react';
import { Plus, Folder, FileText, Edit3, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const categories: Category[] = [
    { id: 'estrategias', name: 'Estratégias', icon: '🎯' },
    { id: 'checklists', name: 'Checklists', icon: '✅' },
    { id: 'ferramentas', name: 'Ferramentas', icon: '🛠️' },
    { id: 'roteiros', name: 'Roteiros', icon: '📋' },
    { id: 'templates', name: 'Templates', icon: '📄' }
  ];

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      // Por enquanto, manteremos uma lista vazia até que a tabela de documentos seja criada
      setDocuments([]);
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  const handleEditDocument = (document: Document) => {
    setSelectedDocument(document);
    setEditContent(document.content);
    setIsEditing(true);
  };

  const handleSaveDocument = async () => {
    if (selectedDocument) {
      try {
        // Implementar salvamento no Supabase quando a tabela for criada
        console.log('Salvando documento:', { ...selectedDocument, content: editContent });
        setSelectedDocument({ ...selectedDocument, content: editContent });
        setIsEditing(false);
      } catch (error) {
        console.error('Erro ao salvar documento:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

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
              
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nenhum documento encontrado
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comece criando seu primeiro documento
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors">
                    <Plus className="w-5 h-5" />
                    Criar Documento
                  </button>
                </div>
              ) : (
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
                </div>
              )}
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
