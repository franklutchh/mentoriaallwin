
import { useContext } from 'react';
import { MentoringContext } from './MentoringContext';

export const useMentoringContext = () => {
  const context = useContext(MentoringContext);
  if (context === undefined) {
    throw new Error('useMentoringContext must be used within a MentoringProvider');
  }
  return context;
};
