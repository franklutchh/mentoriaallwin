
import React from 'react';
import { StudentCard } from '../StudentCard';
import { Student } from '../../types/student';

interface StudentsGridProps {
  students: Student[];
}

export const StudentsGrid: React.FC<StudentsGridProps> = ({ students }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {students.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum aluno encontrado</p>
          <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros de busca</p>
        </div>
      )}
    </>
  );
};
