/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["index.html", "js/script.js", "css/tailwind.css"],
  theme: {
    extend: {
      screens: {
        'xs': '380px',
      }
    },
  },
  plugins: [],
}
