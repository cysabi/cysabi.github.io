const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-invert-body": theme("colors.slate[200]"),
            "--tw-prose-invert-headings": theme("colors.slate[50]"),
            "--tw-prose-invert-lead": theme("colors.slate[400]"),
            "--tw-prose-invert-links": theme("colors.slate[50]"),
            "--tw-prose-invert-bold": theme("colors.slate[50]"),
            "--tw-prose-invert-counters": theme("colors.slate[400]"),
            "--tw-prose-invert-bullets": theme("colors.slate[600]"),
            "--tw-prose-invert-hr": theme("colors.slate[700]"),
            "--tw-prose-invert-quotes": theme("colors.slate[100]"),
            "--tw-prose-invert-quote-borders": theme("colors.slate[700]"),
            "--tw-prose-invert-captions": theme("colors.slate[400]"),
            "--tw-prose-invert-code": theme("colors.slate[200]"),
            "--tw-prose-invert-pre-code": theme("colors.slate[200]"),
            "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-invert-th-borders": theme("colors.slate[600]"),
            "--tw-prose-invert-td-borders": theme("colors.slate[700]"),
            "blockquote p:first-of-type::before": null,
            "blockquote p:last-of-type::after": null,
            "code::before": null,
            "code::after": null,
            code: {
              backgroundColor: "var(--tw-prose-pre-bg)",
              fontSize: "87.5%",
              fontWeight: "500",
              borderRadius: "3px",
              padding: "0.125em",
            },
          },
        },
      }),
    },
    fontFamily: {
      sans: ['"Karla"', ...defaultTheme.fontFamily.sans],
      mono: ['"Fragment Mono"', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
