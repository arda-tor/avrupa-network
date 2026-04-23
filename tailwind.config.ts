import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F4F1EA",
        "bg-2": "#EDE8DC",
        ink: "#1A1A1A",
        "ink-soft": "#4A4A4A",
        mute: "#8A8579",
        line: "#1A1A1A",
        accent: "#FF5B22",
        "accent-2": "#2D4A3E",
        card: "#FFFCF5",
        chip: "#E8E2D0",
      },
      fontFamily: {
        sans: ["Geist", "sans-serif"],
        serif: ["Fraunces", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
