
import React from 'react';
import { Call } from '../../types/student';
import { formatDate } from '../../utils/studentUtils';
import { Phone, ExternalLink, Calendar, Tag } from 'lucide-react';

interface CallsTabProps {
  calls: Call[];
}

export const CallsTab: React.FC<CallsTabProps> = ({ calls }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completa': return 'bg-green-100 text-green-800 border-green-200';
      case 'em-andamento': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'agendada': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'precisa-revisao': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completa': return 'Completa';
      case 'em-andamento': return 'Em Andamento';
      case 'agendada': return 'Agendada';
      case 'precisa-revisao': return 'Precisa Revisão';
      default: return status;
    }
  };

  if (calls.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-purple/10 to-brand-purple-medium/10 flex items-center justify-center mx-auto mb-4">
          <Phone className="w-10 h-10 text-brand-purple" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Nenhuma call registrada</h3>
        <p className="text-muted-foreground">As calls deste aluno aparecerão aqui</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {calls.map((call) => (
        <div 
          key={call.id} 
          className="bg-card/60 backdrop-blur-xl rounded-2xl shadow-apple-lg border border-border/50 p-6 hover:shadow-apple-xl transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                call.type === '1:1' 
                  ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600' 
                  : 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600'
              }`}>
                {call.type === '1:1' ? <Phone className="w-6 h-6" /> : '👥'}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{formatDate(call.date)}</h3>
                  <span className="text-sm text-muted-foreground">{call.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 text-xs rounded-full font-medium border ${
                    call.type === '1:1' 
                      ? 'bg-blue-100 text-blue-800 border-blue-200' 
                      : 'bg-purple-100 text-purple-800 border-purple-200'
                  }`}>
                    {call.type === '1:1' ? 'Call Individual' : 'Call em Grupo'}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 text-xs rounded-full font-medium border ${getStatusColor(call.status)}`}>
                    {getStatusLabel(call.status)}
                  </span>
                </div>
              </div>
            </div>
            {call.recordingUrl && (
              <a
                href={call.recordingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-purple hover:text-brand-purple-medium text-sm font-medium transition-colors hover:scale-105 transform duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Ver Gravação
              </a>
            )}
          </div>

          {call.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {call.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-brand-purple/10 text-brand-purple font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-purple" />
                Tópicos Discutidos
              </h4>
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-muted-foreground leading-relaxed">{call.topics}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-purple" />
                Ações Combinadas
              </h4>
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-muted-foreground leading-relaxed">{call.actions}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
