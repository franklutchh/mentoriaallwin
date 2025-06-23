
import React from 'react';
import { ActionDashboard } from './dashboard/ActionDashboard';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <ActionDashboard />
      </div>
    </div>
  );
};
