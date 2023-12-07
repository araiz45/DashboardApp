/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EEEEEE",
        blue: "#00ADB5",
        black: "#393E46",
        dBlack: "#222831",
      },
      fontFamily: {
        primary: ['Karla', 'sans-serif']
      }
    },
  },
  plugins: [],
}

