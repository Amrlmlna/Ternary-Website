module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}",
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./index.html",
  ],
  theme: {
    fontFamily: {
      body: ["Inter", "sans-serif"],
      headline: ["Space Grotesk", "sans-serif"],
      code: ["monospace"],
    },
    extend: {
      colors: {
        neu: {
          light: "#e8e8e8",
          dark: "#212121",
        },
        accent: {
          DEFAULT: "#7c3aed",
        },
        text: {
          light: "#090909",
          dark: "#fff",
        },
      },
      borderRadius: {
        neu: "0.625rem",
      },
      boxShadow: {
        neu: "6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff",
        "neu-inset": "inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff",
        "neu-dark": "6px 6px 12px #000, -6px -6px 12px #2f2f2f",
        "neu-inset-dark":
          "inset 4px 4px 12px #000, inset -4px -4px 12px #1f1f1f",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
