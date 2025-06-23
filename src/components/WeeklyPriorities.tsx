import React from 'react';
import { AlertTriangle, Clock, Calendar, TrendingDown } from 'lucide-react';
import { useMentoringContext } from '../contexts/useMentoringContext';
import { useNavigate } from 'react-router-dom';

export const WeeklyPriorities: React.FC = () => {
  const { getWeeklyPriorities, getDaysRemaining } = useMentoringContext();
  const navigate = useNavigate();
  const priorities = getWeeklyPriorities();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-orange-600" />
        <h2 className="text-xl font-semibold text-gray-900">Prioridades da Semana</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progresso Baixo */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">Progresso &lt; 50%</h3>
          </div>
          <div className="space-y-2">
            {priorities.lowProgress.length === 0 ? (
              <p className="text-sm text-red-600">Nenhum aluno com baixo progresso</p>
            ) : (
              priorities.lowProgress.map(student => (
                <div
                  key={student.id}
                  onClick={() => navigate(`/students/${student.id}`)}
                  className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:bg-red-50"
                >
                  <span className="text-sm font-medium text-gray-900">{student.name}</span>
                  <span className="text-xs text-red-600">
                    {student.totalTasks ? Math.round((student.tasksCompleted! / student.totalTasks) * 100) : 0}%
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sem Sessão Recente */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800">Sem Sessão +10 dias</h3>
          </div>
          <div className="space-y-2">
            {priorities.noRecentSession.length === 0 ? (
              <p className="text-sm text-yellow-600">Todos os alunos em dia</p>
            ) : (
              priorities.noRecentSession.map(student => (
                <div
                  key={student.id}
                  onClick={() => navigate(`/students/${student.id}`)}
                  className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:bg-yellow-50"
                >
                  <span className="text-sm font-medium text-gray-900">{student.name}</span>
                  <span className="text-xs text-yellow-600">Agendar</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Último Mês */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-orange-800">Último Mês</h3>
          </div>
          <div className="space-y-2">
            {priorities.lastMonth.length === 0 ? (
              <p className="text-sm text-orange-600">Nenhum aluno no último mês</p>
            ) : (
              priorities.lastMonth.map(student => (
                <div
                  key={student.id}
                  onClick={() => navigate(`/students/${student.id}`)}
                  className="flex items-center justify-between p-2 bg-white rounded border cursor-pointer hover:bg-orange-50"
                >
                  <span className="text-sm font-medium text-gray-900">{student.name}</span>
                  <span className="text-xs text-orange-600">
                    {getDaysRemaining(student.id)} dias
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
