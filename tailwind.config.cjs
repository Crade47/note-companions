/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily:{
      inconsolata:['"Inconsolata"', ...defaultTheme.fontFamily.sans]
    },
    extend: {},
    darkMode:'class'
  },
  plugins: [],
}
