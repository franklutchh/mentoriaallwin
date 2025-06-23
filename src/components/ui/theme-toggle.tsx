
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Verificar se já existe preferência salva ou preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && systemPrefersDark);
    
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
      title={isDark ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-yellow-500 transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
      )}
    </button>
  );
};
