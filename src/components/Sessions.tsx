
import React, { useState } from 'react';
import { Plus, Filter, Calendar, Users, Tag, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMentoringContext } from '../contexts/MentoringContext';

export const Sessions: React.FC = () => {
  const { mentorias, students } = useMentoringContext();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'all' | 'agendada' | 'completa' | 'em-andamento' | 'cancelada'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | '1:1' | 'grupo'>('all');
  const [studentFilter, setStudentFilter] = useState<string>('all');

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student?.name || 'Desconhecido';
  };

  const filteredSessions = mentorias.filter(session => {
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    const matchesType = typeFilter === 'all' || session.type === typeFilter;
    const matchesStudent = studentFilter === 'all' || session.studentId === studentFilter;
    return matchesStatus && matchesType && matchesStudent;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completa': return 'bg-green-100 text-green-800';
      case 'em-andamento': return 'bg-yellow-100 text-yellow-800';
      case 'agendada': return 'bg-blue-100 text-blue-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === '1:1' ? '👤' : '👥';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sessões de Mentoria</h1>
          <p className="text-gray-600">Gerencie todas as sessões agendadas e realizadas</p>
        </div>
        <button
          onClick={() => navigate('/mentoring/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Sessão
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="font-semibold text-gray-900">Filtros</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="agendada">Agendada</option>
              <option value="completa">Realizada</option>
              <option value="em-andamento">Em Andamento</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Tipos</option>
              <option value="1:1">Individual</option>
              <option value="grupo">Grupo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aluno</label>
            <select
              value={studentFilter}
              onChange={(e) => setStudentFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Alunos</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Data & Hora</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Tipo</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Participante(s)</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Tópicos</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {new Date(session.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-sm text-gray-500">{session.time}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span>{getTypeIcon(session.type)}</span>
                      <span className="capitalize">{session.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{getStudentName(session.studentId)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {session.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {session.recordingUrl && (
                        <a
                          href={session.recordingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                          title="Ver Gravação"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {session.status !== 'completa' && (
                        <button
                          className="text-green-600 hover:text-green-800 text-sm font-medium"
                          title="Marcar como Realizada"
                        >
                          Finalizar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhuma sessão encontrada</p>
          <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros ou criar uma nova sessão</p>
        </div>
      )}
    </div>
  );
};
