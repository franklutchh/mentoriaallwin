
import React from 'react';

interface StudentTagsProps {
  tags?: string[];
}

export const StudentTags: React.FC<StudentTagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mb-4">
      {tags.slice(0, 3).map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700 font-medium"
        >
          {tag}
        </span>
      ))}
      {tags.length > 3 && (
        <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-500">
          +{tags.length - 3}
        </span>
      )}
    </div>
  );
};
