
import React from 'react';
import { Trophy, Star, Target, Zap, Award, TrendingUp } from 'lucide-react';
import { Student } from '../../types/student';

interface GamificationDashboardProps {
  students: Student[];
}

export const GamificationDashboard: React.FC<GamificationDashboardProps> = ({ students }) => {
  const topPerformers = students
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'iniciante': return 'from-gray-500 to-gray-600';
      case 'intermediario': return 'from-blue-500 to-blue-600';
      case 'avancado': return 'from-purple-500 to-purple-600';
      case 'expert': return 'from-gold-500 to-yellow-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'iniciante': return 'Iniciante';
      case 'intermediario': return 'Intermediário';
      case 'avancado': return 'Avançado';
      case 'expert': return 'Expert';
      default: return 'Iniciante';
    }
  };

  const totalPoints = students.reduce((sum, student) => sum + student.points, 0);
  const averageEngagement = students.reduce((sum, student) => sum + student.engagementScore, 0) / students.length;

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100/50 dark:border-gray-700/50 p-8 transition-all duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Gamificação & Engajamento</h2>
          <p className="text-gray-600 dark:text-gray-300">Motive seus alunos e acelere resultados</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Métricas Gerais */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-amber-100/50 dark:border-amber-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-900 dark:text-amber-100">Pontos Totais</h3>
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{totalPoints.toLocaleString()}</p>
              </div>
            </div>
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <TrendingUp className="w-4 h-4" />
                <span>Totalizados</span>
              </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-100/50 dark:border-green-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-900 dark:text-green-100">Engajamento Médio</h3>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">{averageEngagement.toFixed(1)}%</p>
              </div>
            </div>
            <div className="w-full bg-green-200/50 dark:bg-green-800/30 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${averageEngagement}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-purple-100/50 dark:border-purple-800/50">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100">Top Performers</h3>
          </div>
          
          <div className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center gap-4 p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{student.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getLevelColor(student.level)}`}>
                      {getLevelLabel(student.level)}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{student.badges.length} badges</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{student.points}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">pontos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Distribuição por Nível */}
      <div className="bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-2xl p-6 border border-slate-100/50 dark:border-slate-800/50">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Distribuição por Nível</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['iniciante', 'intermediario', 'avancado', 'expert'].map((level) => {
            const count = students.filter(s => s.level === level).length;
            const percentage = (count / students.length) * 100;
            
            return (
              <div key={level} className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${getLevelColor(level)} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-lg">{count}</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{getLevelLabel(level)}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{percentage.toFixed(1)}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
