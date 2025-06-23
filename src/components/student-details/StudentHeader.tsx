
import React from 'react';
import { ArrowLeft, Plus, Star, Download, Phone } from 'lucide-react';
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
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-all hover:scale-105 transform duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Voltar ao Dashboard</span>
      </button>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-purple-medium flex items-center justify-center">
            <span className="text-white font-bold text-2xl">{student.name.charAt(0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-4xl font-bold text-foreground">{student.name}</h1>
              <Star className="w-7 h-7 text-yellow-500 cursor-pointer hover:scale-110 transition-transform hover:text-yellow-600" />
            </div>
            <p className="text-muted-foreground text-lg">Mentoria individual • {student.group}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {student.tags?.map((tag, index) => (
                <span key={index} className="px-3 py-1 text-sm rounded-full bg-brand-purple/10 text-brand-purple font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onExportReport}
            className="bg-muted hover:bg-muted/80 text-foreground px-5 py-3 rounded-xl flex items-center gap-3 transition-all hover:scale-105 font-medium"
          >
            <Download className="w-4 h-4" />
            Exportar Relatório
          </button>
          <button
            onClick={() => navigate('/calls/new', { state: { studentId: student.id } })}
            className="bg-gradient-to-r from-brand-purple to-brand-purple-medium hover:from-brand-purple-medium hover:to-brand-purple-dark text-white px-5 py-3 rounded-xl flex items-center gap-3 transition-all hover:scale-105 shadow-apple-lg font-semibold"
          >
            <Phone className="w-4 h-4" />
            Nova Call
          </button>
        </div>
      </div>
    </div>
  );
};
