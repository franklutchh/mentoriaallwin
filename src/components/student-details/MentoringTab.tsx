
import React from 'react';
import { Mentoring } from '../../types/student';
import { formatDate } from '../../utils/studentUtils';

interface MentoringTabProps {
  mentorias: Mentoring[];
}

export const MentoringTab: React.FC<MentoringTabProps> = ({ mentorias }) => {
  return (
    <div className="space-y-6">
      {mentorias.map((mentoria) => (
        <div key={mentoria.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900">{formatDate(mentoria.date)}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                  mentoria.type === '1:1' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {mentoria.type === '1:1' ? 'Call Individual' : 'Call em Grupo'}
                </span>
                <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                  mentoria.status === 'completa' ? 'bg-green-100 text-green-800' :
                  mentoria.status === 'em-andamento' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {mentoria.status === 'completa' ? 'Completa' :
                   mentoria.status === 'em-andamento' ? 'Em Andamento' : 'Precisa Revisão'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {mentoria.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            {mentoria.recordingUrl && (
              <a
                href={mentoria.recordingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Ver Gravação
              </a>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Tópicos Discutidos</h4>
              <p className="text-gray-600">{mentoria.topics}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Ações Combinadas</h4>
              <p className="text-gray-600">{mentoria.actions}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
