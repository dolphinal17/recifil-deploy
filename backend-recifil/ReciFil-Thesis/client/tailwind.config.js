/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        mainBlack: "#18181B",
        fadeBlack: "#747474",
        bgColorTwo: "#20262E",
        primary: "#FFFFFF",
        secondary: "#B2D33D",
        bgColor: "#F2F1F0",
        fadeText: "rgba(0, 0, 0, 0.6)",
        textMainBlack: "rgba(0, 0, 0, 0.8)",
        textFadeBlack: "rgba(0, 0, 0, 0.6)",
      },
    },
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
};
