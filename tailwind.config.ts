/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // azul escuro customizado
        secondary: '#F59E0B', // amarelo customizado
        background: '#0F0F0F',
        surface: '#1C1C1E',
        brand: {
          light: '#3B82F6',
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
      },
    },
  },
  plugins: [],
};
