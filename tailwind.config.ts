import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "electric-blue": "#3B82F6",
        "bright-blue": "#60A5FA",
        "deep-navy": "#0B1120",
        "midnight": "#020408",
        "glass-border": "rgba(255, 255, 255, 0.1)",
        "glass-surface": "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
      },
      backgroundImage: {
        "hero-glow":
          "conic-gradient(from 180deg at 50% 50%, #3B82F6 0deg, #000 120deg)",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.1)",
        neon: "0 0 20px rgba(59, 130, 246, 0.4)",
        "card-depth": "0 20px 40px -10px rgba(0,0,0,0.5)",
        "inner-glow": "inset 0 0 20px rgba(59, 130, 246, 0.1)",
      },
      animation: {
        "float-3d": "float-3d 6s ease-in-out infinite",
        "float-3d-alt": "float-3d-alt 5s ease-in-out infinite",
        "scroll-left": "scroll-left 40s linear infinite",
        "scroll-right": "scroll-right 40s linear infinite",
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        "float-3d": {
          "0%, 100%": { transform: "translateZ(40px) translateY(0)" },
          "50%": { transform: "translateZ(40px) translateY(-10px)" },
        },
        "float-3d-alt": {
          "0%, 100%": { transform: "translateZ(60px) translateY(0)" },
          "50%": { transform: "translateZ(60px) translateY(10px)" },
        },
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        }
      },
    },
  },
  plugins: [forms, containerQueries],
};
export default config;