import { create } from 'zustand';
import { Theme } from '../types';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: Theme.Light,
      
      toggleTheme: () => {
        set(state => ({
          theme: state.theme === Theme.Light ? Theme.Dark : Theme.Light
        }));
      },
      
      setTheme: (theme) => {
        set({ theme });
      }
    }),
    {
      name: 'theme-storage'
    }
  )
);

export default useThemeStore;