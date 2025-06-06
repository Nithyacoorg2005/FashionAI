import  { useEffect } from 'react';
import Router from './router';
import useThemeStore from './store/themeStore';
import { Theme } from './types';

function App() {
  const { theme } = useThemeStore();
  
  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    if (theme === Theme.Dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  return <Router />;
}

export default App;