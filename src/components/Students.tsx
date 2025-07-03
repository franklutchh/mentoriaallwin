
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMentoringContext } from '../contexts/MentoringContext';
import { StudentCard } from './StudentCard';
import { AdvancedFilters } from './dashboard/AdvancedFilters';

export const Students: React.FC = () => {
  const { students } = useMentoringContext();
  const navigate = useNavigate();
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

  const groups = ['all', ...Array.from(new Set(students.map(s => s.group).filter(Boolean)))];

  return (
    <div className="max-w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Alunos</h1>
          <p className="text-gray-600 text-sm">Gerencie todos os alunos do programa de mentoria</p>
        </div>
        <button
          onClick={() => navigate('/students/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Adicionar Aluno
        </button>
      </div>

      <AdvancedFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        groupFilter={groupFilter}
        setGroupFilter={setGroupFilter}
        groups={groups}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-base">Nenhum aluno encontrado</p>
          <p className="text-gray-400 text-sm mt-1">Tente ajustar os filtros de busca</p>
        </div>
      )}
    </div>
  );
};
