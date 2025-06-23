
import React, { useState } from 'react';
import { ArrowLeft, Save, Plus, X, Phone, Users, Calendar, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallsContext } from '../contexts/CallsContext';
import { Call } from '../types/student';

const availableTags = [
  'trafego', 'copy', 'mentalidade', 'funil', 'vendas', 'networking', 
  'planejamento', 'objetivos', 'relacionamentos', 'mindset', 'estrategia'
];

export const CallForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { students, addCall } = useCallsContext();
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
    
    formData.studentIds.forEach((studentId, index) => {
      const call: Call = {
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
      
      addCall(call);
    });

    console.log('Calls salvos com sucesso!');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-purple/5">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors hover:scale-105 transform duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Voltar</span>
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-purple-medium flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Nova Call</h1>
              <p className="text-muted-foreground mt-1">Registre sua sessão de mentoria</p>
            </div>
          </div>
        </div>

        <div className="bg-card/60 backdrop-blur-xl rounded-2xl shadow-apple-xl border border-border/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Students Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-purple" />
                <label className="text-lg font-semibold text-foreground">
                  Aluno(s) * 
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    ({formData.studentIds.length} selecionado{formData.studentIds.length !== 1 ? 's' : ''})
                  </span>
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.filter(s => s.status === 'ativo').map((student) => (
                  <label 
                    key={student.id} 
                    className="group flex items-center gap-4 p-4 bg-card rounded-xl border border-border/30 hover:border-brand-purple/50 hover:bg-brand-purple/5 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-apple"
                  >
                    <input
                      type="checkbox"
                      checked={formData.studentIds.includes(student.id)}
                      onChange={(e) => handleStudentChange(student.id, e.target.checked)}
                      className="w-5 h-5 text-brand-purple rounded-md border-2 border-border focus:ring-brand-purple focus:ring-2"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-foreground group-hover:text-brand-purple-medium transition-colors">
                        {student.name}
                      </span>
                      <p className="text-sm text-muted-foreground">{student.group}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date, Time and Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-purple" />
                  <label className="font-semibold text-foreground">Data *</label>
                </div>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-purple" />
                  <label className="font-semibold text-foreground">Horário *</label>
                </div>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-purple" />
                  <label className="font-semibold text-foreground">Tipo *</label>
                </div>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as '1:1' | 'grupo' }))}
                  className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                >
                  <option value="1:1">Individual (1:1)</option>
                  <option value="grupo">Em Grupo</option>
                </select>
              </div>
            </div>

            {/* Session Link */}
            <div className="space-y-3">
              <label className="font-semibold text-foreground">Link da Sessão</label>
              <input
                type="url"
                value={formData.sessionLink}
                onChange={(e) => setFormData(prev => ({ ...prev, sessionLink: e.target.value }))}
                className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                placeholder="https://discord.gg/... ou https://meet.google.com/..."
              />
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <label className="font-semibold text-foreground">Tags Temáticas</label>
              <div className="flex flex-wrap gap-3">
                {availableTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    disabled={formData.tags.includes(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      formData.tags.includes(tag)
                        ? 'bg-brand-purple text-white cursor-not-allowed'
                        : 'bg-muted hover:bg-brand-purple/10 hover:text-brand-purple border border-border/30 hover:border-brand-purple/50 hover:scale-105'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-3">
                <input
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  placeholder="Tag personalizada..."
                  className="flex-1 px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
                />
                <button
                  type="button"
                  onClick={addCustomTag}
                  className="px-6 py-3 bg-muted hover:bg-brand-purple/10 text-foreground rounded-xl transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-brand-purple/10 text-brand-purple rounded-full text-sm font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:bg-brand-purple/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Topics */}
            <div className="space-y-3">
              <label className="font-semibold text-foreground">Tópicos Discutidos *</label>
              <textarea
                required
                rows={4}
                value={formData.topics}
                onChange={(e) => setFormData(prev => ({ ...prev, topics: e.target.value }))}
                className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all resize-none"
                placeholder="Descreva os principais tópicos abordados na sessão..."
              />
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <label className="font-semibold text-foreground">Ações Combinadas *</label>
              <textarea
                required
                rows={4}
                value={formData.actions}
                onChange={(e) => setFormData(prev => ({ ...prev, actions: e.target.value }))}
                className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all resize-none"
                placeholder="Liste as ações e próximos passos definidos..."
              />
            </div>

            {/* Recording and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="font-semibold text-foreground">Link da Gravação</label>
                <input
                  type="url"
                  value={formData.recordingUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, recordingUrl: e.target.value }))}
                  className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-3">
                <label className="font-semibold text-foreground">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
                >
                  <option value="em-andamento">Em Andamento</option>
                  <option value="completa">Completa</option>
                  <option value="precisa-revisao">Precisa Revisão</option>
                </select>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-8 border-t border-border/30">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-4 border border-border/30 text-muted-foreground rounded-xl hover:bg-muted transition-all hover:scale-[1.02]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={formData.studentIds.length === 0 || !formData.topics || !formData.actions}
                className="flex-1 bg-gradient-to-r from-brand-purple to-brand-purple-medium hover:from-brand-purple-medium hover:to-brand-purple-dark disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-apple-lg font-semibold"
              >
                <Save className="w-5 h-5" />
                Salvar Call
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
