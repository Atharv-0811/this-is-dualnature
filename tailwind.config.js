/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          charcoal: "#1c1c1c",
          darkgray: "#3a3a3a",
          light: "#f5f5f5",
          coral: "#ff6f61",
        },
        fontFamily: {
          poppins: ['var(--font-poppins)'],
          grotesk: ['var(--font-grotesk)'],
          playfair: ['var(--font-playfair)'],
          barlow: ['var(--font-barlow)'],
          rubik: ['var(--font-rubik)'],
          outfit: ['var(--font-outfit)'],
          funky: ['var(--font-funky)'],
          mono: ['var(--font-mono)'],
        },
      },
    },
    plugins: [],
  };
  