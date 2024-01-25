/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      'xxs': '425px', // min-width
      'sm': '640px', // min-width
      'md': '768px', // min-width
      'lg': '1024px', // min-width
      'xl': '1280px', // min-width
      '2xl': '1536px', // min-width
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
          // DEFAULT: "#4f23ff",
          // DEFAULT: "#ff9c01",
        },
        second: {
          DEFAULT: "#d57542",
          // DEFAULT: "#ffc001",
          // DEFAULT: "#4f25af",
        },
        warning: {
          DEFAULT: "#e11",
        },
        dark: {
          DEFAULT: "#111827",
          light: "#1a202c",
        },
        light: {
          DEFAULT: "#f3f4f6",
        },
      }
    },
  },
  plugins: [],
}

