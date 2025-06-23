
import React, { useState } from 'react';
import { Search, Plus, Filter, TrendingUp, Clock, AlertTriangle, Users, Target, Calendar } from 'lucide-react';
import { StudentCard } from './StudentCard';
import { useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  name: string;
  whatsapp: string;
  instagram: string;
  status: 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia';
  entryDate: string;
  lastSession?: string;
  group?: string;
  tags?: string[];
  tasksCompleted?: number;
  totalTasks?: number;
  favorite?: boolean;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia'>('all');
  const [groupFilter, setGroupFilter] = useState<string>('all');

  // Mock data expandido
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Ana Silva',
      whatsapp: '+55 11 99999-9999',
      instagram: '@ana.silva',
      status: 'ativo',
      entryDate: '2024-01-15',
      lastSession: '2024-01-20',
      group: 'Turma A',
      tags: ['trafego', 'copy'],
      tasksCompleted: 8,
      totalTasks: 12,
      favorite: true
    },
    {
      id: '2',
      name: 'Carlos Santos',
      whatsapp: '+55 11 88888-8888',
      instagram: '@carlos.santos',
      status: 'com-pendencia',
      entryDate: '2024-01-10',
      lastSession: '2024-01-18',
      group: 'Turma A',
      tags: ['mentalidade', 'funil'],
      tasksCompleted: 3,
      totalTasks: 10
    },
    {
      id: '3',
      name: 'Maria Oliveira',
      whatsapp: '+55 11 77777-7777',
      instagram: '@maria.oliveira',
      status: 'sob-revisao',
      entryDate: '2023-12-01',
      lastSession: '2023-12-15',
      group: 'Turma B',
      tags: ['copy'],
      tasksCompleted: 15,
      totalTasks: 15
    }
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesGroup = groupFilter === 'all' || student.group === groupFilter;
    return matchesSearch && matchesStatus && matchesGroup;
  });

  const activeStudents = students.filter(s => s.status === 'ativo').length;
  const totalStudents = students.length;
  const pendingStudents = students.filter(s => s.status === 'com-pendencia').length;
  const studentsWithDelayedTasks = students.filter(s => s.tasksCompleted! < s.totalTasks! * 0.7).length;

  const groups = ['all', ...Array.from(new Set(students.map(s => s.group).filter(Boolean)))];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Produtividade</h1>
        <p className="text-gray-600">Visão estratégica da operação de mentoria</p>
      </div>

      {/* Productivity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total de Alunos</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
          <p className="text-sm text-gray-600 mt-1">{activeStudents} ativos</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Sessões esta Semana</h3>
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">12</p>
          <p className="text-sm text-gray-600 mt-1">3 pendentes de registro</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Com Pendências</h3>
            <AlertTriangle className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{pendingStudents}</p>
          <p className="text-sm text-gray-600 mt-1">Necessitam atenção</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Tarefas em Atraso</h3>
            <Clock className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600">{studentsWithDelayedTasks}</p>
          <p className="text-sm text-gray-600 mt-1">Alunos com < 70% conclusão</p>
        </div>
      </div>

      {/* Advanced Filters */}
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

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Resumo de Performance</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{Math.round((activeStudents / totalStudents) * 100)}%</p>
            <p className="text-sm text-gray-600">Taxa de Atividade</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">87%</p>
            <p className="text-sm text-gray-600">Conclusão Média</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">4.2</p>
            <p className="text-sm text-gray-600">Sessions/Semana</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">24h</p>
            <p className="text-sm text-gray-600">Tempo Médio</p>
          </div>
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
          <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros de busca</p>
        </div>
      )}
    </div>
  );
};
