/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // 'Anton' use karenge Headings ke liye (Movie Title look)
        anton: ['Anton', 'sans-serif'],
        // 'Manrope' use karenge normal text ke liye (Clean look)
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        'lotus-red': '#ff0000', 
        'dark-card': '#0a0a0a',
      },
      dropShadow: {
        'glow': '0 0 20px rgba(255, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}