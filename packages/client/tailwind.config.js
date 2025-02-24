import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      transitionDelay: {
        2000: '2000ms',
        3000: '3000ms',
        4000: '4000ms',
        5000: '5000ms',
      },
      colors: {
        'base-x': 'var(--base-x)',
        base: 'var(--base)',
        'base-m': 'var(--base-m)',
        'base-s': 'var(--base-s)',
        txtPrimary: 'var(--txtPrimary)',
        txtSecondary: 'var(--txtSecondary)',
        txtAccent: 'var(--txtAccent)',
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
        fancy: ['Great Vibes', 'serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          delay: (value) => {
            return {
              'transition-delay': value,
              'animation-delay': value,
            };
          },
        },
        {
          values: theme('transitionDelay'),
        },
      );
    }),
  ],
};
