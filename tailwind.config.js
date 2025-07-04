/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      
      keyframes: {
        glow: {
          '0%, 100%': { 'box-shadow': '0 0 10px -5px #06b6d4' }, 
          '50%': { 'box-shadow': '0 0 20px 0px #06b6d4' },
        },
      },
      animation: {
        glow: 'glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

