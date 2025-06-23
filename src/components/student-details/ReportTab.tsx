
import React from 'react';
import { Download, TrendingUp, Target, Clock, AlertCircle } from 'lucide-react';
import { Student, Mentoring, ActionItem, FollowUpItem } from '../../types/student';

interface ReportTabProps {
  student: Student;
  mentorias: Mentoring[];
  actionItems: ActionItem[];
  followUpItems: FollowUpItem[];
  onExportReport: () => void;
}

export const ReportTab: React.FC<ReportTabProps> = ({ 
  student, 
  mentorias, 
  actionItems, 
  followUpItems, 
  onExportReport 
}) => {
  const progressPercentage = student.totalTasks ? Math.round((student.tasksCompleted! / student.totalTasks) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Relatório Completo</h2>
        <button 
          onClick={onExportReport}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar PDF
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-blue-600">{mentorias.length}</p>
          <p className="text-sm text-gray-600">Total de Sessões</p>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{progressPercentage}%</p>
          <p className="text-sm text-gray-600">Progresso Geral</p>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-600">{actionItems.filter(a => a.status === 'em-progresso').length}</p>
          <p className="text-sm text-gray-600">Tarefas em Andamento</p>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-red-600">{followUpItems.filter(f => !f.completed).length}</p>
          <p className="text-sm text-gray-600">Follow-ups Pendentes</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumo de Performance</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              {student.name} está com performance {progressPercentage >= 80 ? 'excelente' : progressPercentage >= 60 ? 'boa' : 'que precisa de atenção'}.
              Já participou de {mentorias.length} sessões de mentoria e completou {student.tasksCompleted} de {student.totalTasks} tarefas do plano de ação.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Próximos Passos Recomendados</h3>
          <ul className="space-y-2">
            {actionItems.filter(a => a.status === 'pendente').map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
