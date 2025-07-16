/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // We are defining our theme colors using CSS variables.
      // This makes it easy to manage light/dark modes from a single CSS file.
      colors: {
        background: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
        },
        'border-color': 'var(--border-color)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 10px -5px var(--accent)' },
          '50%': { 'box-shadow': '0 0 20px 0px var(--accent)' },
        },
      },
      animation: {
        glow: 'glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}