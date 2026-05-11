/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          elevated: 'var(--bg-elevated)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          dim: 'var(--accent-dim)',
        },
        'border-color': 'var(--border-color)',
        'glass-bg': 'var(--glass-bg)',
        'glass-border': 'var(--glass-border)',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 15px -5px var(--accent)' },
          '50%': { 'box-shadow': '0 0 35px 0px var(--accent)' },
        },
        'float-a': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(60px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(-30px, 25px) scale(0.94)' },
        },
        'float-b': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-50px, 30px) scale(1.06)' },
          '66%': { transform: 'translate(35px, -20px) scale(0.96)' },
        },
        'float-c': {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '50%': { transform: 'translate(20px, -30px)' },
        },
      },
      animation: {
        glow: 'glow 4s ease-in-out infinite',
        'float-a': 'float-a 22s ease-in-out infinite',
        'float-b': 'float-b 28s ease-in-out infinite',
        'float-c': 'float-c 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
