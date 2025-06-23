
import React from 'react';
import { Clock, Users, Video } from 'lucide-react';
import { Session } from '../../types/session';

interface SessionCardProps {
  session: Session;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  return (
    <div
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
  );
};
