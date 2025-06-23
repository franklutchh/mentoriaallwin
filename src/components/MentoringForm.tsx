
import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMentoringContext } from '../contexts/MentoringContext';
import { Mentoring } from '../types/student';

const availableTags = [
  'trafego', 'copy', 'mentalidade', 'funil', 'vendas', 'networking', 
  'planejamento', 'objetivos', 'relacionamentos', 'mindset', 'estrategia'
];

export const MentoringForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { students, addMentoring } = useMentoringContext();
  const preSelectedStudentId = location.state?.studentId;

  const [formData, setFormData] = useState({
    studentIds: preSelectedStudentId ? [preSelectedStudentId] : [],
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    type: '1:1' as '1:1' | 'grupo',
    topics: '',
    actions: '',
    recordingUrl: '',
    sessionLink: '',
    tags: [] as string[],
    status: 'em-andamento' as 'completa' | 'em-andamento' | 'precisa-revisao'
  });

  const [customTag, setCustomTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criar uma mentoria para cada aluno selecionado
    formData.studentIds.forEach((studentId, index) => {
      const mentoring: Mentoring = {
        id: `${Date.now()}-${index}`,
        studentId,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        topics: formData.topics,
        actions: formData.actions,
        recordingUrl: formData.recordingUrl,
        sessionLink: formData.sessionLink,
        status: formData.status,
        tags: formData.tags
      };
      
      addMentoring(mentoring);
    });

    console.log('Mentorias salvas com sucesso!');
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

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addCustomTag = () => {
    if (customTag.trim()) {
      addTag(customTag.trim().toLowerCase());
      setCustomTag('');
    }
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
        <p className="text-gray-600 mt-2">Complete todos os campos para documentar a sessão</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Aluno(s) * <span className="text-xs text-gray-500">({formData.studentIds.length} selecionado{formData.studentIds.length !== 1 ? 's' : ''})</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {students.filter(s => s.status === 'ativo').map((student) => (
                <label key={student.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.studentIds.includes(student.id)}
                    onChange={(e) => handleStudentChange(student.id, e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <span className="text-gray-900 font-medium">{student.name}</span>
                    <p className="text-sm text-gray-500">{student.group}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Horário *
              </label>
              <input
                type="time"
                id="time"
                required
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
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
            <label htmlFor="sessionLink" className="block text-sm font-medium text-gray-700 mb-2">
              Link da Sessão (Discord/Meet)
            </label>
            <input
              type="url"
              id="sessionLink"
              value={formData.sessionLink}
              onChange={(e) => setFormData(prev => ({ ...prev, sessionLink: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://discord.gg/... ou https://meet.google.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags Temáticas
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {availableTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  disabled={formData.tags.includes(tag)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                    formData.tags.includes(tag)
                      ? 'bg-blue-100 text-blue-800 border-blue-200 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="Adicionar tag personalizada..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
              />
              <button
                type="button"
                onClick={addCustomTag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-sm text-gray-600">Selecionadas:</span>
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status da Sessão
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="em-andamento">Em Andamento</option>
                <option value="completa">Completa</option>
                <option value="precisa-revisao">Precisa Revisão</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={formData.studentIds.length === 0 || !formData.topics || !formData.actions}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
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
