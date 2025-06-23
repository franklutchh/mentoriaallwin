
import React, { useState } from 'react';
import { Plus, Filter, Calendar, Users, Tag, ExternalLink, Phone, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCallsContext } from '../contexts/CallsContext';

export const Calls: React.FC = () => {
  const { calls, students } = useCallsContext();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'all' | 'agendada' | 'completa' | 'em-andamento' | 'cancelada'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | '1:1' | 'grupo'>('all');
  const [studentFilter, setStudentFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student?.name || 'Desconhecido';
  };

  const filteredCalls = calls.filter(call => {
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    const matchesType = typeFilter === 'all' || call.type === typeFilter;
    const matchesStudent = studentFilter === 'all' || call.studentId === studentFilter;
    const matchesSearch = searchTerm === '' || 
      getStudentName(call.studentId).toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.topics.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesType && matchesStudent && matchesSearch;
  });

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-purple-medium flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Calls</h1>
              <p className="text-muted-foreground mt-1">Gerencie todas as calls realizadas e agendadas</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/calls/new')}
          className="bg-gradient-to-r from-brand-purple to-brand-purple-medium hover:from-brand-purple-medium hover:to-brand-purple-dark text-white px-6 py-3 rounded-xl flex items-center gap-3 transition-all hover:scale-105 shadow-apple-lg font-semibold"
        >
          <Plus className="w-5 h-5" />
          Nova Call
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-card/60 backdrop-blur-xl rounded-2xl shadow-apple-lg border border-border/50 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-brand-purple" />
          <h3 className="font-semibold text-foreground text-lg">Filtros</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Buscar</label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por aluno, tópico ou tag..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
            >
              <option value="all">Todos os Status</option>
              <option value="agendada">Agendada</option>
              <option value="completa">Realizada</option>
              <option value="em-andamento">Em Andamento</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tipo</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
            >
              <option value="all">Todos os Tipos</option>
              <option value="1:1">Individual</option>
              <option value="grupo">Grupo</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Aluno</label>
            <select
              value={studentFilter}
              onChange={(e) => setStudentFilter(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
            >
              <option value="all">Todos os Alunos</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          {filteredCalls.length} call{filteredCalls.length !== 1 ? 's' : ''} encontrada{filteredCalls.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Calls Grid */}
      {filteredCalls.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCalls.map((call) => (
            <div
              key={call.id}
              className="bg-card/60 backdrop-blur-xl rounded-2xl shadow-apple-lg border border-border/50 p-6 hover:shadow-apple-xl hover:scale-[1.02] transition-all duration-300 group"
            >
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
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-purple/10 to-brand-purple-medium/10 flex items-center justify-center mx-auto mb-4">
            <Phone className="w-10 h-10 text-brand-purple" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Nenhuma call encontrada</h3>
          <p className="text-muted-foreground mb-6">Tente ajustar os filtros ou criar uma nova call</p>
          <button
            onClick={() => navigate('/calls/new')}
            className="bg-gradient-to-r from-brand-purple to-brand-purple-medium text-white px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Nova Call
          </button>
        </div>
      )}
    </div>
  );
};
