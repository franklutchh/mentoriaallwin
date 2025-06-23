
import React from 'react';

interface StudentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const StudentTabs: React.FC<StudentTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'resumo', label: 'Resumo' },
    { id: 'mentorias', label: 'Mentorias' },
    { id: 'plano', label: 'Plano de Ação' },
    { id: 'follow-up', label: 'Follow-up' },
    { id: 'relatorio', label: 'Relatório' },
    { id: 'notas', label: 'Notas' }
  ];

  return (
    <div className="border-b border-gray-200 mb-8">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
