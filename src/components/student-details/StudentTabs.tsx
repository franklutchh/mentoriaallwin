
import React from 'react';

interface StudentTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const StudentTabs: React.FC<StudentTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'resumo', label: 'Resumo' },
    { id: 'calls', label: 'Calls' },
    { id: 'plano', label: 'Plano de Ação' },
    { id: 'follow-up', label: 'Follow-up' },
    { id: 'relatorio', label: 'Relatório' },
    { id: 'notas', label: 'Notas' }
  ];

  return (
    <div className="border-b border-border/30 mb-8">
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-3 px-1 border-b-2 font-semibold text-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id
                ? 'border-brand-purple text-brand-purple'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
