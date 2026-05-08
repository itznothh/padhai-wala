/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  '#FFF8F0',
          100: '#FEECD6',
          200: '#FDD5A0',
          300: '#FBB55A',
          400: '#F9922A',
          500: '#E97008',
          600: '#C05A04',
          700: '#9A4507',
          800: '#7C380A',
          900: '#652F0B',
        },
        cream: {
          50:  '#FDFBF7',
          100: '#FAF5EB',
          200: '#F2E8D0',
          300: '#E8D5AA',
        }
      },
      fontFamily: {
        display: ['"Noto Serif Devanagari"', 'Georgia', 'serif'],
        body:    ['"Noto Sans"', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'bounce-dot': 'bounceDot 1.2s infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        bounceDot: { '0%,80%,100%': { transform: 'scale(0)' }, '40%': { transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
