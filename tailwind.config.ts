/** @type {import('tailwindcss').Config} */
 
module.exports = {
  darkMode: 'class', 
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#FF9D00',
        secondary: '#FFB347',
        accent: '#FF6600',
        background: '#FFF5E6',
        text: '#333333',
        border: '#FFD27F',
      }
    },
  },
  plugins: [require('tailgrids/plugin')],
}