/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':   '#FFC107',  // Amber
        'secondary': '#1E3A8A', // Indigo
        'background': '#FFFFFF', // White
        'accent':    '#FF5722',  // Deep Orange

      },
      fontFamily: {
        'primary': ["Montserrat", "sans-serif"],
        'secondary': ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}
