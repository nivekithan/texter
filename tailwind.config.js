module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "texter-blue": "hsl(204,88%,53%)",
        "texter-blue-dark": "hsl(204, 78%, 47%)",
        "comment-blue": "hsl(204, 87.6%, 52.7%)",
        "like-red": "hsl(332, 94.9%, 53.5%)",
        "red-error": "hsl(356, 90%, 54%)",
        "texter-gray": "rgb(113, 118, 123)",
        "texter-gray-dark" : "rgb(51, 54, 57)"
      },
    },

    fontFamily: {
      sans: ["Noto Sans", "sans-serif"],
    },
  },
  plugins: [],
};
