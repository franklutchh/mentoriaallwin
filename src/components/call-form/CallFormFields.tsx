
import React from 'react';
import { Calendar, Clock, Phone } from 'lucide-react';

interface CallFormFieldsProps {
  formData: {
    date: string;
    time: string;
    type: '1:1' | 'grupo';
    topics: string;
    actions: string;
    recordingUrl: string;
    sessionLink: string;
    status: 'completa' | 'em-andamento' | 'precisa-revisao';
  };
  onChange: (field: string, value: string) => void;
}

export const CallFormFields: React.FC<CallFormFieldsProps> = ({
  formData,
  onChange
}) => {
  return (
    <>
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
            onChange={(e) => onChange('date', e.target.value)}
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
            onChange={(e) => onChange('time', e.target.value)}
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
            onChange={(e) => onChange('type', e.target.value)}
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
          onChange={(e) => onChange('sessionLink', e.target.value)}
          className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
          placeholder="https://discord.gg/... ou https://meet.google.com/..."
        />
      </div>

      {/* Topics */}
      <div className="space-y-3">
        <label className="font-semibold text-foreground">Tópicos Discutidos *</label>
        <textarea
          required
          rows={4}
          value={formData.topics}
          onChange={(e) => onChange('topics', e.target.value)}
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
          onChange={(e) => onChange('actions', e.target.value)}
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
            onChange={(e) => onChange('recordingUrl', e.target.value)}
            className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
            placeholder="https://..."
          />
        </div>

        <div className="space-y-3">
          <label className="font-semibold text-foreground">Status</label>
          <select
            value={formData.status}
            onChange={(e) => onChange('status', e.target.value)}
            className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
          >
            <option value="em-andamento">Em Andamento</option>
            <option value="completa">Completa</option>
            <option value="precisa-revisao">Precisa Revisão</option>
          </select>
        </div>
      </div>
    </>
  );
};
