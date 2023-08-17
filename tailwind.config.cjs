const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8dadff",
        grid: {
          purple: "#7a73b8",
          yellow: "#a0cebe",
          green: "#59786b",
          teal: "#4e918d",
        },
        gray: {
          50: "#FAFAFB",
          100: "#F4F4F6",
          200: "#E5E6E9",
          300: "#D3D5DA",
          400: "#9FA2AD",
          500: "#6E727D",
          600: "#4F545F",
          700: "#3B404C",
          800: "#232831",
          900: "#151821",
          950: "#06080F",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            "blockquote p:first-of-type::before": null,
            "blockquote p:last-of-type::after": null,
            "code::before": null,
            "code::after": null,
            code: {
              color: "var(--tw-prose-pre-code)",
              backgroundColor: "var(--tw-prose-pre-bg)",
              fontSize: "87.5%",
              fontWeight: "500",
              borderRadius: "3px",
              padding: "0.125em",
            },
          },
        },
      },
    },
    fontFamily: {
      sans: ['"Kantumruy Pro"', ...defaultTheme.fontFamily.sans],
      mono: ['"Fragment Mono"', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
