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
        "hero-pattern": "url('./public/images/background-home.jpg')",
        // ...
      },
    },
  },
  plugins: [],
};
