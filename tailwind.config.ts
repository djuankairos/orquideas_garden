import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: "#2A1A44",
        espresso: "#FDF0F4",
        gold: "#E0A8C0",
        champagne: "#C478A0",
        pearl: "#2A1A24",
        ivory: "#2A1A44",
        smoke: "#9A7A8A",
        pine: "#7A6AB4",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-jost)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 14px 36px rgba(122, 74, 148, 0.12)",
        glow: "0 12px 34px rgba(196, 120, 160, 0.2)",
      },
      keyframes: {
        "wa-ring": {
          "0%":   { transform: "scale(1)",    boxShadow: "0 0 0 0 rgba(37,211,102,0.55)" },
          "60%":  { transform: "scale(1.04)", boxShadow: "0 0 0 14px rgba(37,211,102,0)" },
          "100%": { transform: "scale(1)",    boxShadow: "0 0 0 0 rgba(37,211,102,0)" },
        },
      },
      animation: {
        "wa-ring": "wa-ring 1.8s ease-out infinite",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at 8% 12%, rgba(212,196,240,0.8), transparent 36%), radial-gradient(circle at 88% 12%, rgba(240,200,216,0.55), transparent 34%), linear-gradient(160deg, #fdf0f4, #faf7f5)",
      },
    },
  },
  plugins: [],
};

export default config;
