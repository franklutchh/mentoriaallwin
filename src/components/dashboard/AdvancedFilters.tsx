
import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdvancedFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: 'all' | 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia' | 'finalizado';
  setStatusFilter: (status: 'all' | 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia' | 'finalizado') => void;
  groupFilter: string;
  setGroupFilter: (group: string) => void;
  groups: string[];
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  groupFilter,
  setGroupFilter,
  groups
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center flex-1 w-full lg:w-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nome ou tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos Status</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
              <option value="sob-revisao">Sob Revisão</option>
              <option value="com-pendencia">Com Pendência</option>
              <option value="finalizado">Finalizados</option>
            </select>
          </div>

          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todas as Turmas</option>
            {groups.slice(1).map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={() => navigate('/students/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Adicionar Aluno
        </button>
      </div>
    </div>
  );
};
