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
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
