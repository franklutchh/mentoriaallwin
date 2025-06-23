
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const availableTags = [
  'trafego', 'copy', 'mentalidade', 'funil', 'vendas', 'networking', 
  'planejamento', 'objetivos', 'relacionamentos', 'mindset', 'estrategia'
];

interface TagSelectorProps {
  selectedTags: string[];
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  onTagAdd,
  onTagRemove
}) => {
  const [customTag, setCustomTag] = useState('');

  const addCustomTag = () => {
    if (customTag.trim()) {
      onTagAdd(customTag.trim().toLowerCase());
      setCustomTag('');
    }
  };

  return (
    <div className="space-y-4">
      <label className="font-semibold text-foreground">Tags Temáticas</label>
      <div className="flex flex-wrap gap-3">
        {availableTags.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => onTagAdd(tag)}
            disabled={selectedTags.includes(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTags.includes(tag)
                ? 'bg-brand-purple text-white cursor-not-allowed'
                : 'bg-muted hover:bg-brand-purple/10 hover:text-brand-purple border border-border/30 hover:border-brand-purple/50 hover:scale-105'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      
      <div className="flex gap-3">
        <input
          type="text"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          placeholder="Tag personalizada..."
          className="flex-1 px-4 py-3 bg-input border border-border/30 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
        />
        <button
          type="button"
          onClick={addCustomTag}
          className="px-6 py-3 bg-muted hover:bg-brand-purple/10 text-foreground rounded-xl transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 px-3 py-2 bg-brand-purple/10 text-brand-purple rounded-full text-sm font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={() => onTagRemove(tag)}
                className="hover:bg-brand-purple/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
