/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFCF7',
        cream: '#F7F1E6',
        sand: '#EFE5D5',
        champagne: {
          DEFAULT: '#E6D5B8',
          dark: '#D4BC94',
        },
        gold: {
          DEFAULT: '#C4A265',
          light: '#DCC08A',
          dark: '#A8884C',
        },
        mocha: '#8A7156',
        taupe: '#A8977F',
        cocoa: '#4B3B2F',
        ink: '#2B241E',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      letterSpacing: {
        luxe: '0.35em',
        wide2: '0.2em',
      },
      maxWidth: {
        content: '72rem',
        prose: '42rem',
      },
      boxShadow: {
        soft: '0 20px 60px -20px rgba(43, 36, 30, 0.25)',
        card: '0 10px 40px -12px rgba(43, 36, 30, 0.18)',
      },
      keyframes: {
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 24px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '30%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        'eq-bar': {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'slow-zoom': 'slow-zoom 24s ease-out forwards',
        'fade-up': 'fade-up 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.4s ease-out both',
        'line-grow': 'line-grow 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
        shimmer: 'shimmer 2.2s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 6s linear infinite',
        'eq-bar': 'eq-bar 1s ease-in-out infinite',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
