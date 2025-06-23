
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Users, Video } from 'lucide-react';

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  type: '1:1' | 'grupo';
  discordLink?: string;
  objective: string;
  students: string[];
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');

  // Mock data
  const sessions: Session[] = [
    {
      id: '1',
      title: 'Mentoria Individual - Ana Silva',
      date: '2024-01-22',
      time: '14:00',
      type: '1:1',
      discordLink: 'https://discord.gg/example',
      objective: 'Revisão de objetivos e planejamento estratégico',
      students: ['Ana Silva']
    },
    {
      id: '2',
      title: 'Mentoria em Grupo - Networking',
      date: '2024-01-23',
      time: '19:00',
      type: 'grupo',
      discordLink: 'https://discord.gg/example2',
      objective: 'Workshop sobre networking e relacionamentos profissionais',
      students: ['Carlos Santos', 'Maria Oliveira']
    },
    {
      id: '3',
      title: 'Mentoria Individual - Carlos Santos',
      date: '2024-01-25',
      time: '16:00',
      type: '1:1',
      objective: 'Análise de progresso e próximos passos',
      students: ['Carlos Santos']
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      month: 'long',
      year: 'numeric'
    });
  };

  const getDaysInWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const week = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sessions.filter(session => session.date === dateStr);
  };

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const daysInWeek = getDaysInWeek(currentDate);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agenda</h1>
            <p className="text-gray-600 mt-1">Gerencie suas sessões de mentoria</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" />
            Nova Call
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Calendar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateWeek('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {formatDate(currentDate)}
              </h2>
              <button
                onClick={() => navigateWeek('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('week')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  view === 'week'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Semana
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  view === 'month'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Mês
              </button>
            </div>
          </div>
        </div>

        {/* Weekly View */}
        {view === 'week' && (
          <div className="p-6">
            <div className="grid grid-cols-7 gap-4">
              {daysInWeek.map((day, index) => {
                const daySessions = getSessionsForDate(day);
                const isToday = day.toDateString() === new Date().toDateString();
                
                return (
                  <div
                    key={index}
                    className={`min-h-[300px] border rounded-lg p-4 ${
                      isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-500">{weekDays[index]}</p>
                      <p className={`text-lg font-semibold ${
                        isToday ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {day.getDate()}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {daySessions.map((session) => (
                        <div
                          key={session.id}
                          className={`p-3 rounded-lg border-l-4 ${
                            session.type === '1:1'
                              ? 'bg-blue-100 border-l-blue-500'
                              : 'bg-purple-100 border-l-purple-500'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                              {session.title}
                            </h4>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              {session.time}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Users className="w-3 h-3" />
                              {session.students.length} aluno{session.students.length > 1 ? 's' : ''}
                            </div>
                            {session.discordLink && (
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                <Video className="w-3 h-3" />
                                <a href={session.discordLink} className="text-blue-600 hover:underline">
                                  Discord
                                </a>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                            {session.objective}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Sessions */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Sessões</h3>
        <div className="space-y-4">
          {sessions.slice(0, 3).map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{session.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{session.objective}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>{new Date(session.date).toLocaleDateString('pt-BR')} às {session.time}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    session.type === '1:1' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {session.type === '1:1' ? 'Individual' : 'Grupo'}
                  </span>
                </div>
              </div>
              {session.discordLink && (
                <a
                  href={session.discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Entrar no Discord
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
