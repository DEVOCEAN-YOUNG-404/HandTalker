/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      "main-1": "#bbf7d0",
      "main-2": "#22c55e",
      footer: "#16a34a",
    },
    extend: {
      fontFamily: {
        main: ["Pretendard"],
      },
    },
  },
  plugins: [],
};
