const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  screens: {
    sm: "375px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
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
        main: ["Pretendard Variable"],
      },
      dropShadow: {
        xl: "0px 0px 4px rgba(0, 0, 0, 0.35)",
      },
      variants: {
        borderColor: ["responsive", "hover", "focus", "focus-within"],
      },
      transformOrigin: {
        0: "0%",
      },
    },
  },
  plugins: [],
};
