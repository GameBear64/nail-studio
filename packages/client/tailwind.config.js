/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        "base-x": "var(--base-x)",
        base: "var(--base)",
        "base-m": "var(--base-m)",
        "base-s": "var(--base-s)",
        "base-xs": "var(--base-xs)", //for borders
        txtPrimary: "var(--txtPrimary)",
        txtSecondary: "var(--txtSecondary)",
        "primary-light": "var(--primary-light)",
        primary: "var(--primary)",
        "primary-shade": "var(--primary-shade)",
        "primary-dark": "var(--primary-dark)",
      },
      fontSize: {
        // because we override base with a color
        md: ["1rem", "1.5rem"],
      },
    },
  },
  plugins: [],
};
