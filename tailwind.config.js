/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8FB6D6',
        'primary-hover': '#7290b0',
        'blue-75': '#e6f3f3',
      },
      keyframes: {
        'draw-pulse': {
          '0%': { strokeDashoffset: '160' },
          '100%': { strokeDashoffset: '0' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'draw-pulse': 'draw-pulse 1.2s ease-out forwards',
        pulseSlow: 'pulseSlow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
