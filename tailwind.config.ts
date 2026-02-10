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
        // Sub-Holding
        "sh-upstream": "#00539C",
        "sh-downstream": "#E31937",
        "sh-pnre": "#2E8540",
        "sh-gas": "#F5A623",
        // Biodiversity Category
        "bio-rendah": "#E06919",
        "bio-sedang": "#F5A623",
        "bio-tinggi": "#006837",
        // IUCN
        "iucn-cr": "#CC3333",
        "iucn-en": "#E06919",
        "iucn-vu": "#F0C400",
        "iucn-nt": "#5B9BD5",
        "iucn-lc": "#60B236",
        "iucn-dd": "#999999",
        // Neutral
        "pertamina-dark": "#1A1A2E",
        "pertamina-bg": "#F8F9FA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "count-up": "countUp 1.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in": "slideIn 0.5s ease-out forwards",
      },
      keyframes: {
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
