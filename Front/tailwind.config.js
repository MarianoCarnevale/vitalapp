/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0398AE",
        secondary: "#878787",
        "secondary-light": "#ececec",
      },
      //shadow
      boxShadow: {
        sup: "1px -14px 32px -18px rgba(0,0,0,0.27);",
      },
      backgroundImage: {
        "hero-pattern": "url('/images/background-home.jpg')",
        "menu-lines": "url('/images/fondo-menu.svg')",
        "search-icon": "url('/images/search-icon.svg')",
      },
      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadein: "fadein .5s ease-out",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["responsive", "hover", "focus", "group-hover"],
      transition: ["responsive", "hover", "focus"],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".hide-scrollbar": {
          "scrollbar-width": "none", // Firefox
          "-ms-overflow-style": "none", // Internet Explorer 10+
        },
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none", // Safari and Chrome
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
