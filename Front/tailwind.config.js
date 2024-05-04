/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0398AE",
        secondary: "#878787",
      },
      boxShadow: {
        custom: "0 16px 16px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [],
};
