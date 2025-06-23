
import React from 'react';
import { ArrowLeft, Plus, Star, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../../types/student';

interface StudentHeaderProps {
  student: Student;
  onExportReport: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ student, onExportReport }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao Dashboard
      </button>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">{student.name}</h1>
              <Star className="w-6 h-6 text-yellow-500 cursor-pointer hover:scale-110 transition-transform" />
            </div>
            <p className="text-gray-600 mt-1">Mentoria individual - {student.group}</p>
            <div className="flex items-center gap-2 mt-2">
              {student.tags?.map((tag, index) => (
                <span key={index} className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-700 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onExportReport}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar Relatório
          </button>
          <button
            onClick={() => navigate('/mentoring/new', { state: { studentId: student.id } })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nova Mentoria
          </button>
        </div>
      </div>
    </div>
  );
};
