import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import useThemeStore from '../../store/themeStore';
import { Theme } from '../../types';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  
  const isLight = theme === Theme.Light;
  
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.Dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <motion.button
      className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-1"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute left-1 top-1 w-4 h-4 rounded-full flex items-center justify-center"
        initial={false}
        animate={{
          x: isLight ? 0 : 24,
          backgroundColor: isLight ? 'rgb(249, 115, 22)' : 'rgb(96, 165, 250)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isLight ? (
          <Sun className="w-3 h-3 text-white" />
        ) : (
          <Moon className="w-3 h-3 text-white" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;