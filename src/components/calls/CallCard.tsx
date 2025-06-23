
import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { Call, Student } from '../../types/student';

interface CallCardProps {
  call: Call;
  getStudentName: (studentId: string) => string;
}

export const CallCard: React.FC<CallCardProps> = ({ call, getStudentName }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completa': return 'bg-green-100 text-green-800 border-green-200';
      case 'em-andamento': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'agendada': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelada': return 'bg-red-100 text-red-800 border-red-200';
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

  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-2xl shadow-apple-lg border border-border/50 p-6 hover:shadow-apple-xl hover:scale-[1.02] transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            call.type === '1:1' 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-purple-100 text-purple-600'
          }`}>
            {call.type === '1:1' ? '👤' : '👥'}
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-brand-purple-medium transition-colors">
              {getStudentName(call.studentId)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {new Date(call.date).toLocaleDateString('pt-BR')} às {call.time}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(call.status)}`}>
          {getStatusLabel(call.status)}
        </span>
      </div>

      {/* Tags */}
      {call.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {call.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-brand-purple/10 text-brand-purple text-xs rounded-full font-medium"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
          {call.tags.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{call.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="space-y-3 mb-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-1">Tópicos</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{call.topics}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border/30">
        <div className="flex items-center gap-2">
          {call.recordingUrl && (
            <a
              href={call.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-brand-purple hover:text-brand-purple-medium text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Gravação
            </a>
          )}
        </div>
        <div className="text-xs text-muted-foreground">
          Call {call.type === '1:1' ? 'Individual' : 'em Grupo'}
        </div>
      </div>
    </div>
  );
};
