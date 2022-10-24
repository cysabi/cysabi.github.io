const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Work Sans"', ...defaultTheme.fontFamily.sans],
      mono: ['"Spline Sans Mono"', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
