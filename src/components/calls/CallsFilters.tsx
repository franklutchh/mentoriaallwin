
import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Student } from '../../types/student';

interface CallsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: 'all' | 'agendada' | 'completa' | 'em-andamento' | 'cancelada';
  setStatusFilter: (status: 'all' | 'agendada' | 'completa' | 'em-andamento' | 'cancelada') => void;
  typeFilter: 'all' | '1:1' | 'grupo';
  setTypeFilter: (type: 'all' | '1:1' | 'grupo') => void;
  studentFilter: string;
  setStudentFilter: (studentId: string) => void;
  students: Student[];
  filteredCallsCount: number;
}

export const CallsFilters: React.FC<CallsFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  studentFilter,
  setStudentFilter,
  students,
  filteredCallsCount
}) => {
  return (
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
        {filteredCallsCount} call{filteredCallsCount !== 1 ? 's' : ''} encontrada{filteredCallsCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};
