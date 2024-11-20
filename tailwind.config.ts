import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '1000px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
  },
    extend: {
      colors: {
        darkShades: {
          100: "#121212",
          200: "#282828",
          300: "#3f3f3f",
          400: "#575757",
          500: "#717171",
          600: "#8b8b8b",
        },
        lightShades: {
          100: "#f5f5f5",
          200: "#c8c8c8",
          300: "#9c9c9c",
          400: "#737373",
          500: "#4c4c4c",
          600: "#282828",
        },
        primary: {
            10: "rgb(229 247 255)",
            20: "rgb(209 237 249)",
            50: "rgb(141,215,243)",
            100: "#00a7e3",
            200: "#1889b9",
            300: "#1e6c91",
            400: "#1e516b",
            500: "#1a3747",
            600: "#131e26",
            },
        }
      },
    },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/forms'),
  ],
  darkMode: "class",
};
export default config;
