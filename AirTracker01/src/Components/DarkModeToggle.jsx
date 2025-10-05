import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-24 right-4 z-40 p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:shadow-gray-900/50 transition-all duration-300 transform hover:scale-110 border border-gray-200 dark:border-gray-600 backdrop-blur-sm"
      aria-label="Toggle dark mode"
    >
      <FontAwesomeIcon 
        icon={isDark ? faSun : faMoon} 
        className={`text-xl transition-all duration-500 transform ${
          isDark ? 'text-yellow-400 rotate-180' : 'text-gray-600 dark:text-gray-300 rotate-0'
        }`}
      />
    </button>
  );
};

export default DarkModeToggle;