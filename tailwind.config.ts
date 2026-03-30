import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#002b6b",
        "primary-container": "#1a428a",
        "primary-fixed-dim": "#b0c6ff",
        surface: "#faf8ff",
        "surface-container-low": "#f4f3fa",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e8e7ee",
        "surface-container-highest": "#e2e2e9",
        "surface-bright": "#faf8ff",
        "on-surface": "#1a1b20",
        "on-surface-variant": "#434651",
        "secondary-container": "#91f78e",
        "on-secondary-container": "#00731e",
        "tertiary-container": "#7e2529",
        "on-tertiary-container": "#ff9593",
        "outline-variant": "#c4c6d2",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "var(--font-noto-thai)", "sans-serif"],
        inter: ["var(--font-inter)", "var(--font-noto-thai)", "sans-serif"],
        thai: ["var(--font-noto-thai)", "sans-serif"],
      },
      borderRadius: {
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
