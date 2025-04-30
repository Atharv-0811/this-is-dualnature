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
      },
    },
    plugins: [],
  };
  