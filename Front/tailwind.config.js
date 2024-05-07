/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0398AE",
        secondary: "#878787",
      },
      backgroundImage: {
        "hero-pattern": "url('/images/background-home.jpg')",
        "menu-lines": "url('/images/fondo-menu.svg')",
      },
      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadein: "fadein 1s ease-out",
      },
    },
  },
  plugins: [],
};
