import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Graphite base - layered near-black, not flat.
        ink: {
          DEFAULT: "#0A0B0D",
          50: "#15171B",
          100: "#1B1E23",
          200: "#23272E",
          300: "#2D323A",
        },
        bone: {
          DEFAULT: "#EDEDE8",
          muted: "#A7A9A3",
          faint: "#6E716C",
        },
        // Single warm signal accent - amber/copper.
        signal: {
          DEFAULT: "#E8B04B",
          soft: "#F0C778",
          deep: "#B9842B",
        },
        // Cool counterpart - the neural network / circuitry blue.
        neural: {
          DEFAULT: "#4D8DF0",
          soft: "#8FB6F7",
          deep: "#1B3A6E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      maxWidth: {
        editorial: "1240px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease forwards",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
      },
    },
  },
  plugins: [],
};

export default config;
