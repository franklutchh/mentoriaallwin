
import React, { useState } from 'react';
import { Search, Plus, Filter, TrendingUp, Clock, AlertTriangle, Users, Target, Calendar } from 'lucide-react';
import { StudentCard } from './StudentCard';
import { WeeklyPriorities } from './WeeklyPriorities';
import { useMentoringContext } from '../contexts/MentoringContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { students, mentorias } = useMentoringContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ativo' | 'inativo' | 'sob-revisao' | 'com-pendencia' | 'finalizado'>('all');
  const [groupFilter, setGroupFilter] = useState<string>('all');

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
  const totalSessions = mentorias.length;
  const completedSessions = mentorias.filter(m => m.status === 'completa').length;

  const groups = ['all', ...Array.from(new Set(students.map(s => s.group).filter(Boolean)))];

  return (
    <div className="max-w-7xl mx-auto">
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
            <h3 className="text-sm font-medium text-gray-500">Sessões Realizadas</h3>
            <Calendar className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">{totalSessions}</p>
          <p className="text-sm text-gray-600 mt-1">{completedSessions} finalizadas</p>
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
          <p className="text-sm text-gray-600 mt-1">Alunos com &lt; 70% conclusão</p>
        </div>
      </div>

      {/* WeeklyPriorities Component */}
      <WeeklyPriorities />

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
            <p className="text-2xl font-bold text-green-600">{totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0}%</p>
            <p className="text-sm text-gray-600">Sessões Completas</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{(totalSessions / Math.max(activeStudents, 1)).toFixed(1)}</p>
            <p className="text-sm text-gray-600">Sessões/Aluno</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{mentorias.filter(m => m.tags.includes('trafego')).length}</p>
            <p className="text-sm text-gray-600">Sessões Tráfego</p>
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
