/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      'xxs': '425px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
        }
      },
      colors: {
        main: {
          DEFAULT: "#E1752C",
        },
        brown: {
          DEFAULT: "#7D5C49",
        },
        second: {
          DEFAULT: "#d57542",
        },
        warning: {
          DEFAULT: "#e11",
        },
        dark: {
          DEFAULT: "#111827",
          light: "#1f2937",
        },
        light: {
          DEFAULT: "#f3f4f6",
        },
        gray: {
          DEFAULT: "#6B7280",
          light: "#D1D5DB",
          dark: "#374151",
        },
        whitesmoke: {
          DEFAULT: "#F5F5F5",
        },
        charcoal: {
          DEFAULT: "#333333",
        },
        teal: {
          DEFAULT: "#14B8A6",
          light: "#5EEAD4",
          dark: "#0F766E",
        },
        emerald: {
          DEFAULT: "#10B981",
          light: "#6EE7B7",
          dark: "#047857",
        },
        blue: {
          DEFAULT: "#3B82F6",
          light: "#93C5FD",
          dark: "#1E3A8A",
        },
        purple: {
          DEFAULT: "#8B5CF6",
          light: "#D8B4FE",
          dark: "#6D28D9",
        },
        pink: {
          DEFAULT: "#EC4899",
          light: "#FBCFE8",
          dark: "#BE185D",
        },
        cyan: {
          DEFAULT: "#22D3EE",
          light: "#CFFAFE",
          dark: "#0891B2",
        },
        amber: {
          DEFAULT: "#F59E0B",
          light: "#FDE68A",
          dark: "#B45309",
        },
        lime: {
          DEFAULT: "#84CC16",
          light: "#D9F99D",
          dark: "#4D7C0F",
        },
        rose: {
          DEFAULT: "#F43F5E",
          light: "#FECACA",
          dark: "#9F1239",
        },
      }
    },
  },
  plugins: [],
}


