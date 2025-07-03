
import React from 'react';
import { StudentCard } from '../StudentCard';
import { Student } from '../../types/student';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudentsGridProps {
  students: Student[];
}

export const StudentsGrid: React.FC<StudentsGridProps> = ({ students }) => {
  const navigate = useNavigate();

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <Plus className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Nenhum aluno cadastrado
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Comece adicionando seu primeiro aluno ao sistema
        </p>
        <button
          onClick={() => navigate('/students/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
        >
          <Plus className="w-5 h-5" />
          Adicionar Primeiro Aluno
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} />
      ))}
    </div>
  );
};
