module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "texter-blue": "hsl(204,88%,53%)",
        "texter-blue-dark": "hsl(204, 78%, 47%)",
        "red-error": "hsl(356, 90%, 54%)",
      },
    },

    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
    },
  },
  plugins: [],
};
