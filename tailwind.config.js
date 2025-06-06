/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        neutral: {
          100: '#F8F7F4',
          200: '#EAE7E0',
          300: '#D4C9C2',
          400: '#B0A99F',
          500: '#8C8379',
          600: '#665F57',
          700: '#4A4439',
          800: '#2D2A23',
          900: '#1A1914',
        },
        pink: {
          100: '#F9EEEE',
          200: '#F2DCDC',
          300: '#E8D0CE',
          400: '#D9B3B0',
          500: '#C99390',
          600: '#B06E6A',
          700: '#8C5652',
          800: '#663F3C',
          900: '#402826',
        },
        blue: {
          100: '#EEF4F7',
          200: '#DCE9EF',
          300: '#C3DCE3',
          400: '#9DC5D0',
          500: '#73A9BA',
          600: '#4D8A9D',
          700: '#396A7A',
          800: '#264A56',
          900: '#182C33',
        },
      },
      fontFamily: {
         sans: ['var(--font-sans)'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-in-out',
        'slide-down': 'slide-down 0.3s ease-in-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};