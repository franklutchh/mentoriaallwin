
import React from 'react';
import { User, MessageCircle, Instagram, Calendar } from 'lucide-react';
import { Student, Mentoring } from '../../types/student';
import { formatDate } from '../../utils/studentUtils';

interface OverviewTabProps {
  student: Student;
  mentorias: Mentoring[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ student, mentorias }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações do Aluno</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Nome Completo</p>
              <p className="font-medium text-gray-900">{student.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">WhatsApp</p>
              <p className="font-medium text-gray-900">{student.whatsapp}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Instagram className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Instagram</p>
              <p className="font-medium text-gray-900">{student.instagram}</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Data de Entrada</p>
              <p className="font-medium text-gray-900">{formatDate(student.entryDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <div className={`w-3 h-3 rounded-full ${student.status === 'ativo' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium text-gray-900 capitalize">{student.status}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Total de Mentorias</p>
              <p className="font-medium text-gray-900">{mentorias.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
