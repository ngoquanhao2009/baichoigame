/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 3s ease-in-out infinite',
        bounce: 'bounce 0.6s ease-in-out',
        shine: 'shine 3s infinite',
        pulse: 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(168, 85, 247, 0.6)',
        'glow-lg': '0 0 50px rgba(168, 85, 247, 0.8)',
      },
    },
  },
  plugins: [],
}
