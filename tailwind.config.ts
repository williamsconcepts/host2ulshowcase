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
        navy: {
          DEFAULT: "#1E1B4B",
          50: "#EEEDF8",
          100: "#DDDCEF",
          200: "#BDBBDD",
          300: "#9C9AC9",
          400: "#7C7AB7",
          500: "#5D5BA6",
          600: "#48468E",
          700: "#373473",
          800: "#23214E",
          900: "#1E1B4B",
          950: "#12102E",
        },
        coral: {
          DEFAULT: "#FF5A5F",
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FF7B7F",
          500: "#FF5A5F",
          600: "#E0484D",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },
        cream: {
          DEFAULT: "#FFF9F2",
          50: "#FFFDF9",
          100: "#FFF9F2",
          200: "#FCEFD9",
          300: "#F6DFB8",
          400: "#E8CA94",
        },
        brandText: {
          DEFAULT: "#111827",
          muted: "#4B5563",
          light: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["Sora", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(30, 27, 75, 0.08)",
        "card-hover": "0 20px 35px -10px rgba(30, 27, 75, 0.16)",
      },
    },
  },
  plugins: [],
};
export default config;
