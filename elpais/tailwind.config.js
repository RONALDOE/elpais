/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    extend: {  fontFamily: {
      custom: ['Majrit', 'serif'], // Nombre de la fuente y pilares de fuentes
    },},
  },
  plugins: [],
}

