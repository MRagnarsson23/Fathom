import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#0e0d0b",
        raised: "#171511",
        inset: "#12110e",
        ink: "#f3eee4",
        mute: "#a39b8e",
        faint: "#6e675c",
        rule: "#2c2923",
        brass: "#d4a574",
        clay: "#c45c3e",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.16em",
      },
      maxWidth: {
        measure: "38rem",
        page: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
