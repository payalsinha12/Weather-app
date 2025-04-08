/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 🌙 Enables dark mode via a class toggle
  theme: {
    extend: {
      fontFamily: {
        baloo: ['"Baloo 2"', 'cursive'],
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 1s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
