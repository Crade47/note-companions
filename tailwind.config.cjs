/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    fontFamily:{
      inconsolata:['"Inconsolata"', ...defaultTheme.fontFamily.sans],
      chivoMono: ['"Chivo Mono"', ...defaultTheme.fontFamily.sans],
      rowanMedium: ['"Rowan-Medium"','cursive'],
      satoshiLight:['"Satoshi-Regular"', 'sans-serif']
    },
    extend: {
      gridTemplateColumns:
      {
        'parent': '112.8px 1fr'
      }
    },
    darkMode:'class'
  },
  plugins: [],
}
