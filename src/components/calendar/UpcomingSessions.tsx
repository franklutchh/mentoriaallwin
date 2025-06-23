
import React from 'react';
import { Session } from '../../types/session';

interface UpcomingSessionsProps {
  sessions: Session[];
}

export const UpcomingSessions: React.FC<UpcomingSessionsProps> = ({ sessions }) => {
  return (
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
  );
};
