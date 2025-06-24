
import React from 'react';
import { ActionDashboard } from './dashboard/ActionDashboard';

export const Dashboard: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-full mx-auto">
        <ActionDashboard />
      </div>
    </div>
  );
};
