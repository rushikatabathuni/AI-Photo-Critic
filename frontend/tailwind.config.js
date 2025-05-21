/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3effb',
          100: '#e7dff7',
          200: '#cfbff0',
          300: '#b79fe8',
          400: '#9f7fe0',
          500: '#875fd8',
          600: '#6f3fd0',
          700: '#5E17EB', // Primary color
          800: '#4a12bc',
          900: '#3e0fa3',
        },
        accent: {
          50: '#fff1ec',
          100: '#ffe3d8',
          200: '#ffc7b1',
          300: '#ffab8a',
          400: '#ff8f63',
          500: '#FF6B35', // Accent color
          600: '#ff4a03',
          700: '#cc3a00',
          800: '#992c00',
          900: '#661d00',
        },
        success: {
          500: '#10B981', // Success
        },
        warning: {
          500: '#F59E0B', // Warning
        },
        error: {
          500: '#EF4444', // Error
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}