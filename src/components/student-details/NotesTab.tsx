
import React from 'react';

interface NotesTabProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export const NotesTab: React.FC<NotesTabProps> = ({ notes, onNotesChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Anotações</h2>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="w-full h-96 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        placeholder="Digite suas anotações aqui..."
      />
      <div className="flex justify-end mt-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Salvar Anotações
        </button>
      </div>
    </div>
  );
};
