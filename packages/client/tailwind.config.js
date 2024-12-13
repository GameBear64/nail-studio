/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        'base-x': 'var(--base-x)',
        base: 'var(--base)',
        'base-m': 'var(--base-m)',
        'base-s': 'var(--base-s)',
        txtPrimary: 'var(--txtPrimary)',
        txtSecondary: 'var(--txtSecondary)',
        'primary-light': 'var(--primary-light)',
        primary: 'var(--primary)',
        'primary-shade': 'var(--primary-shade)',
        'primary-dark': 'var(--primary-dark)',
      },
      fontSize: {
        // because we override base with a color
        md: ['1rem', '1.5rem'],
      },
      screens: {
        minimum: '320px',
        xs: '430px',
        // sm 640px
        // md 768px
        // lg 1024px
        // xl 1280px
        // 2xl 1536px
      },
      fontFamily: {
        rouge: ['Rouge Script', 'cursive'],
      },
      animation: {
        fall: 'fall 8s linear infinite',
        fall1: 'fall 5s linear infinite',
        fall2: 'fall 11s linear infinite',
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg) ' },
          '15%': { transform: 'translateY(10%) translateX(5%) rotate(10deg)' },
          '30%': { transform: 'translateY(30%) translateX(-10%) rotate(-5deg)' },
          '50%': { transform: 'translateY(60%) translateX(15%) rotate(20deg)' },
          '70%': { transform: 'translateY(80%) translateX(-20%) rotate(-15deg)' },
          '100%': { transform: 'translateY(100%) translateX(-25%) rotate(5deg)' },
        },
        fall1: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '15%': { transform: 'translateY(10%) translateX(5%) rotate(10deg)' },
          '30%': { transform: 'translateY(30%) translateX(-10%) rotate(-5deg)' },
          '50%': { transform: 'translateY(60%) translateX(15%) rotate(20deg)' },
          '70%': { transform: 'translateY(80%) translateX(-20%) rotate(-15deg)' },
          '100%': { transform: 'translateY(100%) translateX(-25%) rotate(5deg)' },
        },
        fall2: {
          '0%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '15%': { transform: 'translateY(10%) translateX(5%) rotate(10deg)' },
          '30%': { transform: 'translateY(30%) translateX(-10%) rotate(-5deg)' },
          '50%': { transform: 'translateY(60%) translateX(15%) rotate(20deg)' },
          '70%': { transform: 'translateY(80%) translateX(-20%) rotate(-15deg)' },
          '100%': { transform: 'translateY(100%) translateX(-25%) rotate(5deg)' },
        },
      },
    },
  },
  plugins: [],
};
