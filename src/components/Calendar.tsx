
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { WeekView } from './calendar/WeekView';
import { UpcomingSessions } from './calendar/UpcomingSessions';
import { Session } from '../types/session';
import { formatDate, getDaysInWeek } from '../utils/dateUtils';

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
          <WeekView daysInWeek={daysInWeek} sessions={sessions} />
        )}
      </div>

      <UpcomingSessions sessions={sessions} />
    </div>
  );
};
