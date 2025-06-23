
import React, { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const MentoringForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedStudentId = location.state?.studentId;

  const [formData, setFormData] = useState({
    studentIds: preSelectedStudentId ? [preSelectedStudentId] : [],
    date: new Date().toISOString().split('T')[0],
    type: '1:1' as '1:1' | 'grupo',
    topics: '',
    actions: '',
    recordingUrl: ''
  });

  // Mock students data
  const students = [
    { id: '1', name: 'Ana Silva' },
    { id: '2', name: 'Carlos Santos' },
    { id: '3', name: 'Maria Oliveira' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando mentoria:', formData);
    // Aqui será integrado com Supabase
    navigate('/');
  };

  const handleStudentChange = (studentId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      studentIds: checked 
        ? [...prev.studentIds, studentId]
        : prev.studentIds.filter(id => id !== studentId)
    }));
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Registrar Nova Mentoria</h1>
        <p className="text-gray-600 mt-2">Documente os detalhes da sessão de mentoria</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Aluno(s) *
            </label>
            <div className="space-y-3">
              {students.map((student) => (
                <label key={student.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.studentIds.includes(student.id)}
                    onChange={(e) => handleStudentChange(student.id, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{student.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Data da Mentoria *
              </label>
              <input
                type="date"
                id="date"
                required
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Mentoria *
              </label>
              <select
                id="type"
                required
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as '1:1' | 'grupo' }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1:1">Individual (1:1)</option>
                <option value="grupo">Em Grupo</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-2">
              Tópicos Discutidos *
            </label>
            <textarea
              id="topics"
              required
              rows={4}
              value={formData.topics}
              onChange={(e) => setFormData(prev => ({ ...prev, topics: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva os principais tópicos abordados na sessão..."
            />
          </div>

          <div>
            <label htmlFor="actions" className="block text-sm font-medium text-gray-700 mb-2">
              Ações Combinadas *
            </label>
            <textarea
              id="actions"
              required
              rows={4}
              value={formData.actions}
              onChange={(e) => setFormData(prev => ({ ...prev, actions: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Liste as ações e próximos passos definidos..."
            />
          </div>

          <div>
            <label htmlFor="recordingUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Link da Gravação (opcional)
            </label>
            <input
              type="url"
              id="recordingUrl"
              value={formData.recordingUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, recordingUrl: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              Salvar Mentoria
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
