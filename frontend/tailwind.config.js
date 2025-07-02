/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       animation: {
      'slide-in-left': 'slideInLeft 1s ease-out',
      'slide-in-right': 'slideInRight 1s ease-out',
    },
    keyframes: {
      slideInLeft: {
        '0%': { transform: 'translateX(-100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      slideInRight: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
    },
      colors: {
        primary: '#26a69a',         // Teal
        accent: '#0c1446',         
        background: '#b6f7f4',
        text: '#263238',
        alert: '#993d4f', 
        comb: "#00DCDC"          // Orange-ish for danger tags
      }
    },
  },
  plugins: [],
}

