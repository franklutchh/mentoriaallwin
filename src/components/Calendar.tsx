
import React from 'react';
import { FunctionalCalendar } from './calendar/FunctionalCalendar';

export const Calendar: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <FunctionalCalendar />
      </div>
    </div>
  );
};
