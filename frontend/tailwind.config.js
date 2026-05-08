/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          50:  '#FFF4EE',
          100: '#FFE4D0',
          200: '#FFC29A',
          300: '#FF9657',
          400: '#FF8A40',
          500: '#F7610A',
          600: '#C44D06',
          700: '#9A3A04',
          800: '#7A2E04',
          900: '#4A1B02',
        },
        void:    '#0C0C0C',
        surface: '#141414',
        raised:  '#1C1C1C',
        card:    '#212121',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'slide-up':   'slideUp 0.35s ease-out',
        'bounce-dot': 'bounceDot 1.2s infinite',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
      },
    },
  },
  plugins: [],
}
