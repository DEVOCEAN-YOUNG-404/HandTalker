const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      transparent: "transparent",
      "main-1": "#bbf7d0",
      "main-2": "#22c55e",
      black: "#0f241d",
      footer: "#16a34a",
      icon: "#439863",
    },
    extend: {
      fontFamily: {
        main: ["Pretendard"],
        skt: ["skt"],
      },
      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};
