module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  important: true,
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: {},
  plugins: [],
};
