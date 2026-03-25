import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        sans: ["'Outfit'", "system-ui", "sans-serif"],
      },
      colors: {
        droz: {
          black: "#0a0a0a",
          dark: "#141414",
          gray: "#1a1a1a",
          muted: "#6b6b6b",
          light: "#c0c0c0",
          white: "#f0f0f0",
          accent: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
export default config;
