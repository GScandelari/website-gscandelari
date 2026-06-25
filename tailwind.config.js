/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './carreira.html',
    './formacao.html',
    './404.html',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn .6s ease both',
        'slide-up': 'slideUp .6s ease both',
        'float':    'float 4s ease-in-out infinite',
        'glitch':   'glitch 2.5s infinite',
        'blink':    'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '92%':           { transform: 'translate(-3px, 1px)' },
          '94%':           { transform: 'translate(3px, -1px)' },
          '96%':           { transform: 'translate(-2px, 2px)' },
          '98%':           { transform: 'translate(2px, -2px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
