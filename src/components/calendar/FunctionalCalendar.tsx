
import React, { useState } from 'react';
import { useCallsContext } from '../../contexts/CallsContext';
import { CalendarHeader } from './CalendarHeader';
import { WeekView } from './WeekView';
import { UpcomingSessions } from './UpcomingSessions';
import { CallScheduler } from './CallScheduler';
import { getDaysInWeek } from '../../utils/dateUtils';

export const FunctionalCalendar: React.FC = () => {
  const { calls, students } = useCallsContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showScheduler, setShowScheduler] = useState(false);

  const daysInWeek = getDaysInWeek(currentDate);

  // Convert calls to sessions format for compatibility
  const sessions = calls.map(call => {
    const student = students.find(s => s.id === call.studentId);
    return {
      id: call.id,
      title: `${call.type === '1:1' ? 'Individual' : 'Group'} Call - ${student?.name || 'Unknown'}`,
      date: call.date,
      time: call.time,
      type: call.type,
      discordLink: call.sessionLink,
      objective: call.topics,
      students: student ? [student.name] : [],
      status: call.status,
      callId: call.id
    };
  });

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-8">
      <CalendarHeader
        currentDate={currentDate}
        onNavigate={navigateWeek}
        onNewCall={() => setShowScheduler(true)}
      />

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <WeekView daysInWeek={daysInWeek} sessions={sessions} />
      </div>

      <UpcomingSessions sessions={sessions} />

      {showScheduler && (
        <CallScheduler
          onClose={() => setShowScheduler(false)}
          students={students}
          initialDate={currentDate}
        />
      )}
    </div>
  );
};
