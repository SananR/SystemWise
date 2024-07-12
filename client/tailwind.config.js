module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts}"],
  darkMode: false,
  theme: {
    extend: {},
    screens: {
      sm: "375px",
      lg: "1440px",
    },
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
  ]
}