
import React from 'react';
import { SessionCard } from './SessionCard';
import { Session } from '../../types/session';
import { weekDays, getSessionsForDate } from '../../utils/dateUtils';

interface WeekViewProps {
  daysInWeek: Date[];
  sessions: Session[];
}

export const WeekView: React.FC<WeekViewProps> = ({ daysInWeek, sessions }) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-7 gap-4">
        {daysInWeek.map((day, index) => {
          const daySessions = getSessionsForDate(sessions, day);
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
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
