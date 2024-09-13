import type { Config } from "tailwindcss";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          100: '#4f952f',
          200: '#64a147',
          300: '#78ac5e',
          400: '#8cb874',
          500: '#9fc48a',
          600: '#b2d0a1',
        },
        surface:{
          100: '#9a9d9a',
          200: '#b0b3b0',
          300: '#c9cdc9',
          400: '#e1e4e1',
          450: '#ebeeeb',
          500: '#fbfefb',
          600: '#ffffff',
        },
        "surface-dark": {
          100: '#121212',
          200: '#282828',
          300: '#3f3f3f',
          400: '#575757',
          500: '#717171',
          600: '#8b8b8b',
        },

        "heading": "#282828",
        "heading-dark": "#fbfefb",

        "text": "#3f3f3f",
        "text-dark": "#e1e4e1",

        "placeholder": "#575757",
        "placeholder-dark": "#c9cdc9",

        
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    addVariablesForColors
  ],
};

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config;
