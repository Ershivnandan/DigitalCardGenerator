// @import url('https://fonts.googleapis.com/css2?family=Playwright+GB+S:wght@400;700&display=swap');

// ** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      animation: {
        homeBg: "homeBgAnimation 15s ease infinite",
      },
      keyframes: {
        homeBgAnimation: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      backgroundSize: {
        600: "600% 600%",
      },
      fontFamily: {
        lobster: ["Lobster", "cursive"],
        pacifico: ["Pacifico", "cursive"],
        dancing: ["Dancing Script", "cursive"],
        playwright: ["Playwright", "cursive"],
      },
    },
  },
  plugins: [],
};
