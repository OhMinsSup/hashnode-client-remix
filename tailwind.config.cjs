const { colors } = require("tailwindcss/defaultTheme");
// const { blackA, mauve, violet } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  darkMode: ["class", ":global(.dark)"],
  theme: {
    extend: {
      colors: {
        ...colors,
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        primary: colors.blue,
      },
      typography: () => ({
        DEFAULT: {
          css: {
            'div[data-node-type="callout"]': {
              display: "flex",
              "justify-content": "flex-start",
              "align-items": "flex-start",
              "background-color": "#F8FAFC",
              border: "1px solid #E2E8F0",
              padding: " 1rem 1.5rem",
              gap: "0.5rem",
              "border-radius": "0.5rem",
              margin: "1rem 0",
              "word-break": "break-word",
            },
            'div[data-node-type="callout-emoji"]': {
              background: "#E2E8F0",
              "border-radius": "0.5rem",
              minWidth: "1.75rem",
              width: "1.75rem",
              height: "1.5rem",
              display: "flex",
              "margin-top": "0.3rem",
              "justify-content": "center",
              "align-items": "center",
              "font-size": "1rem",
            },
          },
        },
      }),
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        sm: "0 5px 10px rgba(0, 0, 0, 0.12)",
        md: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwindcss-radix")(),
  ],
};
