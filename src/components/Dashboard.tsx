
import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { StudentCard } from './StudentCard';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  whatsapp: string;
  instagram: string;
  status: 'ativo' | 'inativo';
  entryDate: string;
  lastSession?: string;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ativo' | 'inativo'>('all');

  // Mock data - será substituído por dados reais do Supabase
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Ana Silva',
      whatsapp: '+55 11 99999-9999',
      instagram: '@ana.silva',
      status: 'ativo',
      entryDate: '2024-01-15',
      lastSession: '2024-01-20'
    },
    {
      id: '2',
      name: 'Carlos Santos',
      whatsapp: '+55 11 88888-8888',
      instagram: '@carlos.santos',
      status: 'ativo',
      entryDate: '2024-01-10',
      lastSession: '2024-01-18'
    },
    {
      id: '3',
      name: 'Maria Oliveira',
      whatsapp: '+55 11 77777-7777',
      instagram: '@maria.oliveira',
      status: 'inativo',
      entryDate: '2023-12-01',
      lastSession: '2023-12-15'
    }
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeStudents = students.filter(s => s.status === 'ativo').length;
  const totalStudents = students.length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Gerencie seus alunos e acompanhe o progresso da mentoria</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total de Alunos</h3>
          <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Alunos Ativos</h3>
          <p className="text-3xl font-bold text-green-600">{activeStudents}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Sessões esta Semana</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar aluno..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'ativo' | 'inativo')}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
              </select>
            </div>
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

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum aluno encontrado</p>
        </div>
      )}
    </div>
  );
};
